import BaseConfigurations from "../../helpers/base/BaseConfigurations";

interface ProviderPaths {
    v: string,
    ch: string,
    p: string,
    i: string,
    subs: string,
}

interface ProviderParams {
    timeQuery: string,
}

class ProviderConfigurations extends BaseConfigurations {
    public url: string;
    public key: string;

    public clientId: string;
    public scope: string;

    public index: string;

    public paths: ProviderPaths;
    public params: ProviderParams;

    constructor(configPath: string) {
        super(configPath);
    }

    public async init() {
        let config = await super.init();

        this.url = config.url.concat(`/${config.version}`);
        this.key = config.key;

        this.index = config.index;

        this.clientId = config.clientId;
        this.scope = config.scope;

        this.paths = config.paths;
        this.params = config.params;
    }
}

export default ProviderConfigurations;