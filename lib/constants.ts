/**
 * This is a frontend-only build with no real multi-tenant backend, so every
 * signed-in session resolves to this single organizer identity — the
 * "account" is really just a name/email label over one shared local dataset.
 */
export const DEMO_ORGANIZER_ID = "org_demo_alex";
