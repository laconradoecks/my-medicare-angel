#!/usr/bin/env bash
#
# Build and upload the site to Namecheap cPanel shared hosting over SSH.
#
#   ./scripts/deploy-namecheap.sh            # build, show what would change
#   ./scripts/deploy-namecheap.sh --run      # actually upload
#   ./scripts/deploy-namecheap.sh --run --prune   # also delete remote files
#                                                 # that are no longer in dist/
#
# Configure by copying .env.deploy.example to .env.deploy (gitignored) and
# filling it in, or by exporting the same variables in your shell.
#
# Authentication uses your SSH key or your normal ssh prompt — this script
# never stores or handles a password.

set -euo pipefail

cd "$(dirname "$0")/.."

# shellcheck disable=SC1091
[ -f .env.deploy ] && source .env.deploy

DEPLOY_HOST="${DEPLOY_HOST:-}"
DEPLOY_USER="${DEPLOY_USER:-}"
# Namecheap shared hosting listens on 21098, not the usual 22.
DEPLOY_PORT="${DEPLOY_PORT:-21098}"
DEPLOY_PATH="${DEPLOY_PATH:-public_html}"

DRY_RUN=1
PRUNE=0
for arg in "$@"; do
  case "$arg" in
    --run) DRY_RUN=0 ;;
    --prune) PRUNE=1 ;;
    *) echo "Unknown option: $arg" >&2; exit 2 ;;
  esac
done

if [ -z "$DEPLOY_HOST" ] || [ -z "$DEPLOY_USER" ]; then
  cat >&2 <<'EOF'
Missing configuration.

Copy .env.deploy.example to .env.deploy and set DEPLOY_HOST and DEPLOY_USER.
Both are in cPanel; the host is usually serverNNN.web-hosting.com, and the
user is your cPanel username.
EOF
  exit 1
fi

echo "==> Building"
npm run build

if [ ! -f dist/.htaccess ]; then
  echo "ERROR: dist/.htaccess is missing — deep links would 404 on Apache." >&2
  exit 1
fi

TARGET="${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"

RSYNC_OPTS=(
  --archive
  --compress
  --human-readable
  --itemize-changes
  # Never touch AutoSSL's validation directory or cPanel's own files.
  --exclude '.well-known'
  --exclude 'cgi-bin'
  --exclude '.htpasswd'
)

if [ "$PRUNE" -eq 1 ]; then
  RSYNC_OPTS+=(--delete)
  echo "==> PRUNE enabled: remote files not present in dist/ will be DELETED"
fi

if [ "$DRY_RUN" -eq 1 ]; then
  RSYNC_OPTS+=(--dry-run)
  echo "==> DRY RUN — nothing will be written. Re-run with --run to apply."
fi

echo "==> Syncing dist/ -> ${TARGET} (port ${DEPLOY_PORT})"
rsync "${RSYNC_OPTS[@]}" -e "ssh -p ${DEPLOY_PORT}" dist/ "$TARGET"

if [ "$DRY_RUN" -eq 1 ]; then
  echo
  echo "Dry run complete. Nothing was uploaded."
else
  echo
  echo "Deployed. Check the site, then hard-reload (Cmd+Shift+R) to bypass cache."
fi
