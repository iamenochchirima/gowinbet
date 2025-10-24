import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const protectedGeneral: Routes = [
    {
        key: 'subscribe',
        path: `/subscribe`,
        component: lazy(() => import('@/views/general/Subscribe')),
        authority: [],
    }
]

export default protectedGeneral