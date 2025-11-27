import Link from "next/link";
import { ArrowRight, CheckCircle2, Database, ShieldCheck, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const highlights = [
  {
    title: "Multi-tenant isolation",
    description: "Row-Level Security enforced in Prisma + Postgres with async context guards.",
    icon: ShieldCheck,
  },
  {
    title: "NextAuth foundations",
    description: "Credential-based auth with bcrypt hashing, JWT sessions, and middleware guards.",
    icon: UsersRound,
  },
  {
    title: "Dev-ready UI kit",
    description: "Trust Navy theme, shadcn/ui components, and responsive layouts documented in /showcase.",
    icon: CheckCircle2,
  },
];

const testingChecklist = [
  "Docker dev stack up (Postgres 16 + Redis 7)",
  "npm run dev + npm run test / test:e2e",
  "Prisma migrations + seeds executed",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f8fc] via-white to-white text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 lg:px-8 lg:py-20">
        <header className="grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#e3edfb] px-4 py-1 text-sm font-semibold text-[#0d47a1]">
              <ShieldCheck className="size-4" aria-hidden />
              Epic 1 · Foundation Complete
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-[#1e2a3d] sm:text-5xl">
                Multi-tenant hiring infrastructure for regulated advisory firms.
              </h1>
              <p className="text-lg text-slate-600">
                MOAR ATS ships a secure spine for everything that follows: hardened authentication,
                row-level isolation, reusable UI components, and a dev stack that mirrors production.
                Epic 1 proves the plumbing works before we pile on workflows.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/login">
                  Sign In
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/showcase">View Component Library</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-500">
              <div>
                <p className="text-3xl font-semibold text-[#1e3a5f]">4</p>
                <p>Stories implemented</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-[#1e3a5f]">33</p>
                <p>UI unit tests</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-[#1e3a5f]">100%</p>
                <p>Tenant isolation coverage</p>
              </div>
            </div>
          </div>

          <Card className="shadow-xl shadow-slate-200/80">
            <CardHeader>
              <CardTitle className="text-xl text-[#1e3a5f]">What shipped in Epic 1</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-sm leading-6 text-slate-600">
              <div className="flex items-start gap-3">
                <Database className="mt-1 size-5 text-[#0d47a1]" aria-hidden />
                <p>
                  <strong>Postgres + Prisma RLS:</strong> Async context tags every query; policies lock
                  data per tenant automatically.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <UsersRound className="mt-1 size-5 text-[#0d47a1]" aria-hidden />
                <p>
                  <strong>NextAuth + middleware:</strong> Secure credential auth with JWT sessions,
                  tenant cookies, and per-route guards.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 size-5 text-[#0d47a1]" aria-hidden />
                <p>
                  <strong>Trust Navy UI system:</strong> Buttons, forms, skeletons, and toast patterns with
                  documented accessibility behaviours.
                </p>
              </div>
            </CardContent>
          </Card>
        </header>

        <section className="grid gap-8 rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-lg shadow-slate-200/50 lg:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="space-y-3 border-slate-100 lg:border-r last:border-none lg:pr-6">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#eff3fb] text-[#0d47a1]">
                <item.icon className="size-5" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold text-[#1e3a5f]">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <Card className="border-[#d6e2fb]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#1e3a5f]">Manual testing flight plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-slate-600">
              <ol className="space-y-4 text-base">
                <li>
                  <span className="font-semibold text-[#0d47a1]">1.</span> Start the dev stack:
                  <code className="mx-2 rounded-md bg-slate-100 px-2 py-1 text-sm text-slate-800">
                    ./scripts/dev-stack.sh up
                  </code>
                  then `npm run dev`.
                </li>
                <li>
                  <span className="font-semibold text-[#0d47a1]">2.</span> Hit `/login`, sign in with the seeded recruiter account,
                  and expect a tenant-scoped session cookie.
                </li>
                <li>
                  <span className="font-semibold text-[#0d47a1]">3.</span> Browse `/showcase` plus any protected API route; middleware
                  should set <code>X-Tenant-ID</code> on responses.
                </li>
              </ol>
              <div className="rounded-2xl bg-[#f5f8ff] p-4 text-sm text-slate-700">
                <p className="font-medium text-[#0d47a1]">Pre-flight checklist</p>
                <ul className="mt-2 space-y-1">
                  {testingChecklist.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-[#28a745]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e3edfb] bg-[#f9fbff]">
            <CardHeader>
              <CardTitle className="text-[#0d47a1]">Need a refresher?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-600">
              <p>
                Dive into <span className="font-semibold text-[#0d47a1]">docs/LOCAL-DEVELOPMENT-SETUP.md</span>,
                run the Prisma studio helper, or open the component showcase to see the Trust Navy theme in action.
              </p>
              <div className="rounded-2xl bg-white p-4 shadow-inner shadow-slate-200">
                <p className="font-semibold text-[#1e3a5f]">QA Credentials</p>
                <p className="mt-1 font-mono text-xs text-slate-700">demo+qa@moarats.com / Recruiter123!</p>
                <p className="mt-2 text-xs text-slate-500">
                  Update via <code>npm run db:seed</code> or Prisma Studio when rotating demo accounts.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="rounded-3xl border border-slate-100 bg-white/90 p-8 text-sm text-slate-500 shadow-inner">
          <p className="text-base text-slate-600">
            Epic 1 locked in the boring but critical stuff—infra, auth, middleware, and UI primitives. Everything from Epic 2 onward
            builds on this foundation, so keep this page handy as a regression reference.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#0d47a1]">
            <span>📄 docs/deployment/DEPLOYMENT-STRATEGY.md</span>
            <span>📘 docs/sprint-artifacts/tech-spec-epic-1.md</span>
            <span>🧩 docs/sprint-artifacts/1-5-core-ui-component-library-setup.md</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
