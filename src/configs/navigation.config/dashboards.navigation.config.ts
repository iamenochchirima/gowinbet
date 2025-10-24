import { DASHBOARDS_PREFIX_PATH } from "@/constants/route.constant";
import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_ITEM,
} from "@/constants/navigation.constant";
import { ADMIN, USER } from "@/constants/roles.constant";
import type { NavigationTree } from "@/@types/navigation";

const dashboardsNavigationConfig: NavigationTree[] = [
  {
    key: "dashboard",
    path: "",
    title: "Dashboard",
    translateKey: "nav.dashboard.dashboard",
    icon: "dashboard",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [ADMIN, USER],
    meta: {
      horizontalMenu: {
        layout: "default",
      },
    },
    subMenu: [
      {
        key: "dashboard.home",
        path: `${DASHBOARDS_PREFIX_PATH}/home`,
        title: "Home",
        translateKey: "nav.dashboard.home",
        icon: "dashboardHome",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "dashboard.watchlist",
        path: `${DASHBOARDS_PREFIX_PATH}/watchlist`,
        title: "Watchlist",
        translateKey: "nav.dashboard.watchlist",
        icon: "dashboardWatchlist",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "dashboard.magicRadar",
        path: `${DASHBOARDS_PREFIX_PATH}/magic-radar`,
        title: "Magic Radar",
        translateKey: "nav.dashboard.magicRadar",
        icon: "dashboardMagicRadar",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "dashboard.magicDip",
        path: `${DASHBOARDS_PREFIX_PATH}/magic-dip`,
        title: "Magic Dip",
        translateKey: "nav.dashboard.magicDip",
        icon: "dashboardMagicDip",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "dashboard.profile",
        path: `${DASHBOARDS_PREFIX_PATH}/profile`,
        title: "Profile",
        translateKey: "nav.dashboard.profile",
        icon: "dashboardProfile",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "dashboard.watchVideos",
        path: `${DASHBOARDS_PREFIX_PATH}/watch-videos`,
        title: "Watch Videos",
        translateKey: "nav.dashboard.watchVideos",
        icon: "dashboardWatchVideos",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      //TODO: Clean
      //   {
      //     key: "dashboard.project",
      //     path: `${DASHBOARDS_PREFIX_PATH}/project`,
      //     title: "Project",
      //     translateKey: "nav.dashboard.project",
      //     icon: "dashboardProject",
      //     type: NAV_ITEM_TYPE_ITEM,
      //     authority: [ADMIN, USER],
      //     subMenu: [],
      //   },
      //   {
      //     key: "dashboard.marketing",
      //     path: `${DASHBOARDS_PREFIX_PATH}/marketing`,
      //     title: "Marketing",
      //     translateKey: "nav.dashboard.marketing",
      //     icon: "dashboardMarketing",
      //     type: NAV_ITEM_TYPE_ITEM,
      //     authority: [ADMIN, USER],
      //     subMenu: [],
      //   },
      //   {
      //     key: "dashboard.analytic",
      //     path: `${DASHBOARDS_PREFIX_PATH}/analytic`,
      //     title: "Analytic",
      //     translateKey: "nav.dashboard.analytic",
      //     icon: "dashboardAnalytic",
      //     type: NAV_ITEM_TYPE_ITEM,
      //     authority: [ADMIN, USER],
      //     subMenu: [],
      //   },
    ],
  },
];

export default dashboardsNavigationConfig;
