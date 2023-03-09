<template>
    <b-card class="text-center">
        <b-card-text>
            <b-form class="my-1">
                <span class="my-1">{{$t('signupTitle')}}</span>
                <b-form-input class="my-1"
                    v-model="form.name"
                    type="text"
                    :placeholder="$t('loginNamePlaceHolder')"
                    :state="nameState"/>

                <b-form-input class="my-1"
                    v-model="form.email"
                    type="text"
                    :placeholder="$t('loginEmailPlaceHolder')"
                    :state="emailState"/>

                <b-form-input class="my-1" 
                    v-model="form.password"
                    type="password"
                    :placeholder="$t('loginPasswordPlaceHolder')"
                    :state="passwordState" />

                <b-form-input class="my-1" 
                    v-model="form.passwordCheck"
                    type="password"
                    :placeholder="$t('signupPasswordConfirmPlaceHolder')"
                    :state="passwordCheckState" />

                <b-button class="my-1"
                    block
                    :disabled="disabledButton" 
                    @click="emailSignUp()">{{$t('signupSignup')}}</b-button>
            </b-form>
        </b-card-text>
        <p>{{$t('signupBacktoLoginStart')}}<nuxt-link to="/login">{{$t('signupBacktoLoginEnd')}}</nuxt-link>.</p>
    </b-card>
</template>

<script>
export default {
    name: "signup",
    data: () => ({
        form: {
            name: null,
            email: null,
            password: null,
            passwordCheck: null
        }
    }),
    computed: {
        nameState() {
            return this.form.name ? true:false
        },
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
        emailSignUp() {
            this.$store
                .dispatch('auth/createUserWithEmailAndPassword', {
                    name: this.form.name,
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