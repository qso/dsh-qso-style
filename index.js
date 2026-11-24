/**
 * dsh-qso-style — personal appearance/skin CSS for the DSH Web surface.
 *
 * One host-side plugin that injects a single `<style>` row into the served
 * index, so a look change costs no client bundle and no config elsewhere.
 * Sections: (1) calm motion, (2) eye-comfort palette, (3) dark-mode ink,
 * (4) headings, (5) optional better-sidebar sizing, (6) terminal colors.
 */

/** The injected stylesheet. */
const CSS = `
/* ── 1. 平静动效：去掉运行指示器的吉祥物与逐帧动画 ───────────────── */
[data-chat-running] [class*="runningIcon"] { display: none !important; }
[data-chat-running] [class*="runningWhaleAnimated"] {
  display: none !important;
  mask: none !important;
  background: none !important;
  will-change: auto !important;
}
[data-chat-running] [class*="runningWhaleStill"] { display: none !important; }
[data-chat-running] *,
[data-chat-running] *::before,
[data-chat-running] *::after {
  animation: none !important;
  transition: none !important;
}

/* ── 2. 浅色护眼配色：侧栏同色系的冷灰蓝，不用惨白 ───────────────── */
body:not([data-ds-dark-theme]) {
  --dsw-alias-bg-base: #f5f7fa !important;
  --dsw-alias-bg-layer-1: #fafbfd !important;
  --dsw-alias-bg-layer-2: #f1f4f8 !important;
  --dsw-alias-bg-layer-3: #eaeff5 !important;
  --dsw-specific-input-major: #fafbfd !important;
  --dsw-alias-markdown-code-block: #edf1f7 !important;
  --dsw-alias-markdown-code-block-banner: #e6ecf4 !important;
  --dsw-alias-markdown-inline-code: #e9eef5 !important;
  --dsw-specific-bubble: #e8effa !important;
}

/* ── 3. 深色模式：柔和石板灰底 + 柔化灰白字，不再刺眼 ────────────── */
body[data-ds-dark-theme] {
  --dsw-alias-bg-base: #1c1f26 !important;
  --dsw-alias-bg-layer-1: #232730 !important;
  --dsw-alias-bg-layer-2: #292e39 !important;
  --dsw-alias-bg-layer-3: #303643 !important;
  --dsw-specific-input-major: #232730 !important;
  --dsw-alias-markdown-code-block: #171a21 !important;
  --dsw-alias-markdown-code-block-banner: #20242d !important;
  --dsw-alias-label-primary: #cdd5e0 !important;
  --dsw-alias-label-primary-dimmed: #c2cbd8 !important;
  --dsw-alias-label-secondary: #a2adbf !important;
  --dsw-alias-label-tertiary: #7f8a9c !important;
  --dsw-alias-brand-primary: #cdd5e0 !important;
  --dsw-alias-brand-text: #cdd5e0 !important;
  --dsw-alias-label-document-preview: #c2cbd8 !important;
}

/* ── 4. 会话顶部标题：放大并放宽省略宽度 ─────────────────────────── */
header[data-window-drag] nav span,
header[data-window-drag] nav button {
  font-size: 18px !important;
  line-height: 26px !important;
  max-width: 480px !important;
}

/* ── 5. better-sidebar 若重新启用：整体字体放大 1.5 倍 ───────────── */
[data-dsh-native-tab-host],
[data-dsh-better-sidebar] {
  --dsw-font-xxxs-11: 16px/22px var(--dsw-font-family) !important;
  --dsw-font-xxxs-strong-11: 500 16px/22px var(--dsw-font-family) !important;
  --dsw-font-xxs-12: 18px/26px var(--dsw-font-family) !important;
  --dsw-font-xxs-strong-12: 500 18px/26px var(--dsw-font-family) !important;
  --dsw-font-xs-13: 19px/27px var(--dsw-font-family) !important;
  --dsw-font-xs-strong-13: 600 19px/27px var(--dsw-font-family) !important;
  --dsw-font-s-14: 21px/28px var(--dsw-font-family) !important;
  --dsw-font-s-strong-14: 600 21px/28px var(--dsw-font-family) !important;
}
[data-dsh-native-tab-host] [class*="filePath"],
[data-dsh-native-tab-host] [class*="diffPath"],
[data-dsh-better-sidebar] [class*="filePath"],
[data-dsh-better-sidebar] [class*="diffPath"] {
  font-size: 16px !important;
  line-height: 22px !important;
}

/* ── 6. 终端：沿用 Ghostty 0x96f 的深底浅字与 Nerd Font 字形 ─────── */
[data-sidebar-terminal],
[data-sidebar-terminal] div:has(> .xterm),
[data-sidebar-terminal] .xterm,
[data-sidebar-terminal] .xterm-viewport,
[data-dsh-bottom-terminal],
[data-dsh-bottom-terminal] div:has(> .xterm),
[data-dsh-bottom-terminal] .xterm,
[data-dsh-bottom-terminal] .xterm-viewport {
  background-color: #262427 !important;
  color: #fcfcfa !important;
  --terminal-cursor: #fcfcfa !important;
  --terminal-cursor-accent: #000000 !important;
}
[data-dsh-bottom-terminal] {
  --ds-font-family-code: "MesloLGS Nerd Font Mono", "Symbols Nerd Font Mono", var(--dsh-font-family-code-default) !important;
}
`

export const name = 'qso-style'

/**
 * Register the index-injection row; every failure stays contained so a style
 * regression can never take the web surface down.
 * @param ctx - host plugin context.
 */
export function apply(ctx) {
  try {
    ctx.on('webserver/index-inject', (table) => {
      try {
        table.push({ kind: 'style', text: CSS })
      } catch { /* an index render must never fail over a stylesheet */ }
    })
  } catch { /* no web server in this composition */ }
}
