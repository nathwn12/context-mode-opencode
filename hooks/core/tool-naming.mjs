/**
 * Platform-aware MCP tool naming.
 * Each platform has its own convention for how MCP tool names appear to the LLM.
 *
 * Evidence-based naming conventions (from official docs):
 * | Platform           | Pattern                                                    |
 * |--------------------|------------------------------------------------------------|
 * | Claude Code        | mcp__plugin_context-mode-opencode_context-mode-opencode__<tool>               |
 * | Gemini CLI         | mcp__context-mode-opencode__<tool>                                  |
 * | Antigravity        | mcp__context-mode-opencode__<tool>                                  |
 * | OpenCode           | context-mode-opencode_<tool>                                        |
 * | VS Code Copilot    | context-mode-opencode_<tool>                                        |
 * | Kiro               | @context-mode-opencode/<tool>                                       |
 * | Zed                | mcp:context-mode-opencode:<tool>                                    |
 * | Cursor / Codex / OpenClaw / Pi | bare <tool>                                    |
 */

const TOOL_PREFIXES = {
  "claude-code":    (tool) => `mcp__plugin_context-mode-opencode_context-mode-opencode__${tool}`,
  "gemini-cli":     (tool) => `mcp__context-mode-opencode__${tool}`,
  "antigravity":    (tool) => `mcp__context-mode-opencode__${tool}`,
  "opencode":       (tool) => `context-mode-opencode_${tool}`,
  "kilo":           (tool) => `context-mode-opencode_${tool}`,
  "vscode-copilot": (tool) => `context-mode-opencode_${tool}`,
  "kiro":           (tool) => `@context-mode-opencode/${tool}`,
  "zed":            (tool) => `mcp:context-mode-opencode:${tool}`,
  "cursor":         (tool) => tool,
  "codex":          (tool) => tool,
  "openclaw":       (tool) => tool,
  "pi":             (tool) => tool,
};

/**
 * Get the platform-specific MCP tool name for a bare tool name.
 * Falls back to claude-code convention if platform is unknown.
 */
export function getToolName(platform, bareTool) {
  const fn = TOOL_PREFIXES[platform] || TOOL_PREFIXES["claude-code"];
  return fn(bareTool);
}

/**
 * Create a namer function bound to a specific platform.
 * Returns (bareTool) => platformSpecificToolName.
 */
export function createToolNamer(platform) {
  return (bareTool) => getToolName(platform, bareTool);
}

/** List of all known platform IDs. */
export const KNOWN_PLATFORMS = Object.keys(TOOL_PREFIXES);
