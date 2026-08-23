# Project Documentation

These documents separate stable project rules from implementation details. The local `AGENTS.md` remains the short entry point for agents and maintainers and is intentionally excluded from the public repository because it contains private project handoff instructions.

## Current documents

- [Project](PROJECT.md) — purpose, audience, brand, ownership, current page, and content status
- [Architecture](ARCHITECTURE.md) — static-site architecture and the approved editor boundary
- [Content model](CONTENT-MODEL.md) — implemented version-one content contract for the editor
- [Editor guide](EDITOR-GUIDE.md) — Johanna's verified sign-in, editing, saving, and upload workflow
- [Decisions](DECISIONS.md) — accepted architectural and product decisions
- [Deployment](DEPLOYMENT.md) — GitHub Pages publishing and recovery behavior
- [Maintenance](MAINTENANCE.md) — local development and safe change practices

## Source-of-truth boundaries

- `AGENTS.md` contains mandatory project rules.
- These documents contain current product and technical context.
- Executable configuration and source code define actual runtime behavior.
- Git history records changes but is not a substitute for current documentation.

When these sources disagree, verify the current repository state and update the stale source in the same change.
