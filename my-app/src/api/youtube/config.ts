import File from "../../helpers/basic/File.ts";

class ProviderConfigurations {
    private file;

    public url: string;
    public key: string;
    public initialToken: string;
    public paths;
    public version: string;

    constructor(configPath: string) {
        this.file = new File(configPath);
    }

    public async init() {
        let config = await this.file.export();

        this.url = config.url + "/" + config.version;
        this.key = config.key;
        this.initialToken = config.initialToken;
        this.paths = config.paths;
    }
}

export default ProviderConfigurations;