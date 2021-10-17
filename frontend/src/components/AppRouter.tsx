import { Redirect, Route, Switch } from 'react-router';
import { RouteNames, routes } from '../router';

export const AppRouter = () => {
    return (
        <Switch>
            {routes.map(route =>
                <Route
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    key={route.path}
                />
            )}
            <Redirect to={RouteNames.JOIN}></Redirect>
        </Switch>
    );
}