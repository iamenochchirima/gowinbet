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
];

export default dashboardsRoute;
