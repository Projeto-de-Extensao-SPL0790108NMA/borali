export class EventAlreadyFavorited extends Error {
  constructor() {
    super('Event already favorited.')
  }
}