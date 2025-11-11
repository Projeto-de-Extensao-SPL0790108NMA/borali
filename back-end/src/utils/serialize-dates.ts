export function serializeDates<T extends Record<string, any>>(obj: T): T {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      value instanceof Date ? value.toISOString() : value,
    ),
  )
}
