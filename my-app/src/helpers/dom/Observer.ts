const FIRST_ENTRY_INDEX = 0;
const DEFAULT_THRESHOLD = 1;

class DOMObserver{
    private ref : any; //type to be changed into specific one
    private callback : IntersectionObserverCallback;
    private threshold : number;
    private observer: IntersectionObserver;

    constructor(ref : any, action: Function, threshold: number = DEFAULT_THRESHOLD) {
        this.ref = ref;
        this.callback = this.getCallback(action);
        this.threshold = threshold;
    }

    public observe(): void {
        this.observer = new IntersectionObserver(this.callback, { threshold: this.threshold });
        this.observer.observe(this.ref.current);
    }

    public unobserve(): void {
        this.observer.unobserve(this.ref.current);
    }

    private getCallback(callback: Function): IntersectionObserverCallback {
        return (entries) => {
            if (entries[FIRST_ENTRY_INDEX].isIntersecting) {
                callback();
            };
        }
    }
}

export default DOMObserver;