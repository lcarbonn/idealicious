<template>
    <b-card>
        <b-card-text>
            <b-container fluid>
                <b-row class="my-1">
                    <b-col sm="2">
                    <label for="email">Email</label>
                    </b-col>
                    <b-col sm="10">
                    <b-form-input id="email" v-model="form.email" type="email" :state="emailState"></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="my-2">
                    <b-col sm="2">
                    <label for="password">Password</label>
                    </b-col>
                    <b-col sm="10">
                    <b-form-input id="password" v-model="form.password" type="password" :state="passwordState"></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="my-2" align-h="center">
                    <b-col sm="2"></b-col>
                    <b-col sm="10">
                        <b-button :disabled="disabledButton" block @click="emailLogin()">Connexion</b-button>
                    </b-col>
                </b-row>
                <b-row class="my-3" align-h="center">
                    <b-col sm="2"></b-col>
                    <b-col sm="10">
                        <p><nuxt-link to="/login/reset-password">J'ai oublié mon mot de passe :'(</nuxt-link></p>
                        <!-- <p>Vous n'avez pas de compte ? Vous pouvez <nuxt-link to="/signup">en créer un</nuxt-link>.</p> -->
                    </b-col>
                </b-row>
            </b-container>
        </b-card-text>
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
