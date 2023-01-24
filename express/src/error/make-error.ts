import { statusType } from '../types/http-status'

export class ErrorDto extends Error {
  readonly status: statusType
  readonly code: number
  readonly description: string

  constructor(
    status: statusType,
    code: number,
    description: string,
  ) {
    super()
    this.status = status
    this.code = code
    this.description = description
  }

  toJSON() {
    return {
      status: this.status,
      code: this.code,
      description: this.description,
    }
  }
}

const makeError = (
  status: statusType,
  code: number,
  description: string,
): ErrorDto => new ErrorDto(
  status,
  code,
  description,
)

export const Err = makeError
