<template>
    <md-snackbar :md-active.sync="isASnackbarMessage"
                 :md-position="position"
                 :md-duration="duration"
                 md-persistent>
        <span>{{snackbarMessage}}</span>
        <md-button class="md-primary" @click="isASnackbarMessage = false">
            <md-icon>close</md-icon>
        </md-button>
    </md-snackbar>
</template>

<script>
export default {
    name: 'Snackbar',

    data: () => ({
        position: 'center',
        duration: 4000,
    }),

    computed: {
        snackbarMessage() {
            return this.$store.getters['snackbar/snackbarMessage']
        },
        isASnackbarMessage: {
            get() {
                return this.$store.getters['snackbar/snackbarMessage'] != null
            },
            set(fullName) {
                this.$store.dispatch("snackbar/setSnackbarMessage", { message: null });
            }
        }
    }
}
</script>
