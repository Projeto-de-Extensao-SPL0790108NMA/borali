export interface CreateEventPayload {
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  date: string;
  company_id: string;
}

export interface UpdateEventPayload {
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  date: string;
}

export interface EventDTO {
  id: string;
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  date: string;
  company_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EventCoverImageDTO {
  id: string;
  url: string;
}

export interface EventListItemDTO {
  id: string;
  title: string;
  description: string;
  date: string;
  created_at: string;
  updated_at: string;
  cover_image: EventCoverImageDTO | null;
}

export interface EventPaginationDTO {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface EventListDTO {
  events: EventListItemDTO[];
  pagination: EventPaginationDTO;
}

export interface EventListPayload {
  companyId: string;
  page?: number;
  per_page?: number;
}

<<<<<<< HEAD
export interface EventFavoritesPayload {
  page?: number;
  per_page?: number;
}

=======
>>>>>>> de231323b82dbdb51496d66d63e896fd6cc1efb6
export interface EventImageDTO {
  id: string;
  event_id: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface EventDetailDTO {
  id: string;
  title: string;
  description: string;
  date: string;
  address: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  images: EventImageDTO[];
}
<<<<<<< HEAD

export interface EventCommentUserDTO {
  id: string;
  name: string;
}

export interface EventCommentDTO {
  id: string;
  event_id: string;
  description: string;
  created_at: string;
  user: EventCommentUserDTO;
}

export interface EventCommentsPaginationDTO {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface EventCommentsDTO {
  comments: EventCommentDTO[];
  pagination: EventCommentsPaginationDTO;
}

export interface EventCommentsPayload {
  eventId: string;
  page?: number;
  per_page?: number;
}

export interface CreateEventCommentPayload {
  eventId: string;
  description: string;
}
=======
>>>>>>> de231323b82dbdb51496d66d63e896fd6cc1efb6
