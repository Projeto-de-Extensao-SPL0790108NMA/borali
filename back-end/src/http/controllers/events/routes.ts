import { FastifyInstance } from 'fastify'

import { registerEvent } from './register-event'
import { registerEventImages } from './register-event-images'
import { updateEvent } from './update-event'
import { getEventsByCompany } from './get-events-by-company'
import { getEvents } from './get-events'
import { getEventById } from './get-event-by-id'
import { deleteEventImage } from './delete-event-images'
import { getEventsMap } from './get-events-map'
import { favoriteEvent } from './favorite-event'
import { unfavoriteEvent } from './unfavorite-event'
import { getFavorites } from './get-favorites'
import { deleteEvent } from './delete-event'
import { uploadEventCoverImage } from './upload-event-cover-image'

import {
  registerEventBodySchema,
  registerEventResponseSchema,
  registerCompanyNotExistsResponseSchema,
  uploadEventImagesResponseSchema,
  uploadEventImagesNotExistsResponseSchema,
  RegisterEventBody,
  UploadEventImagesParams,
  updateEventBodySchema,
  UpdateEventBody,
  updateEventResponseSchema,
  updateEventNotExistsResponseSchema,
  UpdateEventParams,
  getEventsByCompanyResponseSchema,
  getEventsByCompanyNotExistsResponseSchema,
  GetEventsByCompanyParams,
  GetEventsByCompanyQuery,
  getEventsByCompanyQuerySchema,
  GetEventsQuery,
  getEventsQuerySchema,
  getEventsResponseSchema,
  getEventByIdResponseSchema,
  getEventByIdNotExistsResponseSchema,
  GetEventByIdParams,
  deleteEventImagesResponseSchema,
  deleteEventImagesNotExistsResponseSchema,
  DeleteEventImagesByIdParams,
  getEventsMapResponseSchema,
  getEventsMapQuerySchema,
  GetEventsMapQuery,
  FavoriteEventParams,
  favoriteEventResponseSchema,
  favoriteEventNotExistsResponseSchema,
  UnfavoriteEventParams,
  unfavoriteEventResponseSchema,
  unfavoriteEventNotExistsResponseSchema,
  getFavoritesResponseSchema,
  GetFavoritesQuery,
  getFavoritesQueryShema,
  registerEventCommentsBodySchema,
  registerEventCommentsResponseSchema,
  registerEventNotExistsResponseSchema,
  RegisterEventCommentsBody,
  RegisterEventCommentsParams,
  getEventCommentsQuerySchema,
  getEventCommentsResponseSchema,
  getEventNotExistsResponseSchema,
  GetEventCommentsQuery,
  GetEventCommentsParams,
  DeleteEventParams,
  deleteEventResponseSchema,
  UploadEventCoverImageParams,
  uploadEventCoverImageResponseSchema,
  uploadEventCoverImageNotExistsResponseSchema,
  uploadEventCoverImageFileNotProvided,
  favoriteEventAlreadyFavoritedResponseSchema
} from './schema'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { registerEventComments } from './register-event-comments'
import { getEventComments } from './get-event-comments'

export async function eventsRoutes(app: FastifyInstance) {
  app.post<{ Body: RegisterEventBody }>('/events', {
    schema: {
      tags: ['Event'],
      summary: 'Create event',
      body: registerEventBodySchema,
      response: {
        201: registerEventResponseSchema,
        404: registerCompanyNotExistsResponseSchema
      }
    },
    onRequest: [
      verifyJwt,
      verifyUserRole('COMPANY')
    ]
  }, registerEvent)

  app.put<{ Body: UpdateEventBody, Params: UpdateEventParams }>('/events/:eventId', {
    schema: {
      tags: ['Event'],
      summary: 'Update event',
      body: updateEventBodySchema,
      response: {
        200: updateEventResponseSchema,
        404: updateEventNotExistsResponseSchema
      },
    },
    onRequest: [
      verifyJwt,
      verifyUserRole('COMPANY')
    ]
  }, updateEvent)

  app.delete<{ Params: DeleteEventParams }>('/events/:eventId', {
    schema: {
      tags: ['Event'],
      summary: 'Delete event',
      response: {
        200: deleteEventResponseSchema,
      },
    },
    onRequest: [
      verifyJwt,
      verifyUserRole('COMPANY')
    ]
  }, deleteEvent)

  app.get<{ Params: GetEventByIdParams }>('/events/:eventId', {
    schema: {
      tags: ['Event'],
      summary: 'Get event by id',
      response: {
        200: getEventByIdResponseSchema,
        404: getEventByIdNotExistsResponseSchema
      }
    }
  }, getEventById)

  app.get<{ Params: GetEventsByCompanyParams, Querystring: GetEventsByCompanyQuery }>('/events/company/:companyId', {
    schema: {
      tags: ['Event'],
      summary: 'Get events by company',
      querystring: getEventsByCompanyQuerySchema,
      response: {
        200: getEventsByCompanyResponseSchema,
        404: getEventsByCompanyNotExistsResponseSchema
      }
    },
    onRequest: [
      verifyJwt,
      verifyUserRole('COMPANY')
    ]
  }, getEventsByCompany)

  app.get<{ Querystring: GetEventsQuery }>('/events', {
    schema: {
      tags: ['Event'],
      summary: 'Get events',
      querystring: getEventsQuerySchema,
      response: {
        200: getEventsResponseSchema
      }
    },
  }, getEvents)

  app.get<{ Querystring: GetEventsMapQuery }>('/events/map', {
    schema: {
      tags: ['Event'],
      summary: 'Get events map',
      querystring: getEventsMapQuerySchema,
      response: {
        200: getEventsMapResponseSchema
      }
    },
  }, getEventsMap)

  app.post<{ Params: FavoriteEventParams }>('/events/:eventId/favorite', {
    schema: {
      tags: ['Event'],
      summary: 'Favorite event',
      response: {
        200: favoriteEventResponseSchema,
        404: favoriteEventNotExistsResponseSchema,
        409: favoriteEventAlreadyFavoritedResponseSchema
      }
    },
    onRequest: [
      verifyJwt,
      verifyUserRole('PERSON')
    ]
  }, favoriteEvent)

  app.delete<{ Params: UnfavoriteEventParams }>('/events/:eventId/unfavorite', {
    schema: {
      tags: ['Event'],
      summary: 'Unfavorite event',
      response: {
        200: unfavoriteEventResponseSchema,
        404: unfavoriteEventNotExistsResponseSchema
      },
    },
    onRequest: [
      verifyJwt,
      verifyUserRole('PERSON')
    ]
  }, unfavoriteEvent)

  app.get<{ Querystring: GetFavoritesQuery }>('/events/favorites', {
    schema: {
      tags: ['Event'],
      summary: 'Get favorites',
      querystring: getFavoritesQueryShema,
      response: {
        200: getFavoritesResponseSchema
      },
    },
    onRequest: [
      verifyJwt,
      verifyUserRole('PERSON')
    ]
  }, getFavorites)

  app.post<{ Params: UploadEventImagesParams }>('/events/:eventId/images', {
    schema: {
      tags: ['Event'],
      summary: 'Upload event images',
      consumes: ['multipart/form-data'],
      response: {
        201: uploadEventImagesResponseSchema,
        404: uploadEventImagesNotExistsResponseSchema
      }
    },
    onRequest: [
      verifyJwt,
      verifyUserRole('COMPANY')
    ]
  }, registerEventImages)

  app.post<{ Params: UploadEventCoverImageParams }>('/events/:eventId/cover-image', {
    schema: {
      tags: ['Event'],
      summary: 'Upload event cover image',
      consumes: ['multipart/form-data'],
      response: {
        201: uploadEventCoverImageResponseSchema,
        404: uploadEventCoverImageNotExistsResponseSchema,
        400: uploadEventCoverImageFileNotProvided
      }
    },
    onRequest: [
      verifyJwt,
      verifyUserRole('COMPANY')
    ]
  }, uploadEventCoverImage)

  app.delete<{ Params: DeleteEventImagesByIdParams }>('/events/images/:eventImageId', {
    schema: {
      tags: ['Event'],
      summary: 'Delete Event Image',
      response: {
        200: deleteEventImagesResponseSchema,
        404: deleteEventImagesNotExistsResponseSchema
      }
    },
    onRequest: [
      verifyJwt,
      verifyUserRole('COMPANY')
    ]
  }, deleteEventImage)

  app.post<{ Body: RegisterEventCommentsBody, Params: RegisterEventCommentsParams }>('/events/:eventId/comments', {
    schema: {
      tags: ['Event'],
      summary: "Create Event Comments",
      body: registerEventCommentsBodySchema,
      response: {
        200: registerEventCommentsResponseSchema,
        404: registerEventNotExistsResponseSchema
      }
    },
    onRequest: [
      verifyJwt
    ]
  }, registerEventComments)

  app.get<{ Querystring: GetEventCommentsQuery, Params: GetEventCommentsParams }>('/events/:eventId/comments', {
    schema: {
      tags: ['Event'],
      summary: 'Get Event Comments by Event Id',
      querystring: getEventCommentsQuerySchema,
      response: {
        200: getEventCommentsResponseSchema,
        404: getEventNotExistsResponseSchema
      }
    },
    onRequest: [
      verifyJwt
    ]
  }, getEventComments)
}
