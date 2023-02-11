import { ClientSession } from 'mongoose'
import { getConnection } from './conn'

export type TransactionalFunction<T> = (session: ClientSession) => Promise<T>

export const runWithTransaction = async <T>(func: TransactionalFunction<T>): Promise<T> => {
  const connection = getConnection()
  const session = await connection.startSession()
  let result: T
  try {
    result = await func(session)
  } catch (err) {
    await session.abortTransaction()
    throw err
  } finally {
    await session.endSession()
  }
  return result
}
