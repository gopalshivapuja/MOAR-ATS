# Product Brief – MOAR ATS (India-first GCC-centric ATS)

**Date:** 2025-11-25  
**Authors:** GPT-5.1 (with Gopal)  
**Status:** Draft v1 (based on brainstorming & research outcomes)

---

## 1. Problem & Opportunity
- GCCs in India are scaling from ~1,800 centers today to >2,400 by 2030, generating ~$110 B in export revenue; talent teams lack ATS platforms tuned for compliance-heavy, multi-tenant GCC operations.
- Existing ATS vendors (Talent500, RippleHire) deliver strong workflows but leave gaps in AI explainability, India-first compliance automation, Podman/OpenShift-ready deployments, and curated integration kits for GCC tech stacks.
- Owning the IP lets MOAR build a trust-first ATS that can be dogfooded internally, then monetized externally once battle-tested.

## 2. Vision & Goals
> “Build the most trusted, AI-assisted ATS for India-first GCCs—starting with MOAR Advisory as tenant #1.”

**Primary Goals (MVP):**
1. Deliver an end-to-end recruiting workflow (intake → offer) for MOAR Advisory with branded recruiter/candidate experiences.
2. Provide explainable AI assistance (resume parsing, ranking rationales) that TA leaders can defend to legal/compliance teams.
3. Ship compliance-by-default features (DPDP/GDPR readiness, audit logs, consent tracking) plus integration stubs for HRIS/background checks.
4. Establish enterprise-grade platform foundations (multi-tenant data model, GitOps deployment, observability) to accelerate future GCC onboarding.

## 3. Target Users & Personas
- **Primary:** Head of Talent Acquisition / Strategy at India-based GCCs (e.g., MOAR Advisory) responsible for hiring velocity, compliance, and stakeholder trust.
- **Secondary:** Recruiters, hiring managers, compliance partners, and future AI “agent” hiring workflows (Phase 2).

## 4. Key Features (MVP)
1. **Multi-tenant workflow engine** with configurable stages, SLAs, and role-based access.
2. **MOAR-branded recruiter & candidate portals** (React/Next.js theme) with activity timelines and collaboration tools.
3. **AI assist layer** (Python microservices) for resume parsing, heuristic ranking, and human-readable justifications.
4. **Compliance/audit module** covering consent capture, immutable logs, DPDP/GDPR export/delete flows, and automated evidence packs.
5. **Integration framework** with email/calendar sync, webhook-ready HRIS connectors, and object storage for resumes/offer letters.
6. **Observability & ops** instrumentation (OpenTelemetry, Prometheus/Grafana, tenant-tagged logs) plus Terraform + ArgoCD deployment pipeline.

## 5. Non-Goals (MVP)
- No marketplace/job board aggregation in Phase 1 (manual posting exports only).
- No advanced analytics or compensation benchmarking until after pilot validation.
- No agent-to-agent hiring workflows yet (documented as Phase 2 vision).

## 6. Success Metrics
- Run at least one MOAR hiring pipeline end-to-end without off-platform tools.
- ≥50% reduction in manual scheduling/admin time for the pilot role family.
- 100% of candidate decisions produce audit-ready logs with consent data.
- Recruiter satisfaction (NPS or CSAT) ≥ +30 during pilot.
- AI assist adoption: ≥70% of shortlists reviewed via system-provided ranking/explanations.

## 7. Release & Rollout Plan
1. **Internal Pilot (MOAR Advisory):** Sprint 0–5 roadmap (see README) culminates in dogfood launch; weekly retros capture fixes.
2. **Pilot Hardening:** Address feedback, finalize compliance packs, build onboarding toolkit.
3. **External GCC Rollout (Phase 2):** Offer hosted or Podman/OpenShift-ready deployments with branded themes, integration kits, and documentation (security whitepaper, AI ethics brief, product playbook).

## 8. Risks & Mitigations
- **Scope creep vs. MVP:** Use sprint plan + feature flags to keep focus on core workflows.  
- **Compliance gaps:** Maintain living control matrix; involve legal early; automate audit evidence.  
- **AI trust:** Log every AI action with explanations; enable human overrides; run bias checks per release.  
- **Multi-tenant security:** Enforce row-level security + namespaces; run chaos tests to validate isolation.  
- **Change management:** Provide pilot playbook, training, and instrumentation to monitor adoption.

## 9. Dependencies
- Architecture blueprint & research dossier (done).  
- Branding assets from moaradvisory.in (available).  
- Terraform/K8s infrastructure for dev/staging environments (Sprint 0 setup).  
- Compliance/AI documentation templates (Step 5 plan).  
- Engineering + design bandwidth for sprints 0–5.

## 10. Next Steps
1. Kick off Sprint 0 tasks (repo scaffolding, design system, local stack).  
2. Finalize Terraform + CI/CD pipelines.  
3. Implement MVP epics per roadmap while documenting compliance + AI artifacts in parallel.  
4. Prepare pilot playbook and instrumentation for MOAR tenant launch.

---

_Source references: brainstorming session notes, research report (docs/research-gcc-ats-2025-11-25.md), README build plan._ 

