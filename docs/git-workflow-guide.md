# How to Work a Card — Team Git Guide

This guide follows one card from start to finish, using VS Code and GitHub. It is written for anyone who has not used GitHub in a team before.

The example uses card 14, "Build Rejected page: GET and filter". Replace the names and numbers with your own card.

## The short version

1. Pull the latest `main`.
2. Create a branch named after the card, such as `feature/board-columns`.
3. Open a pull request with `Closes #N` in the description.
4. Your reviewer approves and merges. Never merge your own pull request.

The rest of this guide explains each step.

---

## One-time setup (do this once)

### 1. Accept the invite

Member A adds you as a collaborator. GitHub sends you an email. Click **Accept invitation**. Without this, you cannot push.

### 2. Tell Git who you are

Open VS Code's terminal with **View → Terminal**, then run these two lines. Use the same email as your GitHub account.

```
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

This step matters for your grade. GitHub links each commit to an account by email. If the email does not match, your commits will not show under your name, and the brief uses commit history to assess each person.

### 3. Clone the repo

In VS Code, press **Ctrl+Shift+P**, type **Git: Clone**, and paste the repo URL from GitHub's green **Code** button. Pick a folder on your computer, then click **Open** when VS Code asks.

### 4. Install the packages

In the terminal, run:

```
npm install
npm run dev
```

Open the link shown in the terminal and check the app loads.

---

## Working one card

### Step 1: Start the card

On the GitHub Project board, drag your card from **Todo** to **In Progress**. Note its issue number, such as **#14**.

### Step 2: Get the latest `main`

Other members merge work all the time. You must start from the newest version, or your branch will be out of date.

1. Look at the **bottom-left corner** of VS Code. It shows your current branch name.
2. If it does not say `main`, click it and choose **main** from the list.
3. Open the **Source Control** panel with **Ctrl+Shift+G**.
4. Click the **⋯** menu at the top of the panel and choose **Pull**.

Terminal version:

```
git checkout main
git pull
```

### Step 3: Create your branch

1. Click the branch name in the bottom-left corner again.
2. Choose **+ Create new branch...**.
3. Type the name, such as `feature/rejected-page`, and press Enter.

The bottom-left corner now shows `feature/rejected-page`.

> **Check the bottom-left corner every time before you start coding.** If it says `main`, stop and create your branch first.

Terminal version:

```
git checkout -b feature/rejected-page
```

### Step 4: Write code and commit

Work on your card as normal. Commit whenever you finish a small piece, and at least once per working session.

1. Open the **Source Control** panel. It lists every file you changed.
2. Click a file to see what changed. Red lines were removed and green lines were added. Check that you only changed what you meant to.
3. Hover over a file and click **+** to stage it. Staging means "include this file in the next commit".
4. Type a message in the box at the top, such as `Add GET and filter to Rejected page`.
5. Click **Commit**.

Terminal version:

```
git add src/pages/RejectedPage.jsx
git commit -m "Add GET and filter to Rejected page"
```

A commit only saves the change on your computer. Nobody else can see it yet.

Good commit messages say what changed:

| Good | Bad |
| --- | --- |
| `Add DELETE to Rejected page` | `fix` |
| `Show error when POST fails` | `update` |
| `Add createCandidate to api.js` | `stuff` |

### Step 5: Push your branch to GitHub

The first time, the Source Control panel shows a **Publish Branch** button. Click it. This creates your branch on GitHub and uploads your commits.

After that, the button changes to **Sync Changes**. Click it after each commit to upload new work.

Terminal version:

```
git push -u origin feature/rejected-page    (first time)
git push                                     (every time after)
```

### Step 6: Open a pull request

A pull request asks your team to review your branch and merge it into `main`.

1. Open the repo on GitHub. A yellow banner appears near the top: **"feature/rejected-page had recent pushes"**. Click **Compare & pull request**.
2. Check the top line reads **base: main ← compare: feature/rejected-page**.
3. Write a clear title, such as `Rejected page: GET and filter`.
4. In the description, write what you changed, how to test it, and the closing line:

   ```
   Adds the Rejected page. It loads all candidates and shows only rejected ones.

   To test: open /rejected. Two or three seed candidates should appear.

   Closes #14
   ```

5. On the right side, click **Reviewers** and pick your reviewer from the rotation below.
6. Click **Create pull request**.

`Closes #14` links the pull request to issue #14. When the pull request merges, GitHub closes the issue and moves the card to Done.

**Review rotation**

| Author | Reviewer |
| --- | --- |
| A | C |
| B | A |
| C | B |

### Step 7: Review and fix

Your reviewer gets a notification. They open the pull request and click the **Files changed** tab. They can leave comments on single lines.

When done, they click **Review changes** and choose one of these:

- **Approve**: the code is ready to merge.
- **Request changes**: something needs fixing first.

If they request changes, fix the code in VS Code on the same branch. Commit and push again with **Sync Changes**. The pull request updates by itself. You do not open a new one.

**For reviewers:** only approve code you understand. Every member must be able to explain any part of the codebase. If something is unclear, ask in a comment before approving. Check the code against the "Done when" list in the issue.

### Step 8: Merge

The reviewer merges, not the author.

1. The reviewer clicks **Merge pull request**, then **Confirm merge**.
2. GitHub shows a **Delete branch** button. The reviewer clicks it. The branch is no longer needed, because its work is now in `main`.

The issue closes, and the card moves to **Done** on its own.

### Step 9: Clean up on your computer

1. Switch back to `main` using the bottom-left corner.
2. Pull again, as in Step 2. Your merged work now appears in `main`.
3. Delete your old local branch. Press **Ctrl+Shift+P**, type **Git: Delete Branch**, and pick it.

Terminal version:

```
git checkout main
git pull
git branch -d feature/rejected-page
```

You are now ready for the next card. Go back to Step 1.

---

## Common problems

**"I committed on `main` by mistake."**
Branch protection stops the push, so nothing breaks on GitHub. Do not try to fix it alone. Ask Member A, who can help move the commits to a branch.

**"`main` changed while I was working."**
If your pull request says the branch is out of date, bring in the new `main`. While on your branch, run:

```
git pull origin main
```

Then push again with **Sync Changes**.

**"There is a merge conflict."**
This means you and someone else changed the same lines. VS Code highlights the clashing lines and offers buttons such as **Accept Current** and **Accept Incoming**. If you are unsure which to keep, ask the person who wrote the other change. This is rare if everyone edits only their own files.

**"My commits do not show under my name on GitHub."**
Your Git email does not match your GitHub account. Redo one-time setup step 2 with the correct email. New commits will then link to you.

---

## Checklist for every card

- [ ] Card dragged to **In Progress**
- [ ] On `main`, pulled the latest
- [ ] New branch created, and its name shows in the bottom-left corner
- [ ] Small commits with clear messages
- [ ] Branch pushed to GitHub
- [ ] Pull request opened with `Closes #N` and a reviewer assigned
- [ ] Review comments fixed on the same branch
- [ ] Reviewer merged and deleted the branch
- [ ] Back on `main`, pulled, old local branch deleted
