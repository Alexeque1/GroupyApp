// "24.5k" → 24500, "1.2M" → 1200000, "830" → 830
export function parseMemberCount(value: string): number {
    const match = value.trim().match(/^([\d.]+)\s*([kKmM]?)/);
    if (!match) return 0;

    const amount = parseFloat(match[1]);
    const suffix = match[2].toLowerCase();

    if (suffix === "k") return amount * 1_000;
    if (suffix === "m") return amount * 1_000_000;
    return amount;
}
