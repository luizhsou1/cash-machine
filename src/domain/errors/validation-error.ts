export class ValidationError extends Error {
  constructor (message?: string) {
    super(message ?? 'Validation Error')
    this.name = 'ValidationError'
  }
}
