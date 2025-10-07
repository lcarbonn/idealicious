<template>
    <div>
      <BaseTitle :title="gameTitle"></BaseTitle>
      <GamePlayers :players="players"/>
      <LogicPlayerGame v-if="!ended" :gameId="gameId" :uid="uid"/>
      <BCard v-if="ended && !showGameIdeas" :title="t('playerGame.ended')">
          <ListIdeasChain :gameId="gameId" :uid="uid" :decksWithIdeas="decksWithIdeas"/>
          <BCardText class="text-center" align-h="around">
            <BButton @click="validateVotes">{{t('playerGame.validateVotes')}}</BButton>
          </BCardText>
      </BCard>
      <BCard v-if="ended && showGameIdeas" :title="t('adminGame.allIdeas')">
          <ListIdeasChain :gameId="gameId" :uid="uid" :decksWithIdeas="decksWithIdeasSorted" disabled/>
          <!-- possible add change votes button -->
      </BCard>                
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