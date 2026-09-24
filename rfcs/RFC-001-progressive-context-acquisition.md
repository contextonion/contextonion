# RFC-001: Progressive Context Acquisition for Engineering Agents

## Status

Draft

## Authors

Orlando Garcia

## Summary

The Context Onion is a model for progressive context acquisition by engineering agents. It separates engineering knowledge into four layers:

1. Current Task
2. System Understanding
3. Task Context
4. Organizational Context

Agents begin with the current task, acquire enough system understanding to locate the behavior in the larger system, narrow that understanding into task-specific implementation context, and resolve applicable organizational guidance. They expand context further only while relevant uncertainty remains.

The model is intentionally different from “read all relevant code first.” It gives agents a route to sufficient context without requiring costly bottom-up reconstruction of system behavior from implementation alone.

`AGENTS.md` is not a Context Onion layer. It may act as a repository context router across the layers. Likewise, MCP servers, search, code intelligence, catalogs, documentation systems, retrieval systems, and verification systems are mechanisms that help acquire or evaluate context; they are not layers in the model.

The key words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** in this document are to be interpreted as described by BCP 14 when, and only when, they appear in all capitals.

## Motivation

Engineering agents often begin with raw implementation exploration and are forced to reconstruct system behavior bottom-up. An agent may find locally relevant code while still lacking the architecture, workflow, ownership boundary, or organizational constraint needed to change it safely.

This failure mode creates avoidable costs:

- unnecessary repository scanning;
- following irrelevant dependencies;
- loading excessive context;
- discovering architecture too late;
- missing organizational constraints;
- forming weak assumptions; and
- increasing human review burden.

“Read all relevant code first” is not a reliable remedy. Relevance is difficult to determine before the system is understood, and exhaustive exploration does not guarantee that policy or design intent will be discovered. A progressive model makes the next decision—not maximal context accumulation—the unit of context acquisition.

## Goals

RFC-001 aims to:

- make sufficient context easier for engineering agents to reach;
- reduce unnecessary exploration and context loading;
- separate knowledge layers from the mechanisms used to access them;
- provide a reusable model for companies and open-source maintainers;
- provide a reference pattern for repository-level context routing;
- make system understanding an explicit precursor to non-trivial behavioral work;
- preserve authoritative knowledge in its appropriate source; and
- keep the model independent from specific vendors and tools.

## Non-goals

RFC-001 does not:

- mandate a specific `AGENTS.md` schema;
- mandate MCP;
- mandate any specific context tool;
- define a universal repository layout;
- require all context to be loaded before implementation;
- replace architecture documentation;
- replace organizational standards;
- define a universal context retrieval implementation;
- define a fixed measure of context acquisition cost; or
- claim that every task requires every layer.

## Context Onion model

The Context Onion describes where relevant engineering knowledge belongs. The layers classify knowledge, not files, products, protocols, or retrieval operations.

### 1. Current Task

Current Task is the immediate engineering objective. It may be a requested behavior, issue, bug, feature, refactor, or operational change.

This layer establishes the starting question, success criteria, known scope, and constraints stated by the requester. Context acquisition starts here because the task determines which parts of the other layers are relevant.

An agent SHOULD preserve the task's intended outcome while acquiring context. It SHOULD NOT redefine the task around the first implementation path it discovers.

### 2. System Understanding

System Understanding is the knowledge required to understand where the task belongs in the system. It may include:

- architecture;
- workflows;
- domain models;
- service and component dependencies;
- data flow;
- lifecycle and state transitions;
- ownership boundaries;
- runtime topology;
- relevant architecture decision records; and
- design rationale.

Service and component dependencies belong primarily in System Understanding because they explain system behavior and boundaries. For non-trivial behavioral or cross-component changes, an agent SHOULD acquire sufficient system understanding before expensive implementation exploration.

“Sufficient” does not mean complete. The purpose is to build a reliable enough system model to identify where behavior belongs, which boundaries matter, and which implementation area to inspect next.

### 3. Task Context

Task Context is implementation-specific knowledge needed to execute and verify the current change. It may include:

- relevant source files;
- tests;
- configuration;
- nearby examples;
- symbols and callers;
- interfaces;
- code and package dependencies; and
- implementation details.

Code and package dependencies belong here when they are specific to the implementation being changed. Task Context should narrow the system model into an actionable implementation scope. It should not require the agent to infer the whole system from code when authoritative system knowledge is available elsewhere.

### 4. Organizational Context

Organizational Context is broader shared engineering guidance that applies across repositories, systems, or teams. It may include:

- RFCs;
- standards;
- policies;
- quality requirements;
- API conventions;
- security requirements;
- compliance guidance;
- approved patterns; and
- organization-wide engineering constraints.

This knowledge should normally remain authoritative outside the repository in its durable source and be routed to rather than copied. A repository-local RFC or standard may still be authoritative when the repository is its designated source. Tool output or a local summary MUST NOT be treated as the authoritative source of organizational policy when the policy actually lives in an RFC, standard, or governance artifact.

## Acquisition sequence

The recommended sequence for non-trivial work is:

```text
Current Task
    → System Understanding
    → Task Context
    → Organizational Context, as applicable
    → Verification
```

The governing principle is:

> Acquire enough context to make the next engineering decision safely, then expand only when uncertainty requires it.

The sequence is progressive and conditional. It does not require an agent to fully consume every layer. The agent should acquire the smallest reliable context that supports the next decision, assess remaining uncertainty, and continue only when the uncertainty is material.

Agents SHOULD acquire context progressively rather than broadly scanning by default. Agents SHOULD acquire sufficient System Understanding before expensive implementation exploration when a task depends on system behavior. Agents SHOULD stop expanding context once sufficient reliable context has been reached.

For trivial or isolated changes, a shorter path is appropriate:

```text
Current Task
    → Task Context
    → Verification
```

The system layer may be skipped when the change is demonstrably local and broader system behavior is irrelevant. This is a shortcut within the model, not an exception to safe engineering judgment.

## AGENTS.md as repository context router

`AGENTS.md` is not a Context Onion layer. A repository MAY use `AGENTS.md` as its repository-facing context router across the layers.

The router should help an agent answer:

- Where am I?
- What system or workflow does this task belong to?
- Where should I look for implementation?
- What local constraints apply?
- What organizational guidance applies?
- How should I verify the change?
- When should I acquire more context?

Repositories MUST expose applicable local constraints to agents. Repositories SHOULD make verification requirements explicit. Repositories SHOULD route agents to authoritative system and organizational knowledge instead of duplicating that knowledge.

A recommended reference structure is:

```text
AGENTS.md
├── Orientation
├── System-understanding routing
├── Task-context routing
├── Constraints
├── Organizational-context routing
├── Verification
└── Context-acquisition policy
```

This structure is illustrative and optional. Context Onion does not redefine or replace the `AGENTS.md` format. `AGENTS.md` should act primarily as a routing interface, not as a knowledge dump. Authoritative architecture, policy, and organizational guidance should normally remain in their sources and be referenced from the router.

A recommended context-acquisition policy is:

```markdown
## Context-acquisition policy

For behavioral or cross-component changes:

1. Identify the affected system or workflow.
2. Acquire enough system understanding to know where the behavior belongs.
3. Locate the relevant implementation, tests, and configuration.
4. Resolve applicable organizational standards.
5. Expand further only when uncertainty remains.

For trivial or isolated changes, agents may shortcut this sequence when broader system understanding is unnecessary.
```

## Nested AGENTS.md in monorepos

Nested `AGENTS.md` files use the same conceptual layers while narrowing routing scope:

```text
Organization
    → Root AGENTS.md
        → Nested AGENTS.md
            → Task
```

The root file provides broad repository defaults and routing. Nested files specialize those instructions for their subtree. The closer an `AGENTS.md` file is to the implementation, the more concrete and operational it should become.

Nested files should add or specialize instructions rather than duplicate inherited knowledge unnecessarily. They reduce the context radius by directing agents to the architecture, implementation, constraints, organizational standards, and verification relevant to a bounded area.

For example:

```text
repository/
├── AGENTS.md                 # repository orientation and shared constraints
├── docs/
│   └── architecture/
├── services/
│   ├── billing/
│   │   ├── AGENTS.md         # billing workflows, ownership, tests, standards
│   │   └── src/
│   └── notifications/
│       ├── AGENTS.md         # notification flows, providers, tests, standards
│       └── src/
└── packages/
    └── shared/
        └── AGENTS.md         # shared-library compatibility constraints
```

An agent working in `services/billing/` follows repository-wide defaults and the billing-specific router. The Context Onion remains the same model at both scopes.

## Organizational knowledge and RFCs

Organizational policy should be exposed through durable artifacts such as RFCs, standards, or policy documents.

```text
Organizational Context
├── quality standards
├── API standards
├── security standards
└── testing standards
```

The responsibilities remain separate:

```text
AGENTS.md
    → routes to applicable organizational guidance

RFC or standard
    → defines policy, intent, mandatory requirements, and exceptions

Verification mechanism
    → provides evidence that the implementation complies
```

Policies should remain stable and identifiable even when access or enforcement mechanisms change. Verification mechanisms SHOULD be treated as evidence or enforcement mechanisms rather than policy sources.

## Context acquisition mechanisms

Context acquisition mechanisms help agents traverse the Context Onion, but are not part of the model itself. Organizations MAY expose context through mechanisms such as:

- MCP servers;
- documentation systems;
- service catalogs;
- semantic code navigation;
- repository search;
- dependency graphs;
- code intelligence;
- retrieval systems;
- organizational search; and
- knowledge indexes.

MCPs may expose structured access to service metadata, ownership, architecture documentation, APIs, dependencies, repository symbols, references, implementation locations, quality evidence, operational information, and organizational standards.

MCP is optional. No specific MCP server is required. MCPs are acquisition interfaces, not authoritative knowledge layers, and the authoritative source should remain identifiable. Equivalent non-MCP mechanisms are equally valid.

## Verification

Verification is not a Context Onion knowledge layer. It evaluates whether a resulting change:

- satisfies the Current Task;
- preserves system behavior and invariants;
- complies with repository constraints; and
- complies with applicable Organizational Context.

Verification mechanisms may include tests, linting, static analysis, quality gates, integration tests, deployment checks, and policy checks. They provide evidence or enforce requirements; they do not define policy unless the mechanism itself is explicitly designated as the authoritative policy artifact.

## Cost to Sufficient Context

**Cost to Sufficient Context** is the effort required for an engineering agent to reach enough reliable context to make a safe engineering decision.

RFC-001 intentionally does not define a fixed mathematical formula. Depending on the environment, observable signals may include:

- number of exploratory steps;
- repeated searches;
- irrelevant files or documents visited;
- number of context sources consulted;
- unresolved uncertainty;
- elapsed time;
- tokens;
- tool calls; and
- unnecessary context expansion.

High acquisition cost may indicate weak repository navigation, missing system documentation, poor `AGENTS.md` routing, missing organizational guidance, stale knowledge, unclear ownership, or difficult-to-resolve dependencies.

Cost to Sufficient Context is a property of the acquisition path, not a score tied to a specific tool. Future work may define practical measures after evidence is collected from real engineering tasks.

## Reference AGENTS.md pattern

The following fictional example is concise by design. It demonstrates routing rather than prescribing a schema.

```markdown
# AGENTS.md

## Orientation

- Runtime: Node.js 22.
- Install: `npm install`.
- Development: `npm run dev`.
- Production build: `npm run build`.

## System-understanding routing

- Architecture and component boundaries: `docs/architecture/`.
- User and data workflows: `docs/workflows/`.
- Review the relevant workflow before cross-component behavioral changes.

## Task-context routing

- Application source: `src/`.
- Unit tests: `tests/unit/`.
- Integration tests: `tests/integration/`.
- Runtime configuration: `config/`.
- Prefer the nearest existing implementation and test pattern.

## Constraints

- Preserve public API compatibility unless the task explicitly changes it.
- Do not edit generated files under `generated/`.
- Keep credentials and private data out of source control.

## Organizational-context routing

- Engineering standards: https://standards.example.com/engineering/
- API standard: https://standards.example.com/api/
- Security standard: https://standards.example.com/security/
- Testing standard: https://standards.example.com/testing/

## Verification

- Formatting: `npm run format:check`.
- Unit tests: `npm test`.
- Integration tests: `npm run test:integration`.
- Production build: `npm run build`.

## Context-acquisition policy

For behavioral or cross-component changes:

1. Identify the affected system or workflow.
2. Acquire enough system understanding to know where the behavior belongs.
3. Locate the relevant implementation, tests, and configuration.
4. Resolve applicable organizational standards.
5. Expand further only when uncertainty remains.

For trivial or isolated changes, agents may shortcut this sequence when broader system understanding is unnecessary.
```

## Examples

### Example 1: trivial local change

A misspelled user-facing label has one definition and a focused rendering test.

```text
Current Task
    → Task Context
    → Verification
```

The agent locates the label, confirms the nearby test, makes the change, and runs the focused verification. Broader System Understanding and Organizational Context are unnecessary because the change does not affect behavior, interfaces, or shared policy.

### Example 2: behavioral cross-component change

A task changes when an order becomes eligible for fulfillment. The behavior crosses the order lifecycle, inventory reservation, and notification components.

```text
Current Task
    → System Understanding
    → Task Context
    → applicable Organizational Context
    → Verification
```

The agent first reads the order workflow and component boundaries. That orientation identifies the lifecycle owner and affected integration points before code exploration begins. The agent then inspects the relevant implementation and tests, resolves the applicable event-contract standard, and verifies the change across component boundaries. System orientation prevents bottom-up exploration of every caller and dependency.

### Example 3: monorepo with nested AGENTS.md

A repository root routes agents to shared architecture and common constraints. `services/catalog/AGENTS.md` adds catalog-specific domain documentation, source locations, ownership, and integration tests.

```text
Root AGENTS.md
    → shared repository routing
    → services/catalog/AGENTS.md
        → catalog-specific routing
        → task implementation
```

The nested file inherits broad defaults, specializes them for the catalog subtree, and avoids repeating shared guidance. The agent's context radius narrows as it approaches the implementation.

### Example 4: organizational policy and verification

A change introduces a new public API operation.

```text
AGENTS.md
    → organizational API standard
    → task implementation
    → verification evidence
```

The separation is explicit:

- RFC or standard = policy;
- `AGENTS.md` = routing;
- MCP or another context mechanism = access mechanism; and
- verification system = evidence.

The agent uses the router to find the authoritative API standard, implements the task, and produces evidence through contract tests and policy checks. The access and verification mechanisms do not become the policy source.

## Adoption guidance

Adoption should be incremental:

1. Identify existing sources for each context layer.
2. Avoid duplicating authoritative knowledge.
3. Create or improve `AGENTS.md` as a routing interface where useful.
4. Define explicit repository constraints.
5. Define verification expectations.
6. Route to applicable organizational standards.
7. Expose context through suitable acquisition mechanisms where useful.
8. Test the acquisition path with real engineering tasks.
9. Observe where agents get lost or expand context unnecessarily.
10. Improve the weakest route.

Early adoption should prefer a usable route for common work over exhaustive documentation. Evidence from real tasks should guide later refinement.

## Open questions

- How should sufficient context be measured consistently?
- How should agents signal that they need to expand context?
- How should conflicting nested instructions be resolved across tools?
- How should organizations expose standards in a vendor-neutral way?
- What evidence demonstrates reduced human review burden?
- How should context freshness be represented?
- How should agents distinguish authoritative context from inferred context?

These questions remain open for experimentation and evidence. RFC-001 does not prescribe answers prematurely.

## References

- [AGENTS.md](https://agents.md/)
- [Context Onion](https://contextonion.dev)
- [Context Onion GitHub organization](https://github.com/contextonion)
- [Context Onion canonical repository](https://github.com/contextonion/contextonion)
- [RFC 2119: Key words for use in RFCs to Indicate Requirement Levels](https://www.rfc-editor.org/rfc/rfc2119)
- [RFC 8174: Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words](https://www.rfc-editor.org/rfc/rfc8174)

These references provide background or project locations. Their inclusion does not imply endorsement of Context Onion by any external organization.
