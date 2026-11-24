# dsh-qso-style

Host-side appearance plugin for DeepSeek Harness (DSH) Web UI.

## What it does

- **Calm running indicator**: Hides animated mascot icons and disables transition/animation flicker while a chat turn is running.
- **Eye-comfort light & dark palettes**: Replaces harsh white light-mode surfaces with a cool slate tint (`#f5f7fa`) and softens dark-mode contrast (`#1c1f26` base with `#cdd5e0` primary ink).
- **Readable header titles**: Enlarges the top session title font to `18px` with wider truncation (`480px`).
- **Ghostty `0x96f` terminal theme**: Styles sidebar and bottom xterm terminals with `#262427` background and `#fcfcfa` foreground.

## Installation

Install directly from GitHub in DeepSeek Harness:

```text
github:qso/dsh-qso-style
```

Disable or remove the bundle in **Plugins** to restore default DSH styling.
