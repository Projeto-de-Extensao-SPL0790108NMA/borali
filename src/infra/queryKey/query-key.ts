import { CompanyListQueryKey } from './query-key-types';

export const queryKeys = {
  auth: {
    login: () => ['auth', 'login'] as const,
    otpToken: ({ username }: { username: string }) =>
      ['auth', 'otp-token', username] as const,
    register: () => ['auth', 'register'] as const,
    registerCompany: () => ['auth', 'register-company'] as const,
    forgotPassword: () => ['auth', 'forgot-password'] as const,
    verifyCode: () => ['auth', 'verify-code'] as const,
    resetPassword: () => ['auth', 'reset-password'] as const,
  },
  company: {
    details: ({ companyId }: { companyId: string }) =>
      ['company', 'details', companyId] as const,
    list: ({
      pageIndex,
      pageSize,
      isActive,
      companyName,
    }: CompanyListQueryKey) =>
      ['company', 'list', pageIndex, pageSize, isActive, companyName] as const,
    listPrefix: () => ['company', 'list'] as const,
  },
};
