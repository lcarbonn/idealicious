import { getAuth, onAuthStateChanged } from "firebase/auth";

export const route = () => ({
    nextRoute: null
});

export const getNextPath = () => {
    let path = route.nextRoute ? route.nextRoute.path : "/"
    path = path != "/login" ? path : "/"
    return path
};

export default {
    mounted() {
        // Redirect to login if user not connected trying to access authenticated pages
        const path = this.$router.currentRoute.path
        console.debug("currentRoute:"+path)
        if(this.$store.getters['auth/isConnected']) {
            const user = this.$store.getters['auth/authUser']
            console.debug("user anonymous="+user.isAnonymous)
            console.debug("user email="+user.email)
            if(!user.isAnonymous && !user.isAdmin && path.indexOf('/admin')!=-1) {
                console.debug("go to home")
                route.nextRoute = this.$router.currentRoute;
                this.$router.push('/')
            }
            if(user.isAnonymous && path.indexOf('/admin')!=-1) {
                console.debug("go to home")
                route.nextRoute = this.$router.currentRoute;
                this.$router.push('/login')
            }
        }
    }
};
