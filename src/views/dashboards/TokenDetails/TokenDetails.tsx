import Loading from '@/components/shared/Loading'
import CardsVisuals from './components/CardsVisuals'
import Charts1 from './components/charts1/Charts1'
import Charts2 from './components/charts2/Charts2'
import { useApp } from '@/store/appStore'
import { useState } from 'react'

const TokenDetails = () => {
    const [isLoading, setLoading] = useState(false)
    const { selectedMagicToken } = useApp()

    return (
        <Loading loading={isLoading}>
            {selectedMagicToken && (
                <div>
                    <CardsVisuals />
                    <Charts1 />
                    <Charts2 />
                </div>
            )}
        </Loading>
    )
}

export default TokenDetails
