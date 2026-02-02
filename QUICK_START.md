# 🚀 Quick Start Guide

## The Big Picture (30 Second Overview)

```
YOU (Admin)                    YOUR VISITORS
    │                              │
    ▼                              ▼
┌─────────┐     ┌─────────┐    ┌─────────────┐
│  /admin │ ──▶ │SUPABASE │ ◀──│ /industries │
│  panel  │     │   DB    │    │   pages     │
└─────────┘     └─────────┘    └─────────────┘
                     
   CREATE            STORES         DISPLAYS
   EDIT              DATA           CONTENT
   DELETE
```

**That's it!** You create use cases in admin, they get stored in Supabase, and visitors see them on industry pages.

---

## How Files Are Organized

```
📁 Your Project
│
├── 📂 types/          ← "What shape is the data?" (TypeScript definitions)
│
├── 📂 services/       ← "How do I talk to the database?" (Supabase queries)
│
├── 📂 hooks/          ← "How do I manage data in React?" (useUseCases hook)
│
└── 📂 app/
    ├── 📂 admin/      ← "Where do I create content?" (Admin panel)
    └── 📂 industries/ ← "Where do visitors see content?" (Public pages)
```

---

## The 4 Layers (Bottom to Top)

```
┌─────────────────────────────────────────────────────────────┐
│  4. UI COMPONENTS     (app/admin/_components/)              │
│     What you SEE on screen                                  │
│     Buttons, forms, cards, modals                          │
└─────────────────────────────────────────────────────────────┘
                         ▲ uses
┌─────────────────────────────────────────────────────────────┐
│  3. HOOKS             (hooks/useUseCases.ts)                │
│     Manages STATE in React                                  │
│     Loading, errors, notifications                         │
└─────────────────────────────────────────────────────────────┘
                         ▲ calls
┌─────────────────────────────────────────────────────────────┐
│  2. SERVICES          (services/supabase/)                  │
│     Talks to DATABASE                                       │
│     Create, Read, Update, Delete                           │
└─────────────────────────────────────────────────────────────┘
                         ▲ queries
┌─────────────────────────────────────────────────────────────┐
│  1. DATABASE          (Supabase PostgreSQL)                 │
│     STORES the data                                         │
│     use_cases table                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Common Tasks

### "I want to add a use case"
1. Go to `/admin`
2. Select an industry
3. Click "Add Use Case"
4. Fill the form → Submit

### "I want to add a new industry"
1. Create config: `app/industries/_data/[name].ts`
2. Register it: `app/industries/_data/index.ts`
3. Create page: `app/industries/[name]/page.tsx`

### "I want to add a new field"
1. Update type: `types/index.ts`
2. Update DB: Run SQL in Supabase
3. Update service: `services/supabase/use-cases.service.ts`
4. Update form: `app/admin/_components/UseCaseForm.tsx`

---

## Key Files to Know

| File | What It Does |
|------|--------------|
| `app/admin/page.tsx` | Main admin page - orchestrates everything |
| `hooks/useUseCases.ts` | Manages use case data and operations |
| `services/supabase/use-cases.service.ts` | Database queries |
| `types/index.ts` | Type definitions |
| `app/industries/_lib/getUseCases.ts` | Fetches data for industry pages |

---

## URLs

- **Admin Panel**: `http://localhost:3000/admin`
- **Healthcare Page**: `http://localhost:3000/industries/healthcare`
- **Aerospace Page**: `http://localhost:3000/industries/aerospace-and-defense`

---

## Need More Detail?

Read `ARCHITECTURE.md` for the full technical documentation with detailed diagrams.

