import config from './routes.config.json';

let url = new URL(config.url);
url.port = config.port.toString();
url.pathname += config.api;

function getEndpoint(endpoint: string, ...params: any[]): string {
    return url.toString() + endpoint.split(':')[0] + params.join('/');
}

export {
    getEndpoint,
    config,
}