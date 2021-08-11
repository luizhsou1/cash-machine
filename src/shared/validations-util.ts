import { ValidationError } from '../domain/errors/validation-error'

export const isPositiveOrFail = (value: number, message: string): void => {
  if (value <= 0) {
    throw new ValidationError(message)
  }
}

export const isIntegerOrFail = (value: number, message: string): void => {
  if (!Number.isInteger(value)) {
    throw new ValidationError(message)
  }
}
