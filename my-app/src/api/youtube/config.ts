import BaseConfigurations from "../../helpers/base/BaseConfigurations.ts";
import File from "../../helpers/basic/File.ts";

class ProviderConfigurations extends BaseConfigurations {
    public url: string;
    public key: string;

    public paths: Object;
    public params: Object;

    constructor(configPath: string) {
        super(configPath);
    }

    public async init() {
        let config = await super.init();

        this.url = config.url.concat(`/${config.version}`);
        this.key = config.key;

        this.paths = config.paths;
        this.params = config.params;
    }
}

export default ProviderConfigurations;