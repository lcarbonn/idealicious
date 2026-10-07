<template>
    <div>
      <!-- FOR DEBUG
        <p v-if="player">
        <span> playerId :{{ player.playerId }}</span>
        <span> round :{{ player.round }}</span>
        <span> nbplayers: {{ nbPlayers }}</span>
        <span> deck :{{ deck?.id??"null" }}</span>
        <span> nextPlayerId: {{ getNextPlayerId(player.playerId, nbPlayers) }}</span>
        <span> prevPlayerId: {{ getPreviousPlayerId(player.playerId, nbPlayers) }}</span>
      </p> -->
      <!-- Card for game not yet started -->
      <BCard v-if="deck && !started && !ended" :class="getColor(deck.id)" text-variant="dark">
        <BCardText>
          <span >{{t('playerGame.waitingStart')}}</span>
        </BCardText>
      </BCard>
      <GamePlayerGame v-if="player && started && !ended" 
        :round="player.round" 
        :lastIdea="(lastIdea as Idea)" 
        :deckId="deck?.id"
        :previousPlayerName="previousPlayerName"
        @addNewIdea="addNewIdea"/>
    </div>
  </template>

<script setup lang="ts">

    // const
    const { t } = useI18n()

  // global refs
    const game = useGame()
    const player = usePlayer()
    const deck = useDeck()
    const nbPlayers = useGameNbOfPlayers()
    const players = useGamePlayers()
    const lastIdea = useLastIdea()

    const props = defineProps({
      gameId: {
          type: String,
          default: null
      },
      uid: {
        type: String,
        default: null
      }
    })

    onMounted(() => {
      //listening the game
      listenGame(props.gameId)
      //listen to the nb of players for sending deck to next player
      listenGamePlayers(props.gameId)
      //get the player
      getGamePlayer(props.gameId, props.uid)
      .then((player) => {
          //find the deck
          if(player) listenDeck(props.gameId, player.playerId)
      })
    })

    // computed
    const started = computed(() => {
        return game?.value?.isStarted()
    })

    const ended = computed(() => {
      return game?.value?.isEnded()
    })

    const previousPlayerName = computed(() => {
      if(player.value && players.value) return getPreviousPlayerName(player.value.playerId, players.value)
    })


  // methods
  const addNewIdea = (message:string) => {
      console.log("add new idea : " + message + ", player:"+player.value?.name + ", deck:"+deck.value?.id)
      if(deck.value && player.value) {
        if(message) {
          const newIdea = new Idea()
          newIdea.message = message.trim()
          newIdea.loved=0
          newIdea.playerId = player.value.uid
          addIdea(props.gameId, deck.value.id, newIdea)
        }
      sendDeckToNextPlayer(props.gameId, deck.value, player.value, nbPlayers.value)
    }
  }

</script>