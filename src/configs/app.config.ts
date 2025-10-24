import { BASE_URL } from "@/constants/api.constant"

export type AppConfig = {
    apiPrefix: string
    baseUrl: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    locale: string
    accessTokenPersistStrategy: 'localStorage' | 'sessionStorage' | 'cookies'
    enableMock: boolean
    activeNavTranslation: boolean
}

const appConfig: AppConfig = {
    apiPrefix: '/api',
    baseUrl: BASE_URL,
    authenticatedEntryPath: '/dashboards/home',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    accessTokenPersistStrategy: 'localStorage',
    enableMock: true,
    activeNavTranslation: true
}

export default appConfig
