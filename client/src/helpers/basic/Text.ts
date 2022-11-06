import reactStringReplace from 'react-string-replace'

const DEFAULT_SUFFIX: string = "...";
const EMPTY_SUFFIX: string = "";

class Text {
    private _text: string;
    constructor(text: string) {
        this._text = text;
    }

    get text() : string {
        return this._text;
    }

    public substring(length: number, suffix: string = DEFAULT_SUFFIX): string {
        return this._text.substring(0, length) +
            (this._text.length > length ? suffix : EMPTY_SUFFIX);
    }

    public replace(value: string, action: Function): string[] {
        return reactStringReplace(this._text, value, (match, i) => action(match, i)) as string[];
    }
}

export default Text;