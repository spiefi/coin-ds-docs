#!/usr/bin/env bash
# Prints, oldest first, the docs-next commits to publish for the given tickets ("#57 #61"):
# commits whose "Ticket: #N" line names one of them and whose change is not on main yet.
# Fails, naming the ticket, when a ticket has nothing left to publish. Needs origin/main and
# origin/docs-next fetched.
set -euo pipefail

tickets="${1:-}"
[ -n "$tickets" ] || { echo "::error::No tickets to publish." >&2; exit 1; }

grep_args=()
for ticket in $tickets; do
  number="${ticket#\#}"
  [[ "$number" =~ ^[0-9]+$ ]] || { echo "::error::“$ticket” is not a ticket number." >&2; exit 1; }
  grep_args+=(--grep "^Ticket: #${number}\$")
done

# --cherry-pick --right-only leaves out docs-next commits whose change main already has.
commits=$(git log --reverse --format=%H --no-merges --cherry-pick --right-only "${grep_args[@]}" origin/main...origin/docs-next)

for ticket in $tickets; do
  number="${ticket#\#}"
  found=""
  for commit in $commits; do
    if git log -1 --format=%B "$commit" | grep -qx "Ticket: #${number}"; then found=1; break; fi
  done
  [ -n "$found" ] || { echo "::error::Nothing to publish for ${ticket}: no commit on docs-next names it, or main already has it." >&2; exit 1; }
done

echo "$commits"
