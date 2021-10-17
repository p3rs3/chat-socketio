import { Join } from "../pages/Join";
import { Room } from "../pages/Room";
import { Routes } from "./interfaces/routes.interface";

export enum RouteNames {
    JOIN = '/join',
    ROOM = '/room',
}

export const routes: Routes[] = [
    {
        path: RouteNames.JOIN,
        exact: true,
        component: Join
    },
    {
        path: RouteNames.ROOM,
        exact: true,
        component: Room
    },
];