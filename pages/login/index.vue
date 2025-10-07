<template>
    <BCard class="text-center">
        <BCardText>
            <BForm class="my-1" @submit="onSubmit">
                <BFormInput 
                    class="my-1" 
                    id="email" 
                    :placeholder="t('login.emailPlaceHolder')"
                    v-model="form.email" 
                    type="email" 
                    :state="emailState" />
                <BFormInput 
                    class="my-1" 
                    id="password"
                    :placeholder="t('login.passwordPlaceHolder')"
                    v-model="form.password" 
                    type="password" 
                    :state="passwordState"/>
                <BButton 
                    class="my-1" 
                    :disabled="disabledButton" 
                    block 
                    type="submit">{{t('login.login')}}</BButton>
            </BForm>
        </BCardText>
        <p><nuxt-link to="/login/reset-password">{{t('login.lostPassword')}}</nuxt-link></p>
        <p>{{$t('login.signupStart')}}<nuxt-link to="/signup">{{t('login.signupEnd')}}</nuxt-link>.</p>
    </BCard>
</template>

<script setup>

    // i18N
    const { t } = useI18n()

    // local ref
    const form = ref({
            email: null,
            password: null
        })

    // computed properties
    const emailState = computed(() => {
        if(!form.value) return false
        return form.value.email ? true:false
        })

    const passwordState = computed(() => {
        if(!form.value) return false
        return form.value.password ? true:false
        })
    const disabledButton = computed(() => {
        if(!form.value) return false
            return !(form.value.email && form.value.password)
        })
    
    // methods
    const onSubmit = (event) => {
        event.preventDefault()
        signInUser(form.value.email, form.value.password)
        .then((authUser) => {
            if(authUser) {
                messageToSnack(t('login.signInOk')+ authUser.email)
                navigateTo('/')
            }
        })
    }

</script>
<style scoped>
    a {
    text-decoration: none !important;
    }
</style>
