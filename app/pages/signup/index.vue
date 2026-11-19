<template>
    <UCard class="text-center">
        <template #title>
            <span>{{t('login.signupTitle')}}</span>
        </template>
        <UForm @submit="onSubmit" class="space-y-4">
            <UFormField :label="t('login.emailPlaceHolder')" :error="!emailState">
                <UInput
                    v-model="form.email"
                    type="text"
                    :placeholder="t('login.emailPlaceHolder')"/>
            </UFormField>

            <UFormField :label="t('login.namePlaceHolder')" :error="!nameState">
                <UInput
                    v-model="form.name"
                    type="text"
                    maxlength="10" trim
                    :placeholder="t('login.namePlaceHolder')"/>
            </UFormField>

            <UFormField :label="t('login.passwordPlaceHolder')" :error="!passwordState">
                <UInput
                    v-model="form.password"
                    type="password"
                    :placeholder="t('login.passwordPlaceHolder')"/>
            </UFormField>

            <UFormField :label="t('login.signupPasswordConfirmPlaceHolder')" :error="!passwordCheckState">
                <UInput
                    v-model="form.passwordCheck"
                    type="password"
                    :placeholder="t('login.signupPasswordConfirmPlaceHolder')"/>
            </UFormField>

            <UButton 
                :disabled="disabledButton" 
                type="submit">{{t('login.signupSignup')}}</UButton>
        </UForm>
        <template #footer>
            <span>{{t('login.signupBacktoLoginStart')}}<nuxt-link to="/login">{{t('login.signupBacktoLoginEnd')}}</nuxt-link></span>
        </template>
    </UCard>
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
