<!-- Main page -->
<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-small md-dense md-primary">
      <span class="md-title">
        <n-link to="/" class="md-title n-link">Idealicious</n-link>
      </span>
      <span class="md-title" v-if="game">Game : {{game.title}}</span>
      <span class="md-title" v-if="player"> - Player : {{player.name}}</span>
    </md-app-toolbar>
    <md-app-content>
      <PlayerGame @addIdea="addIdea" :lastIdea="lastIdea" :round="round" :started="started"/>
      <BaseSnackbar/>
      <div class="md-layout md-alignment-bottom-center md-body-1">
        <span>Copyright © 2022 - Agilized in Toulouse, France</span>
      </div>
    </md-app-content>
  </md-app>
</template>

<script>

export default {
  name: "PlayerPage",

  data: () => ({
    round: 0,
    once:false
  }),

  created() {
    console.debug("pid mounted");
    this.$store.dispatch("players/getPlayer", this.id);
  },
  
  computed: {
    id() {
      return this.$route.params.pid;
    },
    player() {
      const player = this.$store.getters["players/player"];
      if(player && !this.once) {
        this.$store.dispatch("players/getNbPlayers", player.gameId);
        this.$store.dispatch("games/getGame", player.gameId);
        this.once = true;
      }
      return player;
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
      console.debug("game start:"+this.game.started)
      return this.game.started
    }
  },

  methods: {
    addIdea(idea) {
      if (idea != null) {
        this.round++;
        const newIdea = {
          message: idea,
          gameId: this.game.id,
          playerId: this.player.id,
          deckId:this.player.playerId,
          round:this.round
        };
        if(this.lastIdea) {
          newIdea.deckId = this.lastIdea.deckId
        }
        this.$store.dispatch("ideas/addIdea", newIdea).then(() => {
          console.debug("newIdea:" + newIdea.id+", deckId:"+newIdea.deckId);
          let nextDeck = getNextDeck(newIdea.deckId, this.nbPlayers-1)
          const param = {
            gameId : this.game.id,
            deckId : nextDeck,
            round : this.round
          }
          this.$store.dispatch("ideas/getLastIdea", param)
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

</script>
