import { HttpStatus } from '../types/http-status'

export class ErrorDto extends Error {
  readonly status: HttpStatus
  readonly code: number
  readonly description: string

  constructor(
    status: HttpStatus,
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
  status: HttpStatus,
  code: number,
  description: string,
): ErrorDto => new ErrorDto(
  status,
  code,
  description,
)

export const Err = makeError
