<template>
    <b-card>
        <b-card-text>
            <b-container fluid>
                <b-row class="my-1">
                    <b-col sm="12">
                        <span>C'est parti pour réinitialiser mon mot de passe !</span>
                    </b-col>
                </b-row>
                <b-row class="my-1">
                    <b-col>
                    <b-form-input id="email" 
                        v-model="form.email" 
                        type="email" 
                        :state="emailState" 
                        placeholder="Email"
                        @keyup.enter="sendPasswordResetEmail()"
                        ></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="my-2" align-h="center">
                    <b-col>
                        <b-button :disabled="!emailState" block @click="sendPasswordResetEmail()">Envoyer un mail</b-button>
                    </b-col>
                </b-row>
                <b-row class="my-2" align-h="center">
                    <b-col>
                        <p><nuxt-link to="/login">Je me souviens de mon mot de passe ! :D</nuxt-link></p>
                        <!-- <p>Vous n'avez pas de compte ? Vous pouvez <nuxt-link to="/signup">en créer un</nuxt-link>.</p> -->
                    </b-col>
                </b-row>
            </b-container>
        </b-card-text>
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
                    //this.$router.push(getNextPath());
                })
                .catch(e => {
                    console.error(e)
                });
        }
    }
};
</script>
