import { Route, Routes } from "react-router-dom";

class RouteBuilder {
    private routes;

    constructor(containers : [], dependencies) {
        this.routes = this.getRoutes(containers, dependencies);
    }

    private getRoutes(containers: [], dependencies) {
        let routes = [];

        containers.forEach(c => {
            let route = this.createRoute(c, dependencies);

            routes.push(route);
        });

        return routes;
    }

    private createRoute(Container, dependencies) {
        let component = <Container.Page {...dependencies} />;
        let route = <Route path={Container.path} element={component} />;

        return route;
    }

    public render(path: string) {
        return (
            <Routes>
                <Route path={path}>
                    {this.routes}
                </Route>
            </Routes>
        );
    }
}

export default RouteBuilder;