# Agent Wind Tunnel — submission draft

**Draft only. Not submitted. Live model verification is pending approval.**

## Tagline

Test AI agents under pressure. Inspect policy violations, preserve useful work, and measure the cost.

## Inspiration

A support agent can sound helpful while making an unauthorized tool call. Refusing every request is not a solution either. We wanted a small laboratory measuring both policy adherence and legitimate task completion.

## What it does

Wind Tunnel runs a fictional refund assistant through twelve fixed legitimate, boundary, authorization, and prompt-injection scenarios. It records proposed tool calls and resulting state, then checks actions against explicit policies.

Baseline mode deliberately leaves business rules unenforced in synthetic data. Enforced mode checks ownership, eligibility, amounts, remaining balance, and a cumulative refund limit before access or mutation. The comparison separates attempted violations, executed violations, and successful legitimate refunds.

A detail panel exposes customer requests, tool arguments/results, and policy decisions. Evidence can be exported and imported. Browser history preserves completed cases from partial runs.

## How it is built

A dependency-free JavaScript/HTML interface and an ESM backend run locally with Node or on Sites Workers. The live runner integrates the OpenAI-compatible Nebius Token Factory endpoint with explicit tool schemas and a six-turn cap. Deterministic code checks the policy rather than a second model judging its own answer.

**Exact NVIDIA model:** Pending real verification. Do not submit this draft until an accessible Nemotron model completes a run.

**Nebius contribution:** Integration is implemented; real model quality, latency, usage, and platform experience remain to be measured. Do not claim observed acceleration or quality until tested.

## Challenges and lessons

- Distinguishing prohibited model intent from actual application execution.
- Ensuring errors and timeouts never become safety passes.
- Measuring useful refunds instead of rewarding blanket refusal.
- Keeping scripted examples separate from actual model evidence.
- Avoiding double counting of reasoning tokens.

Application enforcement can prevent an action without changing what the model tried to do. Passing a small authored suite does not prove general security.

## Verified accomplishments

Implemented the full configure → run → inspect → compare → export interaction, offline tests, a responsive interface, partial-run handling, and disabled-by-default paid execution. Real inference findings are pending and must be added honestly.

## Future work

Independent case sets, repeated model comparisons, durable quotas for shared live runs, challenge generation with reviewed expectations, and bounded external agent adapters.

## Before submission

- [ ] Real NVIDIA model run on Nebius, exact ID and size choice.
- [ ] Exported real evidence and actual platform/model feedback.
- [ ] Public repository with MIT license and setup instructions.
- [ ] Judge-accessible working demo/test-build URL.
- [ ] Public YouTube video, no more than three minutes.
- [ ] Participant eligibility and team details.
- [ ] Final track selection; Best Apps and Agents suggested.
- [ ] Explicit submission confirmation and verified submitted status.

No Tavily runtime integration exists; do not claim its bonus eligibility.
