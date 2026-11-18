<template>
    <div>
      <GameTitle :title="gameTitle"></GameTitle>
      <GamePlayers :players="players" class="mt-3 mb-2"/>
      <LogicPlayerGame v-if="!ended" :gameId="gameId" :uid="uid"/>
      <div v-if="ended">
          <UCard v-if="!showGameIdeas" :title="t('playerGame.ended')">
              <ListIdeasChain :gameId="gameId" :uid="uid":decksWithIdeas="decksWithIdeas" :players="players"/>
              <template #footer class="text-center" align-h="around">
                  <UButton @click="validateVotes">{{t('playerGame.validateVotes')}}</UButton>
              </template>
          </UCard>
          <UCard v-else :title="t('adminGame.allIdeas')">
              <ListIdeasChain :gameId="gameId" :uid="uid":decksWithIdeas="decksWithIdeasSorted" :players="players" disabled/>
          </UCard>
      </div>
    </div>
  </template>

<script setup lang="ts">

    // use game layout
    definePageMeta({
        layout: 'game'
    })

    const { t } = useI18n()

    const gameId:string = useRoute().params.game as string
    const uid:string = useRoute().params.id as string

    // stated properties
    const game = useGame()
    const player = usePlayer()
    const players = useGamePlayers()
    // stated properties
    const decksWithIdeas = useDecksWithIdeas()
    const decksWithIdeasSorted = useDecksWithIdeasSorted()

    onMounted(() => {
        // start listing the game
        listenGamePlayer(gameId, uid)
        listenGame(gameId)
        listenGamePlayers(gameId)
        listenDecksIdeas(gameId)
        listenDecksIdeasSorted(gameId)
      })

    // local ref
    const showGameIdeas = computed(() => {
      return player.value?.loved
    })

    // computed
    const ended = computed(() => {
        if(!game.value) return false
      return game.value.isEnded()
    })
    // computed properties
    const gameTitle = computed(() => {
      return game.value?.title
    })

    const validateVotes = () => {
      validateLoves(gameId, uid)
  }

</script>