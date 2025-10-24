import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const generalRoutes: Routes = [
    {
        key: 'pricing',
        path: `/pricing`,
        component: lazy(() => import('@/views/general/Pricing')),
        authority: [],
    },
    {
        key: 'support',
        path: `/support`,
        component: lazy(() => import('@/views/general/Support')),
        authority: [],
    },
    {
        key: 'contact',
        path: `/contact`,
        component: lazy(() => import('@/views/general/Contact')),
        authority: [],
    },
    {
        key: 'documentation',
        path: `/documentation`,
        component: lazy(() => import('@/views/general/Documentation')),
        authority: [],
    },
    {
        key: 'help',
        path: `/help`,
        component: lazy(() => import('@/views/general/Help')),
        authority: [],
    },
    {
        key: 'about',
        path: `/about`,
        component: lazy(() => import('@/views/general/About')),
        authority: [],
    },
    {
        key: 'faq',
        path: `/faq`,
        component: lazy(() => import('@/views/general/Faq')),
        authority: [],
    },
    {
        key: 'terms',
        path: `/terms`,
        component: lazy(() => import('@/views/general/Terms')),
        authority: [],
    },
    {
        key: 'privacy',
        path: `/privacy`,
        component: lazy(() => import('@/views/general/Privacy')),
        authority: [],
    }
]

export default generalRoutes