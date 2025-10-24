export const TOKEN_TYPE = 'Bearer '
export const REQUEST_HEADER_AUTH_KEY = 'Authorization'
export const TOKEN_NAME_IN_STORAGE = 'token'
const LIVE_BACKEND = import.meta.env.VITE_LIVE_BACKEND
const ENV = import.meta.env.VITE_ENV
export const BASE_URL = ENV === 'development' ? "http://localhost:5000/api" : LIVE_BACKEND + "/api"
export const BASE_URL2 = ENV === 'development' ? "http://localhost:5000" : LIVE_BACKEND
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET
