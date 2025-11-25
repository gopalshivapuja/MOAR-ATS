# Implementation & Build Phase - Complete Guide for Beginners

**Welcome to the Build Phase!** 🏗️

This guide explains how you actually BUILD your software, step by step, in simple terms.

---

## 🎯 What is the Implementation Phase?

Think of it like building a house:

- **Planning Phase** = Blueprints and designs (PRD, Architecture, UX)
- **Implementation Phase** = Actually building the house (writing code, testing, deploying)

You've already done the planning - now it's time to build!

---

## 📋 The Big Picture

### What You Have So Far

✅ **PRD** - Your requirements document (what to build)  
✅ **Architecture** - Your technical design (how to build it)  
✅ **UX Design** - Your user interface design (what it looks like)  
✅ **Epics & Stories** - Your work breakdown (what to build first)  
✅ **Sprint Status** - Your tracking file (what's done, what's next)

### What Happens in Implementation

You take each **story** (small piece of work) and:
1. Understand it deeply
2. Write the code
3. Test it works
4. Get it reviewed
5. Mark it done
6. Move to the next story

**Repeat until all stories are done!** 🎉

---

## 🎬 The Complete Workflow (Step by Step)

### Phase Overview

```
Epic Context → Story Draft → Story Ready → Development → Review → Done
```

Let's break this down in simple terms:

---

## Step 1: Epic Technical Context 🧠

**What it is:** Getting the technical details for an entire epic (group of related stories)

**Who does it:** Architect Agent (Winston)

**What happens:**
- You run: `*epic-tech-context` for Epic 1
- Winston reads the epic, architecture, and PRD
- Winston creates a technical context document
- This document explains HOW to build all stories in that epic

**Why it matters:** 
Think of it like getting detailed construction instructions before you start building. You need to know:
- What technologies to use
- How components connect
- What patterns to follow
- Any special considerations

**Example:**
```
Epic 1: Foundation & Infrastructure
→ Winston creates: docs/epic-1-context.md
→ This explains how to set up Next.js, Prisma, authentication, etc.
```

**Result:** Epic status changes from `backlog` → `contexted` ✅

---

## Step 2: Create Story (Draft) 📝

**What it is:** Creating a detailed story document for ONE specific feature

**Who does it:** Scrum Master Agent (SM)

**What happens:**
- You run: `*create-story` for Story 1.1
- SM reads the epic context, PRD, and architecture
- SM creates a detailed story file with:
  - Exact acceptance criteria
  - Technical tasks
  - Implementation steps
  - Testing requirements

**Why it matters:**
This is like getting a detailed recipe for ONE dish. The story file tells you:
- Exactly what to build
- How to know it's done
- What steps to follow
- What to test

**Example:**
```
Story 1.1: Project Setup
→ SM creates: docs/sprint-artifacts/1-1-project-setup-and-initial-configuration.md
→ This has step-by-step instructions for setting up the Next.js project
```

**Result:** Story status changes from `backlog` → `drafted` ✅

---

## Step 3: Story Ready (Make it Dev-Ready) ✅

**What it is:** Finalizing the story and creating technical context

**Who does it:** Scrum Master Agent (SM)

**What happens:**
- You run: `*story-ready` for Story 1.1
- SM reviews the story draft
- SM creates a story context file with:
  - Technical implementation details
  - Code examples
  - Integration points
  - Edge cases to handle

**Why it matters:**
This is like a chef preparing all ingredients before cooking. The story context gives the developer:
- Exact code patterns to use
- Where to put files
- How to integrate with existing code
- What could go wrong

**Example:**
```
Story 1.1 Context
→ SM creates: docs/sprint-artifacts/1-1-project-setup-and-initial-configuration-context.md
→ This has code snippets, file paths, and technical details
```

**Result:** Story status changes from `drafted` → `ready-for-dev` ✅

---

## Step 4: Develop Story (Write the Code) 💻

**What it is:** Actually writing the code to implement the story

**Who does it:** Dev Agent

**What happens:**
- You run: `*dev-story` for Story 1.1
- Dev Agent reads the story and story context
- Dev Agent writes the actual code:
  - Creates files
  - Writes functions
  - Implements features
  - Adds tests
- Dev Agent updates the story file with implementation notes

**Why it matters:**
This is the actual BUILDING part! The Dev Agent:
- Creates the code files
- Implements the features
- Makes sure it works
- Documents what was built

**Example:**
```
Story 1.1 Development
→ Dev creates: src/app/page.tsx, package.json, next.config.js, etc.
→ Dev writes the actual Next.js setup code
→ Dev tests that it works
→ Dev updates story file with implementation details
```

**Result:** Story status changes from `ready-for-dev` → `in-progress` → `review` ✅

---

## Step 5: Code Review (Check the Work) 🔍

**What it is:** Reviewing the code to make sure it's good quality

**Who does it:** Scrum Master Agent (SM)

**What happens:**
- You run: `*code-review` for Story 1.1
- SM reads the code that was written
- SM checks:
  - Does it meet acceptance criteria?
  - Is the code quality good?
  - Are there any bugs?
  - Does it follow architecture patterns?
- SM provides feedback:
  - ✅ Approve (it's good!)
  - ⚠️ Changes Requested (fix these things)
  - ❌ Blocked (can't proceed, major issues)

**Why it matters:**
This is like quality control. You want to catch problems BEFORE they cause issues. The review ensures:
- Code works correctly
- Code follows best practices
- Code matches the design
- No bugs or security issues

**Example:**
```
Story 1.1 Review
→ SM reviews all the code files
→ SM checks: "Does the Next.js setup match the architecture?"
→ SM approves or requests changes
```

**Result:** 
- If approved: Story status `review` → `done` ✅
- If changes needed: Story status `review` → `in-progress` (go back to Step 4)

---

## Step 6: Story Done (Mark Complete) 🎉

**What it is:** Officially marking the story as complete

**Who does it:** Dev Agent

**What happens:**
- You run: `*story-done` for Story 1.1
- Dev Agent marks the story as done
- Dev Agent adds completion notes
- Sprint status file is updated

**Why it matters:**
This closes the loop! The story is:
- ✅ Complete
- ✅ Reviewed
- ✅ Tested
- ✅ Documented

**Result:** Story status is `done` ✅

---

## 🔄 The Complete Cycle

Here's how one story flows through the system:

```
1. Epic Context (Architect)
   ↓
2. Create Story (SM)
   ↓
3. Story Ready (SM)
   ↓
4. Develop Story (Dev)
   ↓
5. Code Review (SM)
   ↓
6. Story Done (Dev)
   ↓
   REPEAT for next story!
```

---

## 📊 Tracking Progress

### Sprint Status File

The `sprint-status.yaml` file tracks everything:

```yaml
epic-1: contexted  # ✅ Epic has technical context
1-1-project-setup: done  # ✅ Story 1.1 is complete
1-2-database-schema: in-progress  # 🔄 Story 1.2 is being built
1-3-authentication: backlog  # ⏳ Story 1.3 not started yet
```

**You can see:**
- What's done ✅
- What's in progress 🔄
- What's ready to work on 📋
- What's not started yet ⏳

---

## 🎯 Real-World Example: Building Story 1.1

Let's walk through building "Project Setup" step by step:

### Step 1: Epic Context
```
You: "Winston, create tech context for Epic 1"
Winston: "Creating epic-1-context.md with Next.js setup details..."
Result: Epic 1 is now "contexted"
```

### Step 2: Create Story
```
You: "SM, create story for 1.1"
SM: "Creating story file with setup instructions..."
Result: Story 1.1 is now "drafted"
```

### Step 3: Story Ready
```
You: "SM, make story 1.1 ready for dev"
SM: "Creating story context with code examples..."
Result: Story 1.1 is now "ready-for-dev"
```

### Step 4: Develop
```
You: "Dev, implement story 1.1"
Dev: "Creating Next.js project, setting up TypeScript, Tailwind..."
Dev: "Writing code, creating files..."
Result: Story 1.1 is now "review"
```

### Step 5: Review
```
You: "SM, review story 1.1"
SM: "Checking code quality, testing setup..."
SM: "✅ Approved! Everything looks good."
Result: Story 1.1 is now "done"
```

### Step 6: Done
```
You: "Dev, mark story 1.1 as done"
Dev: "Marking complete, adding notes..."
Result: Story 1.1 is complete! ✅
```

**Now you move to Story 1.2 and repeat!**

---

## 🚀 Parallel Work (Working on Multiple Stories)

**Can you work on multiple stories at once?**

Yes! If you have capacity, you can:

```
Story 1.2: in-progress (you're coding it)
Story 1.3: ready-for-dev (waiting for you)
Story 1.4: ready-for-dev (waiting for you)
```

**But be careful:**
- Don't start too many at once
- Finish one before starting too many new ones
- Make sure stories don't depend on each other

---

## 🎓 Key Concepts Explained Simply

### What's an Epic?
**Think:** A big feature area (like "User Authentication" or "Job Management")
- Contains multiple related stories
- Needs technical context before stories can be built

### What's a Story?
**Think:** One specific feature to build (like "User Login" or "Create Job Posting")
- Small enough to complete in one cycle
- Has clear acceptance criteria
- Can be tested independently

### What's Sprint Status?
**Think:** Your project dashboard
- Shows what's done
- Shows what's in progress
- Shows what's next
- Updates automatically as you work

### What's Story Context?
**Think:** Technical instructions for building a story
- Code examples
- File locations
- Integration points
- Technical details

---

## 💡 Pro Tips for Beginners

### 1. Start Small
- Begin with Epic 1 (Foundation)
- Complete Story 1.1 first
- Don't rush - understand each step

### 2. Follow the Order
- Epic context BEFORE stories
- Story draft BEFORE development
- Development BEFORE review
- Review BEFORE done

### 3. Check Status Regularly
- Look at sprint-status.yaml
- See what's ready to work on
- Track your progress

### 4. Ask Questions
- If something is unclear, ask!
- Review the story file
- Check the architecture document

### 5. Test as You Go
- Make sure code works
- Test each feature
- Fix bugs early

---

## 🎯 Your First Steps

### Ready to Start Building?

1. **Check Sprint Status**
   ```
   Look at: docs/sprint-artifacts/sprint-status.yaml
   See what's ready to work on
   ```

2. **Start with Epic 1**
   ```
   Run: *epic-tech-context (for Epic 1)
   This creates the technical foundation
   ```

3. **Create First Story**
   ```
   Run: *create-story (for Story 1.1)
   This creates detailed instructions
   ```

4. **Make Story Ready**
   ```
   Run: *story-ready (for Story 1.1)
   This makes it ready for development
   ```

5. **Start Building!**
   ```
   Run: *dev-story (for Story 1.1)
   This actually writes the code
   ```

6. **Review and Complete**
   ```
   Run: *code-review (for Story 1.1)
   Then: *story-done (for Story 1.1)
   ```

**Then repeat for the next story!** 🎉

---

## 🔍 Understanding the Agents

### Architect Agent (Winston) 🏗️
- **Does:** Creates technical context for epics
- **When:** Before you start building stories in an epic
- **Command:** `*epic-tech-context`

### Scrum Master Agent (SM) 📋
- **Does:** Creates stories, makes them ready, reviews code
- **When:** Before development, after development
- **Commands:** `*create-story`, `*story-ready`, `*code-review`

### Dev Agent 💻
- **Does:** Writes the actual code
- **When:** When story is ready-for-dev
- **Commands:** `*dev-story`, `*story-done`

---

## 📚 Related Documents

- **Sprint Status Guide:** `docs/sprint-artifacts/SPRINT-STATUS-GUIDE.md`
- **Architecture:** `docs/architecture.md`
- **Epics:** `docs/epics.md`
- **PRD:** `docs/prd.md`

---

## 🎉 Summary

**Implementation Phase = Building Your Software**

1. **Epic Context** → Get technical details for a group of stories
2. **Create Story** → Create detailed instructions for one feature
3. **Story Ready** → Make it ready for development
4. **Develop** → Write the actual code
5. **Review** → Check the code quality
6. **Done** → Mark it complete

**Repeat until all stories are done!**

**The sprint status file tracks everything automatically.**

**You're building your software, one story at a time!** 🚀

---

_Last Updated: 2025-11-25_  
_For: MOAR ATS Project_  
_Written for beginners learning to build software_

