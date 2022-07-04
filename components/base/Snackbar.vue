<template>
<div>
    <b-alert
      :show="dismissCountDown"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="info"
      dismissible
      @dismissed="coutnDown=0"
      @dismiss-count-down="countDownChanged"
    >
    <div class="d-flex flex-wrap justify-content-md-center">{{snackbarMessage}}</div>
    </b-alert>
</div>
</template>

<script>
export default {
    name: 'Snackbar',

    data: () => ({
        dismissSecs: 4,
        dismissCountDown: 0
    }),

    computed: {
        snackbarMessage() {
            let message = this.$store.getters['snackbar/snackbarMessage']
            if(message != null) {
                    this.dismissCountDown = this.dismissSecs
                } else {
                    this.dismissCountDown = 0
                    this.$store.dispatch("snackbar/setSnackbarMessage", null)
                }
            return message
        },
    },
    methods: {
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }        
    }
}
</script>
