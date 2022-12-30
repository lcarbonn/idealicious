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
                <b-row class="my-1">
                    <b-col sm="2">
                    <label for="password">Password</label>
                    </b-col>
                    <b-col sm="10">
                    <b-form-input id="password" v-model="form.password" type="password" :state="passwordState"></b-form-input>
                    </b-col>
                </b-row>
            </b-container>
            <b-button @click="validateLogin()">Connexion</b-button>
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
        },
        error: '',
        showSnackbar: false
    }),
    computed: {
        emailState() {
            return this.form.email != "" ? true:false
        },
        passwordState() {
            return this.form.password != "" ? true:false
        },
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

        },
        validateLogin() {
            if (this.emailState && this.passwordState) {
                this.emailLogin()
            }
        }
    }
};
</script>
