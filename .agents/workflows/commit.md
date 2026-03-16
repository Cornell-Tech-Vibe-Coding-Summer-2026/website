---
description: Automatically commit changes after completing a user request
---

After completing each user request, follow these steps to commit the changes:

1. Stage all relevant changes using `git add`.
2. Determine a brief, descriptive commit message based on the work performed for the user's request.
3. Run `git commit -m "[Brief description of changes]"`.
4. If appropriate, inform the user that the changes have been committed.

// turbo-all
Example:
`git add . && git commit -m "update paper stack hitbox and disable header text selection"`
