const apiPaths = {
  auth: {
    login: "auth/login",
    forgotPassword: "auth/forgot-password",
    verifyCode: "auth/verify-code",
    resetPassword: "auth/reset-password",
  },
  user: {
    registerPerson: "users/person",
    registerCompany: "users/company",
    me: "users/me",
  },
  event: {
    create: "events",
    list: "events",
    listByCompany: (companyId: string) => `events/company/${companyId}`,
    getById: (eventId: string) => `events/${eventId}`,
    update: (eventId: string) => `events/${eventId}`,
    uploadImage: (eventId: string) => `events/${eventId}/images`,
  },
};

export { apiPaths };
