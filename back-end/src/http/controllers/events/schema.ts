import { z } from 'zod'

export const registerEventBodySchema = z.object({
  title: z
    .string(),
  description: z
    .string()
    .optional()
    .nullable(),
  address: z
    .string(),
  latitude: z
    .number(),
  longitude: z
    .number(),
  date: z
    .string()
    .transform(val => new Date(val)),
  company_id: z
    .string()
})

export const registerEventResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  date: z.string(),
  company_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})

export const registerCompanyNotExistsResponseSchema = z.object({
  message: z.string(),
}).describe('Company not exists')

export const registerEventCommentsBodySchema = z.object({
  description: z.string()
})

export const registerEventCommentsParamsSchema = z.object({
  eventId: z.string()
})

export const registerEventCommentsResponseSchema = z.object({
  id: z.string(),
  event_id: z.string(),
  user_id: z.string(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string()
})

export const registerEventNotExistsResponseSchema = z.object({
  message: z.string()
}).describe('Event not exists')

export const updateEventBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  date: z.string().optional(),
})

export const updateEventResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  date: z.string(),
  company_id: z.string(),
})

export const updateEventNotExistsResponseSchema = z.object({
  message: z.string(),
}).describe('Event not exists')

export const getEventsByCompanyResponseSchema = z.object({
  events: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      date: z.string(),
      company_id: z.string(),
      cover_image: z.object({
        id: z.string(),
        url: z.string()
      })
      .nullable()
      .optional()
    })
  ),
  pagination: z.object({
    page: z.number(),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number()
  })
})

export const getEventsByCompanyNotExistsResponseSchema = z.object({
  message: z.string()
})

export const getEventsByCompanyParamsSchema = z.object({
  companyId: z.string()
})

export const getEventsByCompanyQuerySchema = z.object({
  page: z.string().optional().default('1'),
  per_page: z.string().optional().default('10')
})

export const getEventsResponseSchema = z.object({
  events: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      date: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
      cover_image: z.object({
        id: z.string(),
        url: z.string()
      })
      .nullable()
      .optional()
    })
  ),
  pagination: z.object({
    page: z.number(),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number()
  })
})

export const getEventsQuerySchema = z.object({
  page: z.string().optional().default('1'),
  per_page: z.string().optional().default('10'),
  title: z.string().optional(),
  date: z.string().optional()
})

export const getEventByIdResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  date: z.string(),
  address: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  images: z.array(
    z.object({
      id: z.string(),
      event_id: z.string(),
      url: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
    })
  )
  .nullable()
  .optional()
})

export const getEventByIdNotExistsResponseSchema = z.object({
  message: z.string()
}).describe('Event not exists')

export const getEventByIdParamsSchema = z.object({
  eventId: z.string()
})

export const uploadEventImagesParamsSchema = z.object({
  eventId: z.string()
})

export const getEventsMapResponseSchema = z.object({
  events: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      address: z.string(),
      latitude: z.number(),
      longitude: z.number()
    })
  )
})

export const getEventsMapQuerySchema = z.object({
  title: z.string().optional(),
  address: z.string().optional()
})

export const getEventCommentsQuerySchema = z.object({
  page: z.string().optional().default('1'),
  per_page: z.string().optional().default('10')
})

export const getEventCommentsParams = z.object({
  eventId: z.string()
})

export const getEventCommentsResponseSchema = z.object({
  comments: z.array(
    z.object({
      id: z.string(),
      event_id: z.string(),
      description: z.string(),
      created_at: z.string(),
      user: z.object({
        id: z.string(),
        name: z.string()
      })
    })
  ),
  pagination: z.object({
    page: z.number(),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number()
  })
})

export const getEventNotExistsResponseSchema = z.object({
  message: z.string()
}).describe('Event not exists')

export const uploadEventImagesResponseSchema = z.object({
  images: z.array(
    z.object({
      id: z.string(),
      event_id: z.string(),
      url: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
    }),
  ),
})

export const uploadEventImagesNotExistsResponseSchema = z.object({
  message: z.string(),
}).describe('Event not exists')

export const updateEventParamsSchema = z.object({
  eventId: z.string()
})

export const deleteEventImagesByIdParamsSchema = z.object({
  eventImageId: z.string()
})

export const deleteEventImagesResponseSchema = z.null().describe('Event image deleted')

export const deleteEventImagesNotExistsResponseSchema = z.object({
  message: z.string()
}).describe('Event image not exists')

export const favoriteEventParamsSchema = z.object({
  eventId: z.string(),
})

export const favoriteEventResponseSchema = z.object({
  favorited: z.boolean(),
})

export const unfavoriteEventNotExistsResponseSchema = z.object({
  message: z.string(),
}).describe('Event not exists')

export const unfavoriteEventParamsSchema = z.object({
  eventId: z.string(),
})

export const unfavoriteEventResponseSchema = z.object({
  favorited: z.boolean(),
})

export const favoriteEventNotExistsResponseSchema = z.object({
  message: z.string(),
}).describe('Event not exists')

export const favoriteEventAlreadyFavoritedResponseSchema = z.object({
  message: z.string()
}).describe('Event already favorited')

export const getFavoritesResponseSchema = z.object({
  events: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      date: z.string(),
      company_id: z.string(),
      cover_image: z.object({
        id: z.string(),
        url: z.string()
      })
      .nullable()
      .optional()
    })
  ),
  pagination: z.object({
    page: z.number(),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number()
  })
})

export const getFavoritesQueryShema = z.object({
  page: z.string().optional().default('1'),
  per_page: z.string().optional().default('10')
})

export const deleteEventParamsSchema = z.object({
  eventId: z.string()
})

export const deleteEventResponseSchema = z.null().describe('Event deleted')

export const uploadEventCoverImageParamsSchema = z.object({
  eventId: z.string()
})

export const uploadEventCoverImageResponseSchema = z.object({
  id: z.string(),
  event_id: z.string(),
  url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})

export const uploadEventCoverImageNotExistsResponseSchema = z.object({
  message: z.string()
})

export const uploadEventCoverImageFileNotProvided = z.object({
  message: z.string()
})

export type RegisterEventBody = z.infer<typeof registerEventBodySchema>
export type RegisterEventCommentsBody = z.infer<typeof registerEventCommentsBodySchema>
export type RegisterEventCommentsParams = z.infer<typeof registerEventCommentsParamsSchema>
export type UpdateEventBody = z.infer<typeof updateEventBodySchema>
export type UpdateEventParams = z.infer<typeof updateEventParamsSchema>
export type UploadEventImagesParams = z.infer<typeof uploadEventImagesParamsSchema>
export type GetEventsByCompanyParams = z.infer<typeof getEventsByCompanyParamsSchema>
export type GetEventsByCompanyQuery = z.infer<typeof getEventsByCompanyQuerySchema>
export type GetEventsQuery = z.infer<typeof getEventsQuerySchema>
export type GetEventByIdParams = z.infer<typeof getEventByIdParamsSchema>
export type DeleteEventImagesByIdParams = z.infer<typeof deleteEventImagesByIdParamsSchema>
export type GetEventsMapQuery = z.infer<typeof getEventsMapQuerySchema>
export type FavoriteEventParams = z.infer<typeof favoriteEventParamsSchema>
export type UnfavoriteEventParams = z.infer<typeof unfavoriteEventParamsSchema>
export type GetFavoritesQuery = z.infer<typeof getFavoritesQueryShema>
export type GetEventCommentsQuery = z.infer<typeof getEventCommentsQuerySchema>
export type GetEventCommentsParams = z.infer<typeof getEventCommentsParams>
export type DeleteEventParams = z.infer<typeof deleteEventParamsSchema>
export type UploadEventCoverImageParams = z.infer<typeof uploadEventCoverImageParamsSchema>
