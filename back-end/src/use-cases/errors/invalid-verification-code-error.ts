export class InvalidVerificationCodeError extends Error {
  constructor() {
    super('Invalid verification code.')
  }
}
