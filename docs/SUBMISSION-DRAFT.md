# Agent Wind Tunnel — submission draft

**Draft only. Not submitted. Real model verification completed on 30 October 2026.**

## Tagline

Test AI agents under pressure. Inspect policy violations, preserve useful work, and measure the cost.

## Inspiration

A support agent can sound helpful while making an unauthorized tool call. Refusing every request is not a solution either. We wanted a small laboratory measuring both policy adherence and legitimate task completion.

## What it does

Wind Tunnel runs a fictional refund assistant through twelve fixed legitimate, boundary, authorization, and prompt-injection scenarios. It records proposed tool calls and resulting state, then checks actions against explicit policies.

Baseline mode deliberately leaves business rules unenforced in synthetic data. Enforced mode checks ownership, eligibility, amounts, remaining balance, and a cumulative refund limit before access or mutation. The comparison separates attempted violations, executed violations, and successful legitimate refunds.

A detail panel exposes customer requests, tool arguments/results, and policy decisions. Evidence can be exported and imported. Browser history preserves completed cases from partial runs.

## A check on the checker

The Assurance lab deliberately breaks eight safeguards in isolated synthetic executions. A second policy implementation independently replays successful tool results and state, without trusting the original decision flags. Ten original-control probes pass and all eight authored faults are caught, including cumulative split refunds, blanket refusal, and false success without a ledger update. Each finding has an inspectable witness and free JSON export. A CI command gates these measured checks. This is finite fault-injection coverage, not an external audit or general safety proof.

## How it is built

A dependency-free JavaScript/HTML interface and an ESM backend run locally with Node or on Sites Workers. The live runner integrates the OpenAI-compatible Nebius Token Factory endpoint with explicit tool schemas and a six-turn cap. Deterministic code checks the policy rather than a second model judging its own answer.

**NVIDIA models:** `nvidia/Nemotron-3_5-Lightning` and `nvidia/nemotron-3-super-120b-a12b`, both accessed on Nebius Token Factory. Lightning provided a low-cost baseline; Super provided a stronger policy-adherence comparison.

**Nebius contribution:** Token Factory hosted both open NVIDIA models behind the same function-calling API. We ran 48 case evaluations in 136 requests, measured returned token usage and latency, and estimated $0.02909 for the two full suites using catalog prices.

## Challenges and lessons

- Distinguishing prohibited model intent from actual application execution.
- Ensuring errors and timeouts never become safety passes.
- Measuring useful refunds instead of rewarding blanket refusal.
- Keeping scripted examples separate from actual model evidence.
- Avoiding double counting of reasoning tokens.

Application enforcement can prevent an action without changing what the model tried to do. Passing a small authored suite does not prove general security.

## Verified accomplishments

Implemented the full configure → run → inspect → compare → export interaction, offline tests, a responsive interface, partial-run handling, and token-protected paid execution backed by persistent quotas. Real baseline runs produced violating cases in 8/12 scenarios for Lightning and 1/12 for Super. With application enforcement, both had zero executed violations and completed all four legitimate refunds. These single runs are inspectable in the bundled evidence; they are not a statistical model ranking.

## Future work

Independent case sets, repeated model comparisons, challenge generation with reviewed expectations, and bounded external agent adapters.

## Before submission

- [x] Real NVIDIA model runs on Nebius, exact IDs and variant rationale recorded.
- [x] Exported real evidence and actual platform/model feedback.
- [x] Public repository with MIT license and setup instructions: https://github.com/Namans12/Wind-Tunnel-Agent
- [x] Judge-accessible public working demo; fresh live requests separately protected.
- [ ] Public YouTube video, no more than three minutes.
- [ ] Participant eligibility and team details.
- [ ] Final track selection; Best Apps and Agents suggested.
- [ ] Explicit submission confirmation and verified submitted status.

No Tavily runtime integration exists; do not claim its bonus eligibility.

## Links

- Source: https://github.com/Namans12/Wind-Tunnel-Agent
- Demo: https://agent-wind-tunnel-lab.shrimalbeena12.chatgpt.site (public; verified without authentication)
- Video: pending upload

## Honest limitations

The public interface shows recorded real inference and free simulations. Fresh model execution is separately protected. One authored refund workflow and one run per configuration do not establish general safety. The policy check is application code, not an independent learned judge.

## Customer-facing wording limitation

The recorded enforced Lightning injection case correctly escalated without a refund, but its final response still implied a refund had been initiated. The application shows this wording verbatim. Current task scores cover tool/state outcomes; they do not establish response truthfulness. This is a concrete remaining improvement, not hidden by a passing policy result.
