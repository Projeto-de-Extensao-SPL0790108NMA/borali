export class EventImageNotExistsError extends Error {
  constructor() {
    super('Event image not exists.')
  }
}