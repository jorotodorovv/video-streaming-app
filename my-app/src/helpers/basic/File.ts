class File {
    private path: string;
    constructor(path: string) {
        this.path = path;
    }

    public async export(): Promise<string> {
        return await fetch(this.path)
            .then(response => response.json())
            .then(json => json);
    }
}

export default File;