<template>
    <b-card class="text-center">
        <b-card-text>
            <b-form class="my-1">
                <span class="my-1">{{$t('resetPassordTitle')}}</span>
                <b-form-input class="my-1" 
                        id="email" 
                        v-model="form.email" 
                        type="email" 
                        :state="emailState" 
                        :placeholder="$t('loginEmailPlaceHolder')"
                        ></b-form-input>
                <b-button class="my-1" :disabled="!emailState" block @click="sendPasswordResetEmail()">{{$t('resetPassordSendmail')}}</b-button>
            </b-form>
        </b-card-text>
        <p><nuxt-link to="/login">{{$t('resetPassordRemember')}}</nuxt-link></p>
        <p>{{$t('loginSignupStart')}}<nuxt-link to="/signup">{{$t('loginSignupEnd')}}</nuxt-link>.</p>
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
