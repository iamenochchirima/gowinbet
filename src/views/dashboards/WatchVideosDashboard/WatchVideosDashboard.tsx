import Loading from '@/components/shared/Loading'
import { apiGetWatchVideosDashboard } from '@/services/DashboardService'
import useSWR from 'swr'
import { GetWatchVideosDashboardResponse } from './types'


const WatchVideosDashboard = () => {
    const { data, isLoading } = useSWR(
        ['/api/dashboard/watch-videos'],
        () => apiGetWatchVideosDashboard<GetWatchVideosDashboardResponse>(),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )

    return (
        <Loading loading={isLoading}>
            {data && (
                <div className='h-full '>
                    <div className="flex flex-col gap-4 text-center h-full  justify-center items-center">
                        <h1>Comming Soon...</h1>
                    </div>
                </div>
            )}
        </Loading>
    )
}

export default WatchVideosDashboard
