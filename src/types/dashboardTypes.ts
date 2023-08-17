import { ApiResult } from "./profileTypes";

export type DashboardInfoType = {
  usersCount: number;
  profilesCount: number;
  adultProfilesCount: number;
}

export type DashboardInfoResponseType = ApiResult & {
  dashboardInfo: DashboardInfoType
};