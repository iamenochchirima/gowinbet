import dashboardsRoute from "./dashboardsRoute";
import conceptsRoute from "./conceptsRoute";
import uiComponentsRoute from "./uiComponentsRoute";
import authRoute from "./authRoute";
import authDemoRoute from "./authDemoRoute";
import guideRoute from "./guideRoute";
import othersRoute from "./othersRoute";
import type { Routes } from "@/@types/routes";
import generalRoutes from "./generalRoutes";
import protectedGeneral from "./protectedGeneral";

export const publicRoutes: Routes = [...authRoute, ...generalRoutes];

export const protectedRoutes: Routes = [
  ...dashboardsRoute,
  ...conceptsRoute,
  ...uiComponentsRoute,
  ...authDemoRoute,
  ...guideRoute,
  ...othersRoute,
  // ...protectedGeneral,
];
