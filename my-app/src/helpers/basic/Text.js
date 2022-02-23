class Text {
    text;
    constructor(text) {
        this.text = text;
    }

    substring(length, suffix = "...") {
        return this.text.substring(0, length) +
            (this.text.length > length ? suffix : '');
    }
}

export default Text;