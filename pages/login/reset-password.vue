<template>
    <b-card class="text-center">
        <b-card-text>
            <b-form class="my-1">
                <span class="my-1">C'est parti pour réinitialiser mon mot de passe !</span>
                <b-form-input class="my-1" id="email" 
                        v-model="form.email" 
                        type="email" 
                        :state="emailState" 
                        placeholder="Email"
                        @keyup.enter="sendPasswordResetEmail()"
                        ></b-form-input>
                <b-button class="my-1" :disabled="!emailState" block @click="sendPasswordResetEmail()">Envoyer un mail</b-button>
            </b-form>
        </b-card-text>
        <p><nuxt-link to="/login">Je me souviens de mon mot de passe ! :D</nuxt-link></p>
        <p>Vous n'avez pas de compte ? Vous pouvez <nuxt-link to="/signup">en créer un</nuxt-link>.</p>
    </b-card>
</template>

<script>
export default {
    name: "resetPassword",
    data: () => ({
        form: {
            email: null
        }
    }),
    computed: {
        emailState() {
            return this.form.email ? true:false
        }
    },

    methods: {
        sendPasswordResetEmail() {
            this.$store.dispatch('auth/sendPasswordResetEmail', this.form.email)
                .then(res => {
                    this.$router.push("/login");
                })
                .catch(e => {
                    console.error(e)
                });
        }
    }
};
</script>
