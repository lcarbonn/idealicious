export default {
    beforeCreate() {
        // Redirect to home if user not admin
        const user = this.$store.getters['auth/authUser']
        if(user.email && !user.isAdmin) {
                this.$router.push('/')
        }
        // Redirect to login if user anonymous
        if(!user.email) {
            this.$router.push('/login')
    }
}
};
