export const route = () => ({
    path: null
});

export const setPath = (path) => {
    if(path!="/login") route.path = path
}

export const getNextPath = () => {
    let path = route.path ? route.path : "/"
    path = path != "/login" ? path : "/"
    return path
};

export default {
    mounted() {
        // Redirect to login if user not connected trying to access authenticated pages
        const path = this.$router.currentRoute.path
        setPath(path)
        console.debug("currentRoute:"+path)
        if(this.$store.getters['auth/isConnected']) {
            const user = this.$store.getters['auth/authUser']
            console.debug("user anonymous="+user.isAnonymous)
            console.debug("user email="+user.email)
            if(!user.isAnonymous && !user.isAdmin && path.indexOf('/admin')!=-1) {
                console.debug("go to home")
                this.$router.push('/')
            }
            if(user.isAnonymous && path.indexOf('/admin')!=-1) {
                console.debug("go to login")
                this.$router.push('/login')
            }
        }
    }
};
