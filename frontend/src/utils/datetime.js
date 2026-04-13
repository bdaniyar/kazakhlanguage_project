
export const KZ_TIME_ZONE = "Asia/Almaty";

/**
 * Format date/time in Kazakhstan time (GMT+5, Asia/Almaty).
 * Accepts ISO string, Date, or timestamp.
 */
export function formatKZDateTime(value, locale = "kk-KZ") {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return "";

    return new Intl.DateTimeFormat(locale, {
        timeZone: KZ_TIME_ZONE,
        dateStyle: "medium",
        timeStyle: "short",
    }).format(d);
}
