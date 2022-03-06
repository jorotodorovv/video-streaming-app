const DEFAULT_SCROLL_BEHAVIOR = "smooth";

class Window {
    public static scrollTo(ref){
        window.scrollTo({
            top: ref.current.offsetTop,
            behavior: DEFAULT_SCROLL_BEHAVIOR
        });
    }
}

export default Window;