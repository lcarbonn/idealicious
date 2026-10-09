<template>
    <div class="mt-3">
      <GameTitle :title="t('pageTitle.myGamesList')"></GameTitle>
      <ListGamesList :games="games" @deleteGame="askDeleteGame"></ListGamesList>
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
    getUserGames(authUser.value.uid)
  })

  //methods
  const askDeleteGame = (game:IGame) => {
    // console.log("delete Game id:"+game.id + ", title:"+game.title)
    deleteGame(game.id)
    .then(()=>{
      messageToSnack(t('gamesList.deleteGameConfirmed'))
    })
  }

</script>