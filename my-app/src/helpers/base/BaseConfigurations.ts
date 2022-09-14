import File from "../../helpers/basic/File";

abstract class BaseConfigurations {
    private file : File;

    constructor(configPath: string) {
        this.file = new File(configPath);
    }

    public async init(){
        return await this.file.export();
    }
}

export default BaseConfigurations;