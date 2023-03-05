<template>
    <b-card class="text-center">
        <b-card-text>
            <b-form class="my-1">
                <b-form-input class="my-1" id="email" placeholder="Email" v-model="form.email" type="email" :state="emailState"></b-form-input>
                <b-form-input class="my-1" id="password" placeholder="Password" v-model="form.password" type="password" :state="passwordState"></b-form-input>
                <b-button class="my-1" :disabled="disabledButton" block @click="emailLogin()">Connexion</b-button>
            </b-form>
        </b-card-text>
        <p><nuxt-link to="/login/reset-password">J'ai oublié mon mot de passe :'(</nuxt-link></p>
        <p>Vous n'avez pas de compte ? Vous pouvez <nuxt-link to="/signup">en créer un</nuxt-link>.</p>
    </b-card>
</template>

<script>
import { getNextPath } from '~/mixins/authenticated.js';

export default {
    name: "Login",
    data: () => ({
        form: {
            email: null,
            password: null,
        }
    }),
    computed: {
        emailState() {
            return this.form.email ? true:false
        },
        passwordState() {
            return this.form.password ? true:false
        },
        disabledButton() {
            return !(this.emailState && this.passwordState)
        }
    },
    methods: {
        clearForm() {
            this.form.email = null
            this.form.password = null
        },
        emailLogin() {
            this.$store.dispatch('auth/signInWithEmailAndPassword', {
                    email: this.form.email,
                    password: this.form.password
                })
                .then(res => {
                    this.$router.push(getNextPath());
                })
                .catch(e => {
                    console.error(e)
                });

        }
    }
};
</script>
