<template>
    <div class="mt-3">
      <GameTitle :title="t('pageTitle.ideasList') + ' : ' + gameTitle"  :link="'/game/'+gameId"></GameTitle>
      <BCard>
        <ListIdeasChain :gameId="gameId" :decksWithIdeas="decksWithIdeasSorted" :uid="authUser.uid" disabled/>
      </BCard>
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
  const authUser = useAuthUser()
  const decksWithIdeasSorted = useDecksWithIdeasSorted()

  onMounted(() => {
    // get the game for the title
    getGame(gameId)
    // get the players list
    listenDecksIdeasSorted(gameId)
  })

  // computed properties
  const gameTitle = computed(() => {
    return game.value?.title
  })

</script>