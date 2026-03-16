#!/bin/bash
# FastTrack PWA Deploy & Verify Script
# Builds, deploys to Vercel, and verifies the deployment is correct for iPhone PWA

set -e

PROD_URL="https://fasttrack-theta.vercel.app"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

pass() { echo -e "  ${GREEN}✓${NC} $1"; }
fail() { echo -e "  ${RED}✗${NC} $1"; ERRORS=$((ERRORS+1)); }
info() { echo -e "${YELLOW}→${NC} $1"; }
check_html() { echo "$HTML" | grep -q "$1" && pass "$2" || fail "$2 MISSING"; }

ERRORS=0

# ── Step 1: Type check ──
info "Running TypeScript check..."
npx tsc -b
pass "TypeScript passes"

# ── Step 2: Build ──
info "Building for production..."
npx vite build > /dev/null 2>&1
pass "Build succeeded"

# ── Step 3: Deploy ──
info "Deploying to Vercel..."
DEPLOY_OUTPUT=$(vercel --prod --yes 2>&1)
pass "Deployed to Vercel"

# ── Step 4: Wait for deployment to propagate ──
info "Waiting for deployment to propagate..."
for i in $(seq 1 15); do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL" 2>/dev/null)
  if [ "$STATUS" = "200" ]; then break; fi
  sleep 2
done

# ── Step 5: Verify HTTP status ──
info "Verifying deployment..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL")
if [ "$STATUS" = "200" ]; then
  pass "HTTP 200 OK"
else
  fail "HTTP status: $STATUS (expected 200)"
fi

# ── Step 6: Verify PWA meta tags ──
HTML=$(curl -s "$PROD_URL")
check_html 'apple-mobile-web-app-capable' "apple-mobile-web-app-capable"
check_html 'viewport-fit=cover' "viewport-fit=cover"
check_html 'apple-mobile-web-app-status-bar-style' "status-bar-style"
check_html 'theme-color' "theme-color"
check_html 'apple-touch-icon' "apple-touch-icon link"
check_html 'manifest' "Web manifest link"

# ── Step 7: Verify manifest accessible + Content-Type ──
MANIFEST_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/manifest.webmanifest")
if [ "$MANIFEST_STATUS" = "200" ]; then
  pass "manifest.webmanifest accessible (HTTP 200)"
else
  fail "manifest.webmanifest HTTP $MANIFEST_STATUS"
fi

MANIFEST_CT=$(curl -sI "$PROD_URL/manifest.webmanifest" | grep -i 'content-type' | tr -d '\r')
if echo "$MANIFEST_CT" | grep -qi 'manifest+json\|application/json'; then
  pass "manifest Content-Type correct"
else
  fail "manifest Content-Type wrong: $MANIFEST_CT"
fi

# ── Step 8: Verify manifest content ──
MANIFEST=$(curl -s "$PROD_URL/manifest.webmanifest")
echo "$MANIFEST" | grep -q '"standalone"' && \
  pass "manifest display: standalone" || \
  fail "manifest missing display: standalone"
echo "$MANIFEST" | grep -q '192x192' && \
  pass "manifest has 192x192 icon" || \
  fail "manifest missing 192x192 icon"
echo "$MANIFEST" | grep -q '512x512' && \
  pass "manifest has 512x512 icon" || \
  fail "manifest missing 512x512 icon"

# ── Step 9: Verify service worker ──
SW_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/sw.js")
[ "$SW_STATUS" = "200" ] && pass "sw.js accessible" || fail "sw.js HTTP $SW_STATUS"

REG_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/registerSW.js")
[ "$REG_STATUS" = "200" ] && pass "registerSW.js accessible" || fail "registerSW.js HTTP $REG_STATUS"

# ── Step 10: Verify apple-touch-icon is real ──
ICON_SIZE=$(curl -s "$PROD_URL/apple-touch-icon.png" | wc -c | tr -d ' ')
if [ "$ICON_SIZE" -gt 100 ]; then
  pass "apple-touch-icon.png is real (${ICON_SIZE} bytes)"
else
  fail "apple-touch-icon.png is ${ICON_SIZE} bytes (broken)"
fi

# ── Step 11: Verify start_url has no redirect ──
START_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-redirs 0 "$PROD_URL/")
[ "$START_STATUS" = "200" ] && pass "start_url returns 200 (no redirect)" || fail "start_url returns $START_STATUS"

# ── Summary ──
echo ""
if [ "$ERRORS" -eq 0 ]; then
  echo -e "${GREEN}═══════════════════════════════════════${NC}"
  echo -e "${GREEN}  All checks passed! PWA is live.${NC}"
  echo -e "${GREEN}  ${PROD_URL}${NC}"
  echo -e "${GREEN}═══════════════════════════════════════${NC}"
else
  echo -e "${RED}═══════════════════════════════════════${NC}"
  echo -e "${RED}  $ERRORS check(s) failed!${NC}"
  echo -e "${RED}═══════════════════════════════════════${NC}"
  exit 1
fi
