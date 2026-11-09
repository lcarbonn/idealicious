<template>
    <UCard class="text-center">
        <template #header>
            <span>{{t('login.resetPassordTitle')}}</span>
        </template>
        <UForm @submit="onSubmit">
            <UInput 
                    id="email" 
                    v-model="form.email" 
                    type="email" 
                    :state="emailState" 
                    :placeholder="t('login.emailPlaceHolder')"
                    ></UInput>
            <UButton class="mt-3" :disabled="!emailState" block type="submit">{{t('login.resetPassordSendmail')}}</UButton>
        </UForm>
        <template #footer>
            <p><nuxt-link to="/login">{{t('login.resetPassordRemember')}}</nuxt-link></p>
            <p>{{$t('login.signupStart')}}<nuxt-link to="/signup">{{t('login.signupEnd')}}</nuxt-link>.</p>
        </template>
    </UCard>
</template>

<script setup>

    // i18N
    const { t } = useI18n()

    // local ref
    const form = ref({
        email:null
        })

    // computed properties
    const emailState = computed(() => {
        if(!form.value) return false
            return form.value.email ? true:false
    })

    // methods
    const onSubmit = (event) => {
        event.preventDefault()
        sendPasswordReset(form.value.email)
            .then(() => {
                messageToSnack(t('login.resetPasswordSent') + form.value.email)
                navigateTo("/login");
            })
    }
</script>
<style scoped>
    a {
    text-decoration: none !important;
    }
</style>
