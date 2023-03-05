<template>
    <b-card class="text-center">
        <b-card-text>
            <b-form class="my-1">
                <span class="my-1">C'est parti pour créer un nouveau compte !</span>
                <b-form-input class="my-1" 
                    v-model="form.email"
                    type="text"
                    placeholder="Email"
                    :state="emailState"/>

                <b-form-input class="my-1" 
                    v-model="form.password"
                    type="password"
                    placeholder="Mot de passe"
                    :state="passwordState" />

                <b-form-input class="my-1" 
                    v-model="form.passwordCheck"
                    type="password"
                    placeholder="Confirmation du mot de passe"
                    :state="passwordCheckState" />

                <b-button class="my-1"
                    block
                    :disabled="disabledButton" 
                    @click="emailSignIn()">Inscription</b-button>
            </b-form>
        </b-card-text>
        <p>Ou revenir à la <nuxt-link to="/login">page de connexion</nuxt-link>.</p>
    </b-card>
</template>

<script>
export default {
    name: "signup",
    data: () => ({
        form: {
            email: null,
            password: null,
            passwordCheck: null
        }
    }),
    computed: {
        emailState() {
            return this.form.email ? true:false
        },
        passwordState() {
            return this.form.password ? true:false
        },
        passwordCheckState() {
            const b = this.form.passwordCheck ? true:false 
            const equal = this.form.password == this.form.passwordCheck ? true:false
            return b&&equal
        },
        disabledButton() {
            return !(this.emailState && this.passwordState && this.passwordCheckState)
        }
    },

    methods: {
        emailSignIn() {
            this.$store
                .dispatch('auth/createUserWithEmailAndPassword', {
                    email: this.form.email,
                    password: this.form.password
                })
                .then(res => {
                    this.$router.push('/');
                })
                .catch(e => {
                    console.error(e)
                });
            }
    }
};
</script>