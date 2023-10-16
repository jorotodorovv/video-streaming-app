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

interface ProviderClient {
    index: string;
    query: ProviderQuery;
    playerVars: PlayerParams;
    cache: ProviderCache;
    params: ProviderParams;
}

class ProviderConfigurations {
    public url: string;
    public version: string;  
    public scope: string;
    
    public paths: ProviderPaths;
    public client: ProviderClient;
}

export {
    ProviderParams
};

export default ProviderConfigurations;