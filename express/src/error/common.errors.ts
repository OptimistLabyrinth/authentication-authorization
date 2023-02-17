import httpStatus from '../types/http-status'
import { Err } from './make-error'

const commonErrors = Object.freeze({
  COMMON_PASSWORD_HASH_FAILURE: Err(
    httpStatus.internalServerError,
    10001,
    'error occurred while hashing password',
  ),
  COMMON_MONGOOSE_ERROR_IN_WITH_TRANSACTION: Err(
    httpStatus.internalServerError,
    10002,
    'error occurred inside mongoose withTransaction',
  ),
  COMMON_CANNOT_RETRIEVE_VALID_RESULT_FROM_TRANSACTION_FUNCTION: Err(
    httpStatus.internalServerError,
    10003,
    'cannot retrieve valid result from transaction',
  ),
  COMMON_JWT_VERIFY_FAILED: Err(
    httpStatus.internalServerError,
    10004,
    'failed to verify jwt token',
  ),
})

export default commonErrors
