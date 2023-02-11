import httpStatus from '../../types/http-status'
import { Err } from '../make-error'

const authErrors = Object.freeze({
  AUTH_NOT_FOUND: Err(httpStatus.notFound, 30001, 'auth (general) not found'),
  AUTH_AUTH_EMAIL_NOT_FOUND: Err(httpStatus.notFound, 30002, 'auth (type: email) not found'),
})

export default authErrors
