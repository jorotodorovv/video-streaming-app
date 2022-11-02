import config from './routes.config.json';

let url = new URL(config.url);
url.port = config.port.toString();
url.pathname += config.api;

function getEndpoint(endpoint: string, ...params: any[]): string {
    let nodes = endpoint.split('/:');

    if (params && params.length === nodes.length - 1) {
        for (let i = 1; i < nodes.length; i++) {
            nodes[i] = params[i - 1];
        }
    }

    return url.toString() + nodes.join('/');
}

export {
    getEndpoint,
    config,
}