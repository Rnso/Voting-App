require('dotenv').config()

const env = process.env

export const nodeEnv = env.NODE_ENV || 'development'

export default {
    mongodbUri: `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@ds159892.mlab.com:59892/fcc`,
    port: env.PORT || 3000,
    host: env.HOST || '0.0.0.0'
}