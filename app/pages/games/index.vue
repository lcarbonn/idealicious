<template>
    <div class="mt-3">
      <GameTitle :title="t('pageTitle.myGamesList')"></GameTitle>
      <ListGamesList :games="games" @deleteGame="deleteGameConfirmed"></ListGamesList>
    </div>
</template>

<script setup lang="ts">

  // for lang
  const { t } = useI18n()

  // global refs
  const games = useGames()

  // global states
  const authUser = useAuthUser()

  onMounted(() => {
    console.log("auth=", authUser.value)
    if(authUser.value) getUserGames(authUser.value.uid)
  })

  //methods
  const deleteGameConfirmed = (game:IGame) => {
    deleteGame(game.id)
    .then(()=>{
      messageToSnack(t('gamesList.deleteGameConfirmed'))
    })
  }

</script>