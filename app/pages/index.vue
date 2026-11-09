<template>
  <div class="mt-3">
      <BaseHome/>
      <GameAddGame @addGame="addGame" />
  </div>
</template>

<script setup lang="ts">

  // for lang
  const { t } = useI18n()
  
  // methods
  const addGame = (game:IGame) => {
    // console.log("add game")
    game.userUid = useAuthUser().value.uid
    createGame(game)
    .then((gameId) => {
      messageToSnack(t('addGame.added'))
      navigateTo("/game/" + gameId)
    })
  }

</script>