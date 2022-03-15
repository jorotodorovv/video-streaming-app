import File from "../../helpers/basic/File.ts";

class ProviderConfigurations {
    private file;

    public url: string;
    public key: string;
    
    public paths : Object;
    public params : Object;

    constructor(configPath: string) {
        this.file = new File(configPath);
    }

    public async init() {
        let config = await this.file.export();

        this.url = config.url + "/" + config.version;
        this.key = config.key;

        this.paths = config.paths;
        this.params = config.params;
    }
}

export default ProviderConfigurations;