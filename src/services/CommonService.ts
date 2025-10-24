import { NotificationItem } from '@/@types/notifications'
import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'

export async function apiGetNotificationList() {
    return ApiService.fetchDataWithAxios<NotificationItem[]>({
        url: endpointConfig.getNotificationsList,
        method: 'get',
    })
}

export const apiMarkAsRead = async (id : String) => {
    return ApiService.fetchDataWithAxios<NotificationItem[]>({
        url: endpointConfig.getNotificationsList,
        method: 'post',
        data: {
            id
        }
    })
}

export const apiMarkAllAsRead = async () => {
    return ApiService.fetchDataWithAxios<NotificationItem[]>({
        url: endpointConfig.getNotificationsList,
        method: 'put',
    })
}


