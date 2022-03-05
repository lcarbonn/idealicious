<!-- Main page -->
<template>
  <div>
    <PlayerGame @addIdea="addIdea" :player="player" :game="game" :lastIdea="lastIdea" :round="round" :started="started"/>
    <GameIdeasChain v-if="ended" :ideas="ideas"/>
  </div>
</template>

<script>
export default {
  name: "PlayerPage",

  data: () => ({
    // round: 0,
  }),

  created() {
    console.debug("pid:"+this.id)
    console.debug("game:"+this.gameId)
    this.$store.dispatch("players/getPlayer", {
      playerId: this.id,
      gameId: this.gameId
      })
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
      let player = this.$store.getters["players/player"];
      if(player) {
      let nextDeck = getPreviousDeck(player.deckId, this.nbPlayers)
      const param = {
        gameId : this.gameId,
        deckId : nextDeck,
        round : player.round
      }
      //listen to next idea
      this.$store.dispatch("ideas/listenLastIdea", param)
      }
      return player
    },
    round() {
      if(!this.player) return 0
      return this.player.round 
    },
    game() {
      return this.$store.getters["games/game"];
    },
    lastIdea() {
      const lastIdea = this.$store.getters["ideas/lastIdea"];
      if(lastIdea) console.debug("lastIdea:"+lastIdea.message);
      return lastIdea;
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
          console.debug("newIdea:" + newIdea.id+", deckId:"+newIdea.deckId);
          //update round player
          const upPlayer = JSON.parse(JSON.stringify(this.player))
          upPlayer.round = round
          upPlayer.deckId = newIdea.deckId
          this.$store.dispatch("players/updatePlayerRound", upPlayer)
          // get next deck id
          let nextDeck = getNextDeck(newIdea.deckId, this.nbPlayers-1)
          const param = {
            gameId : this.game.id,
            deckId : nextDeck,
            round : round
          }
          //listen to next idea
          this.$store.dispatch("ideas/listenLastIdea", param)
        });
      }
    },
  },
};

export const getNextDeck = (deckId, maxId) => {
  console.debug("actualDeck:"+deckId+", maxId="+maxId)
  let nextDeck = deckId-1;
  if(nextDeck<0) nextDeck=maxId;
  console.debug("nextDeck:"+nextDeck+", maxId="+maxId)
  return nextDeck
}

export const getPreviousDeck = (deckId, maxId) => {
  console.debug("actualDeck:"+deckId+", maxId="+maxId)
  let previousDeck = deckId+1;
  if(previousDeck==maxId) previousDeck=0;
  console.debug("previousDeck:"+previousDeck+", maxId="+maxId)
  return previousDeck
}

</script>
