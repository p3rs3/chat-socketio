import React from "react";

export interface Routes {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}