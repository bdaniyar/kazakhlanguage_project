
export const KZ_TIME_ZONE = "Asia/Almaty";

/**
 * Format date/time in Kazakhstan time (GMT+5, Asia/Almaty).
 * Accepts ISO string, Date, or timestamp.
 */
export function formatKZDateTime(value, locale = "kk-KZ") {
    if (!value) return "";
    let normalized = value;
    if (typeof value === "string") {
        const hasExplicitTz = /([zZ]|[+-]\d{2}:\d{2})$/.test(value);
        // Backend may send naive UTC (without timezone suffix).
        if (!hasExplicitTz) normalized = `${value}Z`;
    }
    const d = normalized instanceof Date ? normalized : new Date(normalized);
    if (Number.isNaN(d.getTime())) return "";

    return new Intl.DateTimeFormat(locale, {
        timeZone: KZ_TIME_ZONE,
        dateStyle: "medium",
        timeStyle: "short",
    }).format(d);
}
