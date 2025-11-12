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
    avatar: "users/me/avatar",
  },
  event: {
    create: "events",
    list: "events",
    listByCompany: (companyId: string) => `events/company/${companyId}`,
    getById: (eventId: string) => `events/${eventId}`,
    update: (eventId: string) => `events/${eventId}`,
    uploadCoverImage: (eventId: string) => `events/${eventId}/cover-image`,
    uploadImages: (eventId: string) => `events/${eventId}/images`,
    favorites: "events/favorites",
    favorite: (eventId: string) => `/events/${eventId}/favorite`,
    unfavorite: (eventId: string) => `/events/${eventId}/unfavorite`,
    comments: (eventId: string) => `events/${eventId}/comments`,
  },
};

export { apiPaths };
