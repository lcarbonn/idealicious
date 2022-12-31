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
    beforeCreate() {
        // Redirect to login if user not connected trying to access authenticated pages
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            const path = this.$router.currentRoute.path
            console.debug("user="+user)
            console.debug("currentRoute:"+path)
            if (user) {
                console.debug("user anonymous="+user.isAnonymous)
                console.debug("user email="+user.email)
                // User is signed in
                this.$store.dispatch('auth/setActiveUser', user)
                // User is anonymous and want go to admin, redirect to login
                if(user.isAnonymous && path.indexOf('/admin')!=-1) {
                    console.debug("go to login")
                    this.$store.dispatch('auth/setActiveUser', { user: null })
                    route.nextRoute = this.$router.currentRoute;
                    this.$router.push('/login')
                }
            } else {
                // if no user, login anonymously
                console.debug("signInAnonymous")
                this.$store.dispatch("auth/signInAnonymous")
            }
        });
    }
};
