import { ClientSession } from 'mongoose'
import { AppError } from '../error'
import { getConnection } from './conn'

export type TransactionalFunction<T> = (session: ClientSession) => Promise<T>

export const runWithTransaction = async <T>(func: TransactionalFunction<T>): Promise<T> => {
  const connection = getConnection()
  const session = await connection.startSession()
  let result: T | undefined = undefined
  try {
    const transactionResult = await session.withTransaction(async () => {
      result = await func(session)
    })
    if (!transactionResult?.ok) {
      throw AppError.COMMON_MONGOOSE_ERROR_IN_WITH_TRANSACTION
    }
  } finally {
    await session.endSession()
  }
  if (!result) {
    throw AppError.COMMON_CANNOT_RETRIEVE_VALID_RESULT_FROM_TRANSACTION_FUNCTION
  }
  return result
}
