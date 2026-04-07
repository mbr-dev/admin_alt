export type ReportSectionId =
  | "personal-cid"
  | "guardian"
  | "support-result"
  | "areas"
  | "attention-emotion"
  | "behaviors"
  | "strategies"
  | "technical-ia"
  | "sessions";

export const DEFAULT_REPORT_SECTION: ReportSectionId = "personal-cid";
