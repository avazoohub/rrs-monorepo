export function removeCodeInURL() {
    if (window.history.pushState) {
        let newurl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
        window.history.pushState({ path: newurl }, "", newurl);
    }
}
