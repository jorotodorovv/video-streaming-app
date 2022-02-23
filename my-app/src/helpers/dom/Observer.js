class Observer {
    ref;
    observer;
    constructor(ref, action, threshold = 1) {
        this.ref = ref;

        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                action();
            }
        }, { threshold });
    }

    observe() {
        this.observer.observe(this.ref.current);
    }

    unobserve() {
        this.observer.unobserve(this.ref.current);
    }
}

export default Observer;