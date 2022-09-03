class Cache {
    private prefix: string;
    constructor(prefix: string) {
        this.prefix = prefix;
    }

    public async receive(key: string, action: Function){
        let value = this.get(key);

        if(value != null){
            return JSON.parse(value);
        }
        
        value = await action();

        this.set(key, JSON.stringify(value));

        return value;
    }
    
    private get(key: string) {
        return localStorage.getItem(this.prefix + "_" + key);
    }

    private set(key: string, value: string) {
        localStorage.setItem(this.prefix + "_" + key, value);
    }
}

export default Cache;