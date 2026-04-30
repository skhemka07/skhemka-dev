#!/bin/bash
# Run this after you've done DNS setup to check if everything is working

echo ""
echo "=========================================="
echo "  Checking skhemka.dev setup"
echo "=========================================="
echo ""

PASS=0
FAIL=0

check() {
  local description="$1"
  local result="$2"
  if [ "$result" = "ok" ]; then
    echo "  ✓ $description"
    PASS=$((PASS+1))
  else
    echo "  ✗ $description"
    echo "    → $3"
    FAIL=$((FAIL+1))
  fi
}

echo "→ Checking DNS records..."
DNS_RESULT=$(dig +short A skhemka.dev 2>/dev/null | head -1)
if [[ "$DNS_RESULT" == "185.199."* ]]; then
  check "DNS A records point to GitHub Pages" "ok"
elif [ -z "$DNS_RESULT" ]; then
  check "DNS A records point to GitHub Pages" "fail" "DNS not yet propagated. Wait 10-30 minutes and try again."
else
  check "DNS A records point to GitHub Pages" "fail" "Got '$DNS_RESULT' instead of 185.199.x.x. Check the A records in Cloudflare."
fi

echo ""
echo "→ Checking www subdomain..."
WWW_RESULT=$(dig +short CNAME www.skhemka.dev 2>/dev/null | head -1)
if [[ "$WWW_RESULT" == *"skhemka07.github.io"* ]] || [[ "$WWW_RESULT" == *"github.io"* ]]; then
  check "www.skhemka.dev CNAME is correct" "ok"
else
  check "www.skhemka.dev CNAME is correct" "fail" "CNAME for www should point to skhemka07.github.io. Got: '$WWW_RESULT'"
fi

echo ""
echo "→ Checking the homepage loads over HTTPS..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 https://skhemka.dev 2>/dev/null)
if [ "$HTTP_CODE" = "200" ]; then
  check "https://skhemka.dev loads (HTTP 200)" "ok"
elif [ "$HTTP_CODE" = "404" ]; then
  check "https://skhemka.dev loads (HTTP 200)" "fail" "Got 404. The CNAME file in public/ might be missing or GitHub Pages isn't fully deployed yet."
elif [ "$HTTP_CODE" = "000" ]; then
  check "https://skhemka.dev loads (HTTP 200)" "fail" "Couldn't connect at all. DNS may still be propagating, or HTTPS cert hasn't been issued yet."
else
  check "https://skhemka.dev loads (HTTP 200)" "fail" "Got HTTP $HTTP_CODE — check Settings → Pages in your GitHub repo for error messages."
fi

echo ""
echo "→ Checking the curriculum page loads..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 https://skhemka.dev/gcp/infra/ 2>/dev/null)
if [ "$HTTP_CODE" = "200" ]; then
  check "https://skhemka.dev/gcp/infra/ loads" "ok"
else
  check "https://skhemka.dev/gcp/infra/ loads" "fail" "Got HTTP $HTTP_CODE. The build may have failed — check Actions tab on GitHub."
fi

echo ""
echo "→ Checking Lesson 1.1 loads..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 https://skhemka.dev/gcp/infra/1-1-resource-hierarchy/ 2>/dev/null)
if [ "$HTTP_CODE" = "200" ]; then
  check "Lesson 1.1 page loads" "ok"
else
  check "Lesson 1.1 page loads" "fail" "Got HTTP $HTTP_CODE."
fi

echo ""
echo "=========================================="
if [ $FAIL -eq 0 ]; then
  echo "  ✓ All checks passed — your site is live!"
  echo "=========================================="
  echo ""
  echo "Visit https://skhemka.dev/gcp/infra/ to see your curriculum."
  echo ""
  echo "Once everything works, you can optionally re-enable Cloudflare proxy"
  echo "(orange cloud) on each DNS record for free CDN + DDoS protection."
else
  echo "  ${PASS} passed, ${FAIL} failed"
  echo "=========================================="
  echo ""
  echo "Most failures resolve themselves with time. If you've just set up DNS:"
  echo "  - Wait 10-30 minutes and run this script again"
  echo "  - DNS propagation can take up to 1 hour in some cases"
  echo "  - HTTPS certificate provisioning takes another 10-15 minutes after DNS works"
  echo ""
  echo "If something is still broken after an hour, paste the output of this"
  echo "script back to Claude and we'll debug it together."
fi
echo ""
