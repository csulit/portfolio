---
model: sonnet
---

Create a new branch, commit all changes, push, and open a PR to main.

Follow these steps exactly:

1. **Check for changes**: Run `git status` to confirm there are changes to commit. If there are no changes, stop and inform the user.

2. **Generate a branch name**: Based on the staged/unstaged changes, generate a descriptive kebab-case branch name. Use prefixes like `feat/`, `fix/`, `refactor/`, `docs/`, `chore/`, or `style/` as appropriate. For example: `feat/add-user-auth` or `fix/mobile-carousel-scaling`.

3. **Create and switch to the new branch**: Run `git checkout -b <branch-name>` from the latest main. If not already on main, first run `git checkout main && git pull origin main`, then create the branch.

4. **Stage all changes**: Run `git add .`.

5. **Analyze changes and create a detailed commit**: Run `git diff --cached` to review all staged changes. Write a detailed commit message following conventional commit format:
   - First line: type(scope): concise summary (under 72 chars)
   - Blank line
   - Body: detailed description of what changed and why, broken into bullet points if multiple changes
   - Footer: Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>

6. **Push the branch**: Run `git push -u origin <branch-name>`.

7. **Create a Pull Request**: Use `gh pr create` targeting the `main` branch. The PR should have:
   - A clear, concise title (under 70 chars)
   - A body with:
     - `## Summary` section with bullet points describing the changes
     - `## Test plan` section with a checklist of testing steps
     - Footer: 🤖 Generated with [Claude Code](https://claude.com/claude-code)

8. **Report back**: Share the PR URL with the user.

If any step fails, stop and explain what went wrong. Do not force push or use --no-verify.
