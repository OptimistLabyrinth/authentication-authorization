import httpStatus from '../types/http-status'
import { Err } from './make-error'

const commonErrors = Object.freeze({
  COMMON_PASSWORD_HASH_FAILURE: Err(
    httpStatus.internalServerError,
    10001,
    'error occurred while hashing password',
  ),
})

export default commonErrors
