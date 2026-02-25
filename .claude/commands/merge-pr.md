---
model: sonnet
---

Merge a pull request, delete its branch, and sync local/remote branches.

Follow these steps exactly:

1. **List active PRs**: Run `gh pr list --state open` to get all open pull requests. If there are no open PRs, stop and inform the user.

2. **Select the PR to merge**:
   - If there is exactly **1 open PR**, select it automatically and tell the user which PR you are about to merge (show PR number, title, and branch).
   - If there are **multiple open PRs**, list them all (number, title, branch, author) and use AskUserQuestion to ask the user which PR number to merge.

3. **Check Greptile review**: Run `gh pr reviews <PR_NUMBER>` and also run `gh api repos/{owner}/{repo}/pulls/<PR_NUMBER>/reviews` to look for any review from Greptile (the reviewer name or bot will contain "greptile"). Check the review body for a confidence score.
   - If Greptile's confidence score is **5 or below** (out of 10), warn the user: show the Greptile review summary and confidence score, then ask whether they want to proceed with the merge anyway using AskUserQuestion.
   - If there is no Greptile review found, inform the user and proceed.
   - If Greptile confidence is above 5, proceed with the merge.
   - If the user provided `$ARGUMENTS` containing "force" or "--force", skip the Greptile check entirely and proceed with the merge.

4. **Check PR mergeability**: Run `gh pr view <PR_NUMBER> --json mergeable,mergeStateStatus,statusCheckRollup` to verify the PR can be merged. If there are failing checks or the PR is not mergeable, warn the user and ask whether to proceed.

5. **Merge the PR**: Run `gh pr merge <PR_NUMBER> --merge --delete-branch` to merge the PR and delete the remote branch in one step. Use `--merge` for a standard merge commit (not squash or rebase).

6. **Sync local branches**:
   - Get the branch name of the merged PR (from step 2).
   - Run `git checkout main && git pull origin main` to switch to main and pull latest changes.
   - Run `git branch -d <branch-name>` to delete the local branch (if it exists). If the branch does not exist locally, skip this step.
   - Run `git remote prune origin` to clean up stale remote-tracking references.

7. **Report back**: Confirm to the user:
   - Which PR was merged (number and title)
   - That the remote branch was deleted
   - That the local branch was deleted (or was not present locally)
   - That local repo is synced with remote

If any step fails, stop and explain what went wrong. Do not force push or use destructive commands.
