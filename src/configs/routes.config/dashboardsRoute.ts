import { lazy } from "react";
import { DASHBOARDS_PREFIX_PATH } from "@/constants/route.constant";
import { ADMIN, USER } from "@/constants/roles.constant";
import type { Routes } from "@/@types/routes";

const dashboardsRoute: Routes = [
  {
    key: "dashboard.home",
    path: `${DASHBOARDS_PREFIX_PATH}/home`,
    component: lazy(() => import("@/views/dashboards/HomeDashboard")),
    authority: [ADMIN, USER],
    meta: {
      pageContainerType: "contained",
    },
  },
  {
    key: "dashboard.watchlist",
    path: `${DASHBOARDS_PREFIX_PATH}/watchlist`,
    component: lazy(() => import("@/views/dashboards/WatchlistDashboard")),
    authority: [ADMIN, USER],
    meta: {
      pageContainerType: "contained",
    },
  },
  {
    key: "dashboard.magicRadar",
    path: `${DASHBOARDS_PREFIX_PATH}/magic-radar`,
    component: lazy(() => import("@/views/dashboards/MagicRadarDashboard")),
    authority: [ADMIN, USER],
    meta: {
      pageContainerType: "contained",
    },
  },
  {
    key: "dashboard.magicDip",
    path: `${DASHBOARDS_PREFIX_PATH}/magic-dip`,
    component: lazy(() => import("@/views/dashboards/MagicDipDashboard")),
    authority: [ADMIN, USER],
    meta: {
      pageContainerType: "contained",
    },
  },
  {
    key: "dashboard.trending",
    path: `${DASHBOARDS_PREFIX_PATH}/trending`,
    component: lazy(() => import("@/views/dashboards/Trending")),
    authority: [ADMIN, USER],
    meta: {
      pageContainerType: "contained",
    },
  },
  {
    key: "dashboard.gainers-losers",
    path: `${DASHBOARDS_PREFIX_PATH}/gainers-losers`,
    component: lazy(() => import("@/views/dashboards/GainersLosers")),
    authority: [ADMIN, USER],
    meta: {
      pageContainerType: "contained",
    },
  },
  {
    key: "dashboard.tokenDetails",
    path: `${DASHBOARDS_PREFIX_PATH}/token-details`,
    component: lazy(() => import("@/views/dashboards/TokenDetails")),
    authority: [ADMIN, USER],
    meta: {
      pageContainerType: "contained",
    },
  },
  {
    key: "dashboard.profile",
    path: `${DASHBOARDS_PREFIX_PATH}/profile`,
    component: lazy(() => import("@/views/dashboards/ProfileDashboard")),
    authority: [ADMIN, USER],
    meta: {
      pageContainerType: "contained",
    },
  },
  {
    key: "dashboard.watchVideos",
    path: `${DASHBOARDS_PREFIX_PATH}/watch-videos`,
    component: lazy(() => import("@/views/dashboards/WatchVideosDashboard")),
    authority: [ADMIN, USER],
    meta: {
      pageContainerType: "contained",
    },
  }
  //TODO: Clean up 
  // {
  //     key: 'dashboard.project',
  //     path: `${DASHBOARDS_PREFIX_PATH}/project`,
  //     component: lazy(() => import('@/views/dashboards/ProjectDashboard')),
  //     authority: [ADMIN, USER],
  //     meta: {
  //         pageContainerType: 'contained',
  //     },
  // },
  // {
  //     key: 'dashboard.marketing',
  //     path: `${DASHBOARDS_PREFIX_PATH}/marketing`,
  //     component: lazy(() => import('@/views/dashboards/MarketingDashboard')),
  //     authority: [ADMIN, USER],
  //     meta: {
  //         pageContainerType: 'contained',
  //     },
  // },
  // {
  //     key: 'dashboard.analytic',
  //     path: `${DASHBOARDS_PREFIX_PATH}/analytic`,
  //     component: lazy(() => import('@/views/dashboards/AnalyticDashboard')),
  //     authority: [ADMIN, USER],
  //     meta: {
  //         pageContainerType: 'contained',
  //         pageBackgroundType: 'plain',
  //     },
  // },
];

export default dashboardsRoute;
