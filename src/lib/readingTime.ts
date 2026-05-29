function extractText(node: unknown): string {
  if (typeof node === 'string') return node;
  if (node == null) return '';
  if (Array.isArray(node)) return node.map(extractText).join(' ');
  if (typeof node === 'object') {
    const n = node as Record<string, unknown>;
    if (typeof n.text === 'string') return n.text;
    if (Array.isArray(n.children)) return n.children.map(extractText).join(' ');
  }
  return '';
}

export function estimateReadingTime(lexicalBody: unknown): number {
  const text = extractText(lexicalBody);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
