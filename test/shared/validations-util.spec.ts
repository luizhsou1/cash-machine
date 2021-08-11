import { ValidationError } from '../../src/domain/errors/validation-error'
import { isIntegerOrFail, isPositiveOrFail } from '../../src/shared/validations-util'

describe('Validations Util', () => {
  const msgError = 'any_message_error'

  it('isPositiveOrFail', () => {
    expect(isPositiveOrFail(1, msgError)).toBeUndefined()
    expect(() => isPositiveOrFail(0, msgError)).toThrowError(new ValidationError(msgError))
    expect(() => isPositiveOrFail(-1, msgError)).toThrowError(new ValidationError(msgError))
  })

  it('isIntegerOrFail', () => {
    expect(isIntegerOrFail(1, msgError)).toBeUndefined()
    expect(() => isIntegerOrFail(1.5, msgError)).toThrowError(new ValidationError(msgError))
  })
})
