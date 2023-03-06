export default {
    beforeCreate() {
        // Redirect to home if user not admin
        const user = this.$store.getters['auth/authUser']
        if(!user.isAnonymous && !user.isAdmin) {
                this.$router.push('/')
        }
        // Redirect to login if user anonymous
        if(user.isAnonymous) {
            this.$router.push('/login')
    }
}
};
