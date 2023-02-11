import httpStatus from '../../types/http-status'
import { Err } from '../make-error'

const userErrors = Object.freeze({
  USER_EMAIL_MISSING: Err(httpStatus.preconditionFailed, 20001, 'email is missing'),
  USER_EMAIL_INVALID: Err(httpStatus.preconditionFailed, 20002, 'email is malformed'),
  USER_PASSWORD_MISSING: Err(httpStatus.preconditionFailed, 20003, 'password is missing'),
  USER_PASSWORD_INVALID: Err(
    httpStatus.preconditionFailed,
    20004,
    'password is too weak (minimum length: 8, at least one alphabet, at least one number)',
  ),
  USER_NAME_MISSING: Err(httpStatus.preconditionFailed, 20005, 'name is missing'),
  USER_NAME_TOO_SHORT: Err(httpStatus.preconditionFailed, 20006, 'name is too short'),

  USER_DUPLICATE_EMAIL_EXIST: Err(
    httpStatus.conflict,
    20101,
    'duplicate email is already registered',
  ),
  USER_NOT_FOUND: Err(httpStatus.notFound, 20102, 'user not found'),
})

export default userErrors
