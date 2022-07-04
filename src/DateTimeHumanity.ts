import * as stdDateTime from "https://deno.land/std@0.146.0/datetime/mod.ts";

/**
 * ```typescript
 * const r = Humanity.dateTime.difference(1656532800000, 1659211200000);
 * console.log(r);
 * // Output: 4 weeks ago
 * ```
 * @param dateFirst
 * @param dateAfter
 * @returns string
 */
function difference(dateFirst: Date, dateAfter: Date): string {
    let diff: Partial<Record<stdDateTime.Unit, number>>;

    if (dateFirst.getTime() >= dateAfter.getTime()) {
        diff = stdDateTime.difference(dateAfter, dateFirst);
    } else {
        diff = stdDateTime.difference(dateFirst, dateAfter);
    }

    if (diff.seconds == 0) {
        return "just now";
    }

    if (diff.seconds && diff.seconds <= 60) {
        return `${diff.seconds} seconds ago`;
    }

    if (diff.minutes && diff.minutes < 60) {
        return `${diff.minutes} minutes ago`;
    }

    if (diff.hours && diff.hours < 60) {
        return `${diff.hours} hours ago`;
    }

    if (diff.days && diff.days <= 30) {
        return `${diff.days} days ago`;
    }

    if (diff.weeks && diff.weeks <= 15) {
        return `${diff.weeks} weeks ago`;
    }

    if (diff.months && diff.months <= 12) {
        return `${diff.months} months ago`;
    }

    return `${diff.years} years ago`;
}

const DateTime = { difference };

export default DateTime;
