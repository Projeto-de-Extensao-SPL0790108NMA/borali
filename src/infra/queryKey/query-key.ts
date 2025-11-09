import { CompanyListQueryKey, EventListQueryKey } from "./query-key-types";

export const queryKeys = {
  auth: {
    login: () => ["auth", "login"] as const,
    otpToken: ({ username }: { username: string }) =>
      ["auth", "otp-token", username] as const,
    register: () => ["auth", "register"] as const,
    registerCompany: () => ["auth", "register-company"] as const,
    forgotPassword: () => ["auth", "forgot-password"] as const,
    verifyCode: () => ["auth", "verify-code"] as const,
    resetPassword: () => ["auth", "reset-password"] as const,
  },
  user: {
    me: () => ["user", "me"] as const,
  },
  company: {
    details: ({ companyId }: { companyId: string }) =>
      ["company", "details", companyId] as const,
    list: ({
      pageIndex,
      pageSize,
      isActive,
      companyName,
    }: CompanyListQueryKey) =>
      ["company", "list", pageIndex, pageSize, isActive, companyName] as const,
    listPrefix: () => ["company", "list"] as const,
  },
  event: {
    create: () => ["event", "create"] as const,
    update: ({ eventId }: { eventId: string }) =>
      ["event", "update", eventId] as const,
    list: ({ companyId, page, per_page }: EventListQueryKey) =>
      ["event", "list", companyId, page, per_page] as const,
    listPrefix: () => ["event", "list"] as const,
    details: ({ eventId }: { eventId: string }) =>
      ["event", "details", eventId] as const,
  },
} as const;
