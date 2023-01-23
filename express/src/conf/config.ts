import { ConfigDefinition } from './config.d'

const configDefaultSettings: ConfigDefinition = {
  mongodbConnectionUri: 'mongodb://127.0.0.1:27017',
}

export let configSettings: ConfigDefinition

export const getConfig = (): ConfigDefinition => configSettings

export const setConfig = (): void => {
  configSettings = {
    mongodbConnectionUri: process.env.MONGO_CONNECTION_URI ?? configDefaultSettings.mongodbConnectionUri,
  }
}
