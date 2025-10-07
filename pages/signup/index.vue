<template>
    <BContainer>
        <BCard class="text-center">
            <BCardText>
                <BForm class="my-1" @submit="onSubmit">
                    <span class="my-1">{{t('login.signupTitle')}}</span>
                    <BFormInput class="my-1"
                        v-model="form.email"
                        type="text"
                        :placeholder="t('login.emailPlaceHolder')"
                        :state="emailState"/>

                        <BFormInput class="my-1"
                        v-model="form.name"
                        type="text"
                        maxlength="10" trim
                        :placeholder="t('login.namePlaceHolder')"
                        :state="nameState"/>

                    <BFormInput class="my-1" 
                        v-model="form.password"
                        type="password"
                        :placeholder="t('login.passwordPlaceHolder')"
                        :state="passwordState" />

                    <BFormInput class="my-1" 
                        v-model="form.passwordCheck"
                        type="password"
                        :placeholder="t('login.signupPasswordConfirmPlaceHolder')"
                        :state="passwordCheckState" />

                    <BButton class="my-1"
                        block
                        :disabled="disabledButton" 
                        type="submit">{{t('login.signupSignup')}}</BButton>
                </BForm>
            </BCardText>
            <p>{{t('login.signupBacktoLoginStart')}}<nuxt-link to="/login">{{t('login.signupBacktoLoginEnd')}}</nuxt-link>.</p>
        </BCard>
    </BContainer>
</template>

<script setup>

    // i18N
    const { t } = useI18n()

    // local ref
    const form = ref({
            name:null,
            email: null,
            password: null,
            passwordCheck: null
        })

    // fill player name if exist
    const player = usePlayer()
    form.value.name = player.value?.name

    // computed properties
    const nameState = computed(() => {
        if(!form.value) return false
        return form.value.name ? true:false
    })
    const emailState = computed(() => {
        if(!form.value) return false
        return form.value.email ? true:false
    })
    const passwordState = computed(() => {
        if(!form.value) return false
        return form.value.password ? true:false
    })
    const passwordCheckState = computed(() => {
        if(!form.value) return false
        return passwordCheck(form.value.password, form.value.passwordCheck)
    })
    const disabledButton = computed(() => {
        if(!form.value) return false
        return !(form.value.email && form.value.password && form.value.passwordCheck && passwordCheck(form.value.password, form.value.passwordCheck)
        )
    })

    // methods
    const onSubmit = (event) => {
        event.preventDefault()
        signUp(form.value.name, form.value.email, form.value.password)
        .then(() => {
            navigateTo('/')
        })
    }
    const passwordCheck= (p, pc) => {
        const b = pc ? true:false 
        const equal = p == pc ? true:false
        return b&&equal
    }

</script>
<style scoped>
    a {
    text-decoration: none !important;
    }
</style>
