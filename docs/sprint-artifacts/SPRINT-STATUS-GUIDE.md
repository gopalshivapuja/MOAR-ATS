# Sprint Status File - User Guide

**File Location:** `docs/sprint-artifacts/sprint-status.yaml`

---

## 📋 What is the Sprint Status File?

The sprint status file is your **single source of truth** for tracking development progress. It contains:
- All 13 epics with their current status
- All 52 stories with their current status
- Retrospective tracking for each epic

**Think of it as your project dashboard** - it shows what's done, what's in progress, and what's next.

---

## 🎯 Status Definitions

### Epic Status Flow

```
backlog → contexted
```

- **`backlog`**: Epic exists in epic file but tech context not created yet
- **`contexted`**: Epic tech context has been generated (required before drafting stories)

**Example:**
```yaml
epic-1: backlog  # Not ready yet
epic-1: contexted  # Ready for story drafting
```

### Story Status Flow

```
backlog → drafted → ready-for-dev → in-progress → review → done
```

- **`backlog`**: Story only exists in epic file (not started)
- **`drafted`**: Story file created in `docs/sprint-artifacts/` folder
- **`ready-for-dev`**: Draft approved + story context created
- **`in-progress`**: Developer actively working on implementation
- **`review`**: Implementation complete, ready for code review
- **`done`**: Story completed and approved

**Example:**
```yaml
1-1-project-setup-and-initial-configuration: backlog
1-1-project-setup-and-initial-configuration: drafted
1-1-project-setup-and-initial-configuration: ready-for-dev
1-1-project-setup-and-initial-configuration: in-progress
1-1-project-setup-and-initial-configuration: review
1-1-project-setup-and-initial-configuration: done
```

### Retrospective Status

```
optional ↔ completed
```

- **`optional`**: Can be done but not required
- **`completed`**: Retrospective has been completed

---

## 🔄 How Statuses Update Automatically

### Agents Automatically Update Status

BMAD agents update the sprint status file automatically when you run workflows:

1. **`*epic-tech-context`** (Architect Agent)
   - Updates epic status: `backlog` → `contexted`

2. **`*create-story`** (SM Agent)
   - Updates story status: `backlog` → `drafted`
   - Creates story file in `docs/sprint-artifacts/`

3. **`*story-ready`** (SM Agent)
   - Updates story status: `drafted` → `ready-for-dev`
   - Creates story context file

4. **`*dev-story`** (Dev Agent)
   - Updates story status: `ready-for-dev` → `in-progress`
   - When implementation complete: `in-progress` → `review`

5. **`*code-review`** (SM Agent)
   - Updates story status based on review outcome:
     - **Approve** → `review` → `done`
     - **Changes Requested** → `review` → `in-progress`
     - **Blocked** → stays in `review`

6. **`*story-done`** (Dev Agent)
   - Updates story status: `review` → `done`
   - Adds completion notes to story file

7. **`*sprint-planning`** (SM Agent)
   - Re-runs to refresh auto-detected statuses
   - Detects existing story files and updates statuses

---

## 📖 How to Read the Sprint Status File

### File Structure

```yaml
development_status:
  # Epic 1: Foundation & Infrastructure
  epic-1: backlog
  1-1-project-setup-and-initial-configuration: backlog
  1-2-database-schema-and-prisma-setup: backlog
  # ... more stories ...
  epic-1-retrospective: optional

  # Epic 2: User Authentication & Access
  epic-2: backlog
  2-1-user-registration-with-email-authentication: backlog
  # ... more stories ...
  epic-2-retrospective: optional
```

### Key Format

- **Epic keys**: `epic-{number}` (e.g., `epic-1`, `epic-2`)
- **Story keys**: `{epic}-{story}-{kebab-case-title}` (e.g., `1-1-project-setup-and-initial-configuration`)
- **Retrospective keys**: `epic-{number}-retrospective` (e.g., `epic-1-retrospective`)

### Reading Example

```yaml
epic-1: contexted  # ✅ Epic 1 is contexted, ready for stories
1-1-project-setup-and-initial-configuration: done  # ✅ Story 1.1 is complete
1-2-database-schema-and-prisma-setup: in-progress  # 🔄 Story 1.2 is being worked on
1-3-authentication-foundation-with-nextauth-js: backlog  # ⏳ Story 1.3 not started
epic-1-retrospective: optional  # 📝 Retrospective not done yet
```

---

## 🚀 Typical Workflow Progression

### Step-by-Step Example: Story 1.1

1. **Initial State**
   ```yaml
   epic-1: backlog
   1-1-project-setup-and-initial-configuration: backlog
   ```

2. **After Epic Context** (run `*epic-tech-context` for Epic 1)
   ```yaml
   epic-1: contexted  # ✅ Epic is contexted
   1-1-project-setup-and-initial-configuration: backlog
   ```

3. **After Story Draft** (run `*create-story` for Story 1.1)
   ```yaml
   epic-1: contexted
   1-1-project-setup-and-initial-configuration: drafted  # ✅ Story file created
   ```

4. **After Story Ready** (run `*story-ready` for Story 1.1)
   ```yaml
   epic-1: contexted
   1-1-project-setup-and-initial-configuration: ready-for-dev  # ✅ Ready for development
   ```

5. **After Dev Starts** (run `*dev-story` for Story 1.1)
   ```yaml
   epic-1: contexted
   1-1-project-setup-and-initial-configuration: in-progress  # 🔄 Development in progress
   ```

6. **After Implementation** (Dev completes work)
   ```yaml
   epic-1: contexted
   1-1-project-setup-and-initial-configuration: review  # 📋 Ready for review
   ```

7. **After Code Review** (run `*code-review` - approve)
   ```yaml
   epic-1: contexted
   1-1-project-setup-and-initial-configuration: done  # ✅ Story complete!
   ```

---

## 🛠️ Manual Updates (If Needed)

### When to Update Manually

Usually, you **don't need to update manually** - agents handle it automatically. But you might want to:

1. **Fix a sync issue** - If status file gets out of sync
2. **Bulk status changes** - If moving multiple stories
3. **Quick corrections** - If you notice a wrong status

### How to Update Manually

1. **Open the file**: `docs/sprint-artifacts/sprint-status.yaml`

2. **Find the story/epic key** you want to update

3. **Change the status value** to the new status

4. **Save the file**

**Example:**
```yaml
# Before
1-1-project-setup-and-initial-configuration: in-progress

# After (manually updated)
1-1-project-setup-and-initial-configuration: review
```

### ⚠️ Important Rules

- **Never downgrade statuses** - Don't change `done` back to `in-progress`
- **Follow the state machine** - Only move forward in the flow
- **Preserve comments** - Keep the STATUS DEFINITIONS section
- **Maintain order** - Keep epics and stories in order

---

## 📊 Tracking Progress

### Quick Status Check

You can quickly see progress by counting statuses:

```bash
# Count done stories
grep ": done" docs/sprint-artifacts/sprint-status.yaml | wc -l

# Count in-progress stories
grep ": in-progress" docs/sprint-artifacts/sprint-status.yaml | wc -l

# Count backlog stories
grep ": backlog" docs/sprint-artifacts/sprint-status.yaml | wc -l
```

### Progress Metrics

- **Total Stories**: 52
- **Done Stories**: Count stories with `done` status
- **In Progress**: Count stories with `in-progress` status
- **Ready for Dev**: Count stories with `ready-for-dev` status
- **Backlog**: Count stories with `backlog` status

### Epic Completion

An epic is complete when:
- All stories in the epic have status `done`
- Epic retrospective is `completed` (optional)

---

## 🔄 Refreshing Status (Auto-Detection)

### When to Re-run Sprint Planning

Re-run `*sprint-planning` to refresh auto-detected statuses when:

1. **Story files created manually** - If you create story files outside workflows
2. **Status sync issues** - If statuses seem out of sync
3. **After bulk changes** - If you've made many manual changes
4. **Regular updates** - Periodically to refresh statuses

### What Auto-Detection Does

The sprint-planning workflow automatically detects:

- **Epic context files**: `docs/epic-{num}-context.md` → sets epic to `contexted`
- **Story files**: `docs/sprint-artifacts/{story-key}.md` → sets story to at least `drafted`
- **Story context files**: `docs/sprint-artifacts/{story-key}-context.md` → sets story to at least `ready-for-dev`

**Preservation Rule**: Never downgrades statuses (e.g., won't change `done` to `drafted`)

---

## 💡 Best Practices

### 1. Let Agents Handle Updates

**✅ Do:** Use agent workflows to update statuses automatically
- Run `*create-story` to draft stories
- Run `*dev-story` to start development
- Run `*code-review` to review work
- Run `*story-done` to mark complete

**❌ Don't:** Manually update statuses unless necessary

### 2. Follow the Workflow Order

**✅ Do:** Follow the recommended workflow:
1. Epic context first (`*epic-tech-context`)
2. Then draft stories (`*create-story`)
3. Then make ready (`*story-ready`)
4. Then develop (`*dev-story`)
5. Then review (`*code-review`)
6. Then mark done (`*story-done`)

### 3. Keep Status File in Sync

**✅ Do:** Re-run `*sprint-planning` if you notice sync issues
**✅ Do:** Check status file regularly to track progress
**❌ Don't:** Edit status file while agents are working

### 4. Use Status File for Planning

**✅ Do:** Check status file to see:
- What's ready to work on (`ready-for-dev`)
- What's in progress (`in-progress`)
- What needs review (`review`)
- What's blocking (`review` with changes requested)

---

## 🎯 Common Scenarios

### Scenario 1: Starting a New Story

**Current State:**
```yaml
epic-1: contexted
1-1-project-setup-and-initial-configuration: done
1-2-database-schema-and-prisma-setup: backlog
```

**Action:** Run `*create-story` for Story 1.2

**Result:**
```yaml
epic-1: contexted
1-1-project-setup-and-initial-configuration: done
1-2-database-schema-and-prisma-setup: drafted  # ✅ Updated automatically
```

### Scenario 2: Story Needs Changes After Review

**Current State:**
```yaml
1-3-authentication-foundation-with-nextauth-js: review
```

**Action:** Run `*code-review` → Select "Changes Requested"

**Result:**
```yaml
1-3-authentication-foundation-with-nextauth-js: in-progress  # ✅ Back to in-progress
```

### Scenario 3: Multiple Stories in Parallel

**Current State:**
```yaml
1-4-multi-tenant-middleware-and-row-level-security: ready-for-dev
1-5-core-ui-component-library-setup: ready-for-dev
```

**Action:** Run `*dev-story` for both stories (if team capacity allows)

**Result:**
```yaml
1-4-multi-tenant-middleware-and-row-level-security: in-progress
1-5-core-ui-component-library-setup: in-progress  # ✅ Both in progress
```

---

## 📝 Summary

**The sprint status file is:**
- ✅ Your project dashboard
- ✅ Automatically updated by agents
- ✅ Single source of truth for progress
- ✅ Easy to read and understand

**You typically:**
- ✅ Let agents update it automatically
- ✅ Read it to check progress
- ✅ Re-run sprint-planning to refresh
- ✅ Only manually update if needed

**Remember:**
- Statuses follow a clear state machine
- Agents handle most updates
- File preserves comments and structure
- Never downgrade statuses

---

**Ready to start?** Check the sprint status file to see what's ready to work on, then use the appropriate agent workflow to move stories forward!

---

_Last Updated: 2025-11-25_  
_For: MOAR ATS Project_

