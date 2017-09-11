require('dotenv').config()

const env = process.env

export const nodeEnv = env.NODE_ENV || 'development'

export default {
    mongodbUri: 'mongodb://localhost:27017/bookClub',
    port: env.PORT || 3000,
    host: env.HOST || '0.0.0.0'
}