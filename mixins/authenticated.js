export const route = () => ({
    path: null
});

export const setPath = (path) => {
    if(path.indexOf("/login")==-1 && path.indexOf("/signup")==-1) route.path = path
}

export const getNextPath = () => {
    let path = route.path ? route.path : "/"
    return path
};

export default {
    beforeCreate() {
        // get current path for after login
        const path = this.$router.currentRoute.path
        setPath(path)
    }
};
