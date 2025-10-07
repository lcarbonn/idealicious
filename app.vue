<template>
  <div class="d-flex flex-column justify-content-between min-vh-100">
    <VitePwaManifest />
    <div>
      <BaseNavBar></BaseNavBar>
      <BaseSnackToast></BaseSnackToast>
      <BContainer v-if="authUser">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </BContainer>
      <div v-else class="text-center">
        <BSpinner variant="primary" label="Spinning"/>
      </div>
    </div>
    <div v-if="game && (isMyGame || isAdmin)">
      <GameMenuBar :game="game"/>
    </div>
    <div class="d-flex flex-column justify-content-end">
      <br/><br/><br/>
      <BaseFooter v-if="!game" :appVersion="version"></BaseFooter>
    </div>
  </div>
</template>

<script setup lang="ts">

  // imports
  import { version } from '~/package.json';

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