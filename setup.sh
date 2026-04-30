#!/bin/bash
# skhemka.dev — one-shot setup script
# Run this from the directory where you unzipped skhemka-dev-site.zip
# It handles all the git work. You handle GitHub repo creation in the browser first.

set -e  # Exit on any error

echo ""
echo "=========================================="
echo "  skhemka.dev — site setup"
echo "=========================================="
echo ""

# Verify we're in the right place
if [ ! -f "astro.config.mjs" ]; then
  echo "❌ ERROR: I can't find astro.config.mjs in the current folder."
  echo "   Make sure you've unzipped skhemka-dev-site.zip and that you're"
  echo "   inside the skhemka07-learn folder before running this script."
  echo ""
  echo "   Try:  cd skhemka07-learn"
  echo "   Then run this script again."
  exit 1
fi

echo "✓ Found astro.config.mjs — we're in the right place"
echo ""

# Check git is installed
if ! command -v git &> /dev/null; then
  echo "❌ ERROR: git is not installed."
  echo "   Install it from https://git-scm.com/downloads then run this again."
  exit 1
fi

echo "✓ git is installed"
echo ""

# Confirm with the user
echo "Before we continue, you need to have:"
echo "  1. Created a GitHub repo named 'skhemka-dev' under your skhemka07 account"
echo "     (Go to github.com/new — don't initialize it with a README)"
echo "  2. Have your GitHub username ready (probably 'skhemka07')"
echo ""
read -p "Have you created the GitHub repo? (y/n) " confirmed

if [ "$confirmed" != "y" ]; then
  echo ""
  echo "No problem — go to https://github.com/new and create a repo named"
  echo "'skhemka-dev' (public, no README). Then run this script again."
  exit 0
fi

echo ""
read -p "GitHub username [skhemka07]: " github_user
github_user=${github_user:-skhemka07}

REPO_URL="https://github.com/${github_user}/skhemka-dev.git"
echo ""
echo "Will push to: $REPO_URL"
read -p "Looks right? (y/n) " confirmed

if [ "$confirmed" != "y" ]; then
  echo "Aborted. No changes made."
  exit 0
fi

echo ""
echo "→ Initializing git repository..."
git init -q

echo "→ Staging all files..."
git add -A

echo "→ Creating initial commit..."
git commit -q -m "Initial scaffold + lessons 1.1 and 1.2"

echo "→ Setting branch name to main..."
git branch -M main

echo "→ Adding remote..."
git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"

echo "→ Pushing to GitHub..."
echo "   (You may be prompted for your GitHub username and a Personal Access Token —"
echo "    GitHub no longer accepts passwords. If you need a token, get one at:"
echo "    https://github.com/settings/tokens — give it 'repo' scope.)"
echo ""

git push -u origin main

echo ""
echo "=========================================="
echo "  ✓ Code is on GitHub!"
echo "=========================================="
echo ""
echo "Next steps (in your browser):"
echo ""
echo "  1. Go to: https://github.com/${github_user}/skhemka-dev/settings/pages"
echo "     - Source: select 'GitHub Actions'"
echo "     - Custom domain: enter 'skhemka.dev', click Save"
echo ""
echo "  2. Watch the build run at:"
echo "     https://github.com/${github_user}/skhemka-dev/actions"
echo "     (Takes ~90 seconds)"
echo ""
echo "  3. Configure DNS in Cloudflare — see DNS_RECORDS.md for the exact records"
echo ""
echo "  4. Run ./verify-setup.sh once DNS has had ~10 minutes to propagate"
echo ""
