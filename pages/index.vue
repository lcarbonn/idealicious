<template>
  <div>
    <br/>
    <div>
      <BCard :title="t('home.welcome')" bg-variant="primary" text-variant="light" style="border-radius: 1.25rem;" class="text-center">
        <BAvatar variant="primary" size="lg" rounded src="/icon.png"></BAvatar>
        <BCardText>{{t('home.welcome2')}}</BCardText>
        <BCardText>{{t('home.welcome3')}}</BCardText>
        <!-- <BCardText>{{t('home.welcome4')}}</BCardText>
        <BCardText>{{t('home.welcome5')}}</BCardText> -->
      </BCard>
    </div>
    <br/>
    <BCard bg-variant="primary" text-variant="light" style="border-radius: 1.25rem;">
    <GameAddGame @addGame="addGame" />
    </BCard>
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