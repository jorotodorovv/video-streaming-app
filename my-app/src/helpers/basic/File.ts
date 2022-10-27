class File<T> {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    public async export() : Promise<T>{
        return await fetch(this.path)
            .then(response => response.json())
            .then(json => json) as T;
    }
}

export default File;