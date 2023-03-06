<template>
    <b-card class="text-center">
        <b-card-text>
            <b-form class="my-1">
                <b-form-input 
                    class="my-1" 
                    id="email" 
                    :placeholder="$t('loginEmailPlaceHolder')"
                    v-model="form.email" 
                    type="email" 
                    :state="emailState" />
                <b-form-input 
                    class="my-1" 
                    id="password"
                    :placeholder="$t('loginPasswordPlaceHolder')"
                    v-model="form.password" 
                    type="password" 
                    :state="passwordState"/>
                <b-button 
                    class="my-1" 
                    :disabled="disabledButton" 
                    block 
                    @click="emailLogin()">{{$t('loginLogin')}}</b-button>
            </b-form>
        </b-card-text>
        <p><nuxt-link to="/login/reset-password">{{$t('loginLostPassword')}}</nuxt-link></p>
        <p>{{$t('loginSignupStart')}}<nuxt-link to="/signup">{{$t('loginSignupEnd')}}</nuxt-link>.</p>
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
                    if(this.$store.getters['auth/isAdmin']) {
                        this.$router.push(getNextPath());
                    } else {
                        this.$router.push("/");
                    }
                })
                .catch(e => {
                    console.error(e)
                });

        }
    }
};
</script>
