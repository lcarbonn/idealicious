export default {
    beforeCreate() {
        // Redirect to home if user not admin
        const isAnomymous = this.$store.getters['auth/isAnonymous']
        const isAdmin = this.$store.getters['auth/isAdmin']
        if(!isAnomymous && !isAdmin) {
                this.$router.push('/')
        }
        // Redirect to login if user anonymous
        if(isAnomymous) {
            this.$router.push('/login')
    }
}
};
