import { createContext } from 'react'
import { StatsResponse } from '@/@types/tokens'

type App = {
    realtimeStats: StatsResponse | null
}


const AuthContext = createContext<App>({
    realtimeStats: null,
})

export default AuthContext
