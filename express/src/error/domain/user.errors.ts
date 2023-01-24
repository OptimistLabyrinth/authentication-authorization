import httpStatus from '../../types/http-status'
import { Err } from '../make-error'

const userErrors = Object.freeze({
  USER_EMAIL_MISSING: Err(httpStatus.preconditionFailed, 10001, 'email is missing'),
  USER_EMAIL_INVALID: Err(httpStatus.preconditionFailed, 10002, 'email is malformed'),
  USER_PASSWORD_MISSING: Err(httpStatus.preconditionFailed, 10003, 'password is missing'),
  USER_PASSWORD_INVALID: Err(
    httpStatus.preconditionFailed,
    10003,
    'password is too weak (minimum length: 8, at least one alphabet, at least one number)',
  ),
})

export default userErrors
