import { useEffect, useState } from 'react';

import RouteBuilder from '../../helpers/routes/RouteBuilder.tsx';

const BaseRouter = (props) => {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        if (props.index &&
            props.containers &&
            props.dependencies) {
            initRoutes();
        }
    }, [props.index, props.containers, props.dependencies]);

    const initRoutes = async () => {
        const routeBuilder = new RouteBuilder(props.containers, props.dependencies);

        const output = routeBuilder.render(props.index);

        setRoutes(output);
    };

    return routes;
};

export default BaseRouter;