export default {
    beforeCreate() {
        // Redirect to annonymous login if user not authent
        if (!this.$store.getters['auth/isConnected']) {
            this.$store.dispatch("auth/signInAnonymous")
        }
    }
};
