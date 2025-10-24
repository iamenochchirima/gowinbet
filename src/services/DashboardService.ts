import ApiService from './ApiService'

export async function apiGetHomeDashboard<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/api/dashboard/home',
        method: 'get',
    })
}

export async function apiGetWatchlistDashboard<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/api/dashboard/watchlist',
        method: 'get',
    })
}

export async function apiGetMagicRadarDashboard<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/api/dashboard/magic-radar',
        method: 'get',
    })
}

export async function apiGetMagicDipDashboard<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/api/dashboard/magic-dip',
        method: 'get',
    })
}

export async function apiGetProfileDashboard<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/api/dashboard/profile',
        method: 'get',
    })
}

export async function apiGetWatchVideosDashboard<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/api/dashboard/watch-videos',
        method: 'get',
    })
}

export async function apiGetProjectDashboard<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/api/dashboard/project',
        method: 'get',
    })
}

export async function apiGetAnalyticDashboard<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/api/dashboard/analytic',
        method: 'get',
    })
}

export async function apiGetMarketingDashboard<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/api/dashboard/marketing',
        method: 'get',
    })
}
