<!-- Main page -->
<template>
  <div>
    <PlayerGame v-if="!ended" @addIdea="addIdea" :player="player" :game="game" :lastIdea="lastIdea" :round="round" :started="started"/>
    <div v-if="ended">
      <div>
        <h2 class="md-primary">Game as ended</h2>
      </div>
      <div>
        <GameIdeasChain :ideas="ideas"/>
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
    console.debug("pid:"+this.id)
    console.debug("game:"+this.gameId)
    // for init and reloaded page
    this.$store.dispatch("players/getNbPlayers", this.gameId);
    this.$store.dispatch("players/getSyncPlayer", {
      playerId: this.id,
      gameId: this.gameId
      }).then(() => {
        let player = this.$store.getters["players/player"];
        let nbPlayers =  this.$store.getters["players/nbPlayers"];
        if(player) {
          let nextDeck = getNextDeck(player.deckId, nbPlayers)
          const param = {
            gameId : this.gameId,
            deckId : nextDeck,
            round : player.round
          }
          //listen to next idea
          this.$store.dispatch("ideas/listenLastIdea", param)
        }
      })
    // for further listening
    this.$store.dispatch("games/listenGame", this.gameId);
    this.$store.dispatch("players/listenNbPlayers", this.gameId);
  },
  
  computed: {
    id() {
      return this.$route.params.pid;
    },
    gameId() {
      return this.$route.params.game;
    },
    player() {
      return this.$store.getters["players/player"];
    },
    round() {
      if(!this.player) return 0
      return this.player.round 
    },
    game() {
      return this.$store.getters["games/game"];
    },
    lastIdea() {
      return this.$store.getters["ideas/lastIdea"];
    },
    nbPlayers() {
      return this.$store.getters["players/nbPlayers"];
    },    
    started() {
      console.debug("game start:"+this.game)
      if(!this.game) return false
      console.debug("game started :"+this.game.started)
      return this.game.started
    },
    ended() {
      console.debug("game ended:"+this.game)
      if(!this.game) return false
      console.debug("game ended :"+!this.game.started)
      if(!this.game.started && this.round!=0) this.$store.dispatch("ideas/getIdeas", this.game.id);
      return !this.game.started && this.round!=0
    },
    ideas() {
      return this.$store.getters["ideas/ideas"];
    }
  },

  methods: {
    addIdea(idea) {
      if (idea != null) {
        let round = this.round;
        round++;
        const newIdea = {
          message: idea,
          gameId: this.game.id,
          playerId: this.player.id,
          deckId:this.player.deckId,
          round:round
        };
        if(this.lastIdea) {
          newIdea.deckId = this.lastIdea.deckId
        }
        this.$store.dispatch("ideas/addIdea", newIdea).then(() => {
          console.debug("newIdea added:" + newIdea.id+", deckId:"+newIdea.deckId+", round:"+newIdea.round);
        })
          //update round player
          const upPlayer = JSON.parse(JSON.stringify(this.player))
          upPlayer.round = round
          upPlayer.deckId = newIdea.deckId
          this.$store.dispatch("players/updatePlayerRound", upPlayer)
          // get next deck id
          let nextDeck = getNextDeck(newIdea.deckId, this.nbPlayers)
          const param = {
            gameId : this.game.id,
            deckId : nextDeck,
            round : round
          }
          //listen to next idea
          this.$store.dispatch("ideas/listenLastIdea", param)
      }
    },
  },
};

export const getNextDeck = (deckId, maxId) => {
  console.debug("actualDeck:"+deckId+", maxId="+maxId)
  let nextDeck = deckId-1;
  if(nextDeck<0) nextDeck=maxId-1;
  if(maxId==0) nextDeck=0;
  console.debug("nextDeck:"+nextDeck+", maxId="+maxId)
  return nextDeck
}

</script>
