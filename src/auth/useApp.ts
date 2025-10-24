import { useContext } from 'react'
import AppContext from './AppContext'

const useAppContext = () => {
    const context = useContext(AppContext)

    if (context === undefined) {
        throw new Error('useAppContext must be used under a AppProvider')
    }

    return context
}

export default useAppContext
