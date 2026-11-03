<template>
  <UApp :toaster="{ position: 'bottom-right' }" :locale="locales[locale]">
    <VitePwaManifest />
    <BaseNavBar></BaseNavBar>
    <BaseSnackToast></BaseSnackToast>
    <UMain>
      <NuxtLayout>
        <UContainer>
          <NuxtPage />
        </UContainer>
      </NuxtLayout>
    </Umain>
    <BaseFooter :appVersion="version"></BaseFooter>
  </UApp>
</template>

<script setup lang="ts">

  // for locale
  import * as locales from '@nuxt/ui/locale'
  const { locale } = useI18n()

  // imports
  import { version } from '../package.json';

  console.debug("appVersion:",version)

  const authUser = useAuthUser()
  const user = useUser()
  const game = useGame()

  const isMyGame = computed(() => {
    return game.value?.userUid == authUser.value.uid
  })
  const isAdmin = computed(() => {
    return user.value?.isAdmin
  })

</script>