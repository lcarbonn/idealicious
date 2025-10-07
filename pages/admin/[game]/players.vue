<template>
    <div>
      <BaseTitle :title="t('pageTitle.playersList') + ' : ' + gameTitle"  :link="'/game/'+gameId"></BaseTitle>
      <ListGamePlayersList :isAdmin="true" :players="players"></ListGamePlayersList>
    </div>
</template>
<script setup lang="ts">

  // use game layout
  definePageMeta({
      layout: 'game'
  })


  // for lang
  const { t } = useI18n()

  // game id
  const gameId:string = useRoute().params.game as string

  // global refs
  const game = useGame()
  const players = useGamePlayers()

  onMounted(() => {
    // get the game for the title
    getGame(gameId)
    // get the players list
    getPlayers(gameId)
  })

  // computed properties
  const gameTitle = computed(() => {
    return game.value?.title
  })

</script>