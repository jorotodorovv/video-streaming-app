interface PlayerParams {
    autoplay: Number,
    modestbranding: Number,
    enablejsapi: Number,
    rel: Number,
    fs: Number,
}
interface ProviderPaths {
    v: string,
    ch: string,
    p: string,
    i: string,
    subs: string,
}

interface ProviderQuery {
    initialToken: string,
    timeQuery: string,
}

interface ProviderCache {
    collection: string,
}

interface ProviderParams {
    videosPerRequest: number,
}

class ProviderConfigurations {
    public url: string;
    public key: string;
    public version: string;

    public clientId: string;
    public scope: string;

    public index: string;

    public paths: ProviderPaths;
    public query: ProviderQuery;
    public playerVars: PlayerParams;
    public cache: ProviderCache;
    public params: ProviderParams;
}

export {
    ProviderParams
};

export default ProviderConfigurations;