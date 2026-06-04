import type { FrameItem } from "@/types/database";

export type FrameGroup = {
  name: string;
  material: string | null;
  variants: FrameItem[];
};

export function groupFrameItems(items: FrameItem[]): FrameGroup[] {
  const byName = new Map<string, FrameItem[]>();
  for (const item of items) {
    const key = item.name.trim();
    const list = byName.get(key);
    if (list) list.push(item);
    else byName.set(key, [item]);
  }
  return Array.from(byName.entries()).map(([name, variants]) => ({
    name,
    material: variants[0]?.material ?? null,
    variants: [...variants].sort(
      (a, b) => a.display_order - b.display_order || (a.size ?? "").localeCompare(b.size ?? "")
    ),
  }));
}
