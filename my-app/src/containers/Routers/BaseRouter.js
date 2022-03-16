import { useEffect, useState } from 'react';

import RouteBuilder from '../../helpers/routes/RouteBuilder.tsx';

const BaseRouter = (props) => {
    const [routes, setRoutes] = useState([]);
    
    const initRoutes = async () => {
        const routeBuilder = new RouteBuilder(props.containers, props.dependencies);
    
        const output = routeBuilder.render(props.indexPath);
    
        setRoutes(output);
    };
    
    useEffect(() => {
        if (props.dependencies) {
            initRoutes();
        }
    }, [props.dependencies]);

    return routes;
};

export default BaseRouter;