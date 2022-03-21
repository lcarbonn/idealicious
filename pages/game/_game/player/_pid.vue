<!-- Main page -->
<template>
  <div>
    <PlayerGame v-if="!ended" 
      @addIdea="addIdea" 
      :player="player" 
      :game="game"
      :deck="deck"
      :lastIdea="lastIdea"
      :started="started"
      :ended="ended"
      :round="round"/>
    <div v-if="ended">
      <div>
        <h2 class="md-primary">{{$t('pidGameEnded')}}</h2>
      </div>
      <div>
        <GameIdeasChain @loveIdea="loveIdea" :mode="'player'" :ideas="ideas"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerPage",

  data: () => ({
  }),

  created() {
    console.debug("pid:"+this.playerId)
    console.debug("game:"+this.gameId)
    this.$store.dispatch("games/listenGame", this.gameId);
    this.$store.dispatch("players/getPlayer", {
      playerId: this.playerId,
      gameId: this.gameId
      }).then(() => {
        let player = this.$store.getters["players/player"];
        this.$store.dispatch("decks/getDeck", {
          playerId: player.playerId,
          gameId: this.gameId
          })
      })
    this.$store.dispatch("players/listenNbPlayers", this.gameId);
  },
  
  computed: {
    playerId() {
      return this.$route.params.pid;
    },
    gameId() {
      return this.$route.params.game;
    },
    player() {
      return this.$store.getters["players/player"];
    },
    deck() {
      return this.$store.getters["decks/deck"];
    },
    game() {
      return this.$store.getters["games/game"];
    },
    lastIdea() {
      return this.$store.getters["decks/lastIdea"];
    },
    nbPlayers() {
      return this.$store.getters["players/nbPlayers"];
    },    
    started() {
      console.debug("game start:"+this.game)
      if(!this.game) return false
      console.debug("game started :"+this.game.started + ", ended:"+this.game.ended)
      return this.game.started && !this.game.ended
    },
    ended() {
      console.debug("game ended:"+this.game)
      if(!this.game) return false
      if(this.game.ended) this.$store.dispatch("ideas/listenIdeas", this.game.id);
      return this.game.ended
    },
    ideas() {
      return this.$store.getters["ideas/ideas"];
    },
    round() {
      if(this.player) return this.player.round
      return 0
    }
  },

  methods: {
    addIdea(idea) {
      if (idea != null) {
        const deck = this.deck
        const newIdea = {
          message: idea,
          gameId: this.game.id,
          playerId: this.player.id,
          loved:0,
          createTime: null,
          deckId:deck.id
        }
        this.$store.dispatch("ideas/addIdea", newIdea).then(() => {
          console.debug("newIdea added:" + newIdea.id+", deckId:"+deck.id);
          // then send the deck to next player
          // get next deck id
          const deckToNextPlayer = JSON.parse(JSON.stringify(deck))
          deckToNextPlayer.playerId = getNextPlayerId(deck.playerId, this.nbPlayers)
          this.$store.dispatch("decks/sendDeck", deckToNextPlayer).then(() => {
            // the listen to deck availability and get last idea
            this.$store.dispatch("decks/listenDeck", {
              playerId: this.player.playerId,
              gameId: this.gameId
              })
            // then update player round
            const upPlayer = JSON.parse(JSON.stringify(this.player))
            upPlayer.round++
            this.$store.dispatch("players/updatePlayerRound", upPlayer)
          })
        })
      }
    },
    loveIdea(param) {
      if(param) {
        console.debug("loveIdea idea:"+param.idea.message)
        this.$store.dispatch("ideas/loveIdea", param)
      }
    }
  },
};

export const getNextPlayerId = (playerId, nbPlayers) => {
  let maxId = nbPlayers-1
  console.debug("actualPlayer:"+playerId+", maxId="+maxId)
  let nextPlayer = playerId+1;
  if(nextPlayer>maxId) nextPlayer=0;
  console.debug("nextPlayer:"+nextPlayer+", maxId="+maxId)
  return nextPlayer
}

</script>
