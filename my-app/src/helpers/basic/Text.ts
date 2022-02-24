const DEFAULT_SUFFIX : string = "...";
const EMPTY_SUFFIX : string = "";

class Text {
    private text: string;
    constructor(text: string) {
        this.text = text;
    }

    substring(length: number, suffix: string = DEFAULT_SUFFIX) : string {
        return this.text.substring(0, length) +
            (this.text.length > length ? suffix : EMPTY_SUFFIX);
    }
}

export default Text;