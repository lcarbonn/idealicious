<template>
  <div>
    <div>
      <BCard :title="t('home.welcome')">
        <BCardText>{{t('home.welcome2')}}</BCardText>
        <BCardText>{{t('home.welcome3')}}</BCardText>
        <BCardText>{{t('home.welcome4')}}</BCardText>
        <BCardText>{{t('home.welcome5')}}</BCardText>
      </BCard>
    </div>
    <GameAddGame @addGame="addGame" />
  </div>
</template>

<script setup lang="ts">

  // for lang
  const { t } = useI18n()
  
  // methods
  const addGame = (game:IGame) => {
    console.log("add game")
    game.userUid = useAuthUser().value.uid
    createGame(game)
    .then((gameId) => {
      messageToSnack(t('addGame.added'))
      navigateTo("/game/" + gameId)
    })
  }

</script>