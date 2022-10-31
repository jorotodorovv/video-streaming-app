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

interface ProviderParams {
    initialToken: string,
    timeQuery: string,
}

interface ProviderCache {
    collection: string,
}

class ProviderConfigurations {
    public url: string;
    public key: string;
    public version: string;

    public clientId: string;
    public scope: string;

    public index: string;

    public paths: ProviderPaths;
    public params: ProviderParams;
    public playerVars: PlayerParams;
    public cache: ProviderCache;
}

export default ProviderConfigurations;