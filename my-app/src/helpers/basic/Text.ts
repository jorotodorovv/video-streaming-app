import reactStringReplace from 'react-string-replace'

const DEFAULT_SUFFIX: string = "...";
const EMPTY_SUFFIX: string = "";

class Text {
    private text: string;
    constructor(text: string) {
        this.text = text;
    }

    public substring(length: number, suffix: string = DEFAULT_SUFFIX): string {
        return this.text.substring(0, length) +
            (this.text.length > length ? suffix : EMPTY_SUFFIX);
    }

    public replace(value: string, action: Function): string[] {
        return reactStringReplace(this.text, value, (match, i) => action(match, i)) as string[];
    }
}

export default Text;