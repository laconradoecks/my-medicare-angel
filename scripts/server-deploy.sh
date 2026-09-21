#!/bin/bash
#
# Publishes the latest GitHub Actions build of mymedicareangel.com.
#
# Runs from cron every 5 minutes on the Namecheap host. GitHub Actions builds
# and prerenders the site and pushes the result to the `deploy` branch; this
# script copies a new build into the web root and otherwise does nothing.
# version.txt holds the commit each build came from, which is how this script
# and the workflow's final step both tell one build from the next.
#
# Install from the cPanel terminal, then add the cron job (see README.md):
#   mkdir -p ~/bin && curl -fsSL https://raw.githubusercontent.com/laconradoecks/my-medicare-angel/main/scripts/server-deploy.sh -o ~/bin/deploy-mymedicareangel.sh

set -euo pipefail

# cron runs with a minimal PATH, and cPanel keeps git outside it.
export PATH="/usr/local/cpanel/3rdparty/lib/path-bin:/usr/local/bin:/usr/bin:/bin"

REPO_URL="${REPO_URL:-https://github.com/laconradoecks/my-medicare-angel.git}"
CLONE="${CLONE:-$HOME/repos/my-medicare-angel-site}"
SITE="${SITE:-$HOME/mymedicareangel.com}"

# Skip this run if the previous one is still copying.
if command -v flock >/dev/null 2>&1; then
  exec 9>"$HOME/.mymedicareangel-deploy.lock"
  flock -n 9 || exit 0
fi

if [ ! -d "$CLONE/.git" ]; then
  mkdir -p "$(dirname "$CLONE")"
  git clone -q --branch deploy --single-branch "$REPO_URL" "$CLONE"
fi

cd "$CLONE"
git fetch -q origin deploy
git reset -q --hard origin/deploy

# This build is already live.
if [ -f version.txt ] && cmp -s version.txt "$SITE/version.txt"; then
  exit 0
fi

# --checksum compares file contents. rsync's default size-and-time check can skip
# a changed file that happens to match both, which a build can produce.
#
# --delete removes pages the build no longer contains, so a page taken off the
# site (an unfinished article, a section held back) actually stops being served
# instead of sitting there from an older deploy. Excluded paths are protected
# from deletion by rsync, which is what keeps the host's own files — AutoSSL
# challenges, cPanel's PHP settings, logs — out of its way.
rsync -a --checksum --delete \
  --exclude '.git' \
  --exclude '.well-known' \
  --exclude 'cgi-bin' \
  --exclude '.user.ini' \
  --exclude 'php.ini' \
  --exclude '.ftpquota' \
  --exclude 'error_log' \
  ./ "$SITE/"
echo "$(date '+%Y-%m-%d %H:%M:%S') published build $(cat version.txt 2>/dev/null || echo '(no version.txt)')"
