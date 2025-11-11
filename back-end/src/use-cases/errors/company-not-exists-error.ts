export class CompanyNotExistsError extends Error {
  constructor() {
    super('Company not exists.')
  }
}
