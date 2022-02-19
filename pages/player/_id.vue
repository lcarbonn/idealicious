<!-- Main page -->
<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-small md-dense md-primary">
      <span class="md-title">
        <n-link to="/" class="md-title n-link">Idealicious</n-link>
      </span>
      <span class="md-title" v-if="player">Player : {{ player.name }}</span>
      <span class="md-title" v-if="game">- Game : {{game.title}}</span>
    </md-app-toolbar>
    <md-app-content>
      <PlayerGame @addIdea="addIdea" :lastIdea="lastIdea"/>
    </md-app-content>
  </md-app>
</template>

<script>
export const getNextDeck = (deckId, maxId) => {
  let nextDeck = deckId+1;
  if(nextDeck==maxId) nextDeck=0;
  console.debug("nextDeck:"+nextDeck+", nbPlayers="+maxId)
  return nextDeck
}

export default {
  name: "PlayerPage",

  data: () => ({
    // nbPlayers: 0
  }),

  mounted() {
    this.$store.dispatch("players/getPlayer", this.id);
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    player() {
      const player = this.$store.getters["players/player"];
      if(player) {
        this.$store.dispatch("players/getNbPlayers", player.gameId);
        this.$store.dispatch("games/getGame", player.gameId);
        let nextDeck = getNextDeck(player.playerId, this.nbPlayers);
        this.$store.dispatch("ideas/getLastIdea", nextDeck);
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
    }
  },

  methods: {
    addIdea(idea) {
      if (idea != null) {
        const newIdea = {
          message: idea,
          gameId: this.player.gameId,
          playerId: this.player.id,
          deckId:this.player.playerId          
        };
        if(this.lastIdea) {
          newIdea.deckId = this.lastIdea.deckId
        }
        this.$store.dispatch("ideas/addIdea", newIdea).then(() => {
          console.debug("newIdea:" + newIdea.id);
          let nextDeck = getNextDeck(newIdea.deckId, this.nbPlayers)
          this.$store.dispatch("ideas/getLastIdea", nextDeck)
        });
      }
    },
  },
};
</script>
