# Cursor plugin

Ponytail ships a native Cursor Plugin manifest at `.cursor-plugin/plugin.json`.
It reuses the repository's existing `skills/` and adds an always-on Cursor rule
from `rules/ponytail.mdc`.

## What loads

- `rules/ponytail.mdc` — persistent Ponytail guidance, enabled as an always-on rule by default.
- `skills/*/SKILL.md` — the existing Ponytail skills. Cursor can invoke skills automatically or manually with `/skill-name`, including `/ponytail`, `/ponytail-review`, `/ponytail-audit`, `/ponytail-debt`, `/ponytail-gain`, and `/ponytail-help`.

The Cursor integration intentionally does not reuse Ponytail's Claude/Codex
lifecycle hooks. Cursor has a different hook event and output schema, while its
native rules already provide the persistent guidance Ponytail needs without a
Node.js runtime dependency.

## Test locally

Symlink or copy a checkout into Cursor's local plugin directory:

```bash
mkdir -p ~/.cursor/plugins/local
ln -s /path/to/ponytail ~/.cursor/plugins/local/ponytail
```

Then restart Cursor or run `Developer: Reload Window`. Open **Customize** and
verify that the Ponytail rule and skills are present.

To test without a symlink, copy the repository instead:

```bash
cp -R /path/to/ponytail ~/.cursor/plugins/local/ponytail
```

The plugin root must contain `.cursor-plugin/plugin.json`.

## Use

Ponytail's full mode is active by default through the plugin rule. Invoke the
main skill explicitly when you want to change intensity:

```text
/ponytail lite
/ponytail full
/ponytail ultra
```

Use the other bundled skills directly, for example:

```text
/ponytail-review
/ponytail-audit
```

Say `stop ponytail` or `normal mode` to disable the behavior for the current
conversation; invoke `/ponytail` again to reactivate it.

## Marketplace

After local validation, the repository can be submitted from Cursor's plugin
publishing flow. Cursor detects the native plugin from
`.cursor-plugin/plugin.json`; a separate Cursor marketplace manifest is not
required for this single-plugin repository.
