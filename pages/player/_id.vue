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
      <PlayerGame @addIdea="addIdea" />
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: "PlayerPage",

  data: () => ({
    ideas: [],
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
      if(player) this.$store.dispatch("games/getGame", player.gameId);
      return player
    },
    game() {
      return this.$store.getters["games/game"];
    }
  },

  methods: {
    addIdea(idea) {
      if (idea != null) {
        let newIdea = {
          message: idea,
          gameId: this.player.gameId,
          playerId: this.player.id,
        };
        this.$store.dispatch("ideas/addIdea", newIdea).then(() => {
          const lastIdea = this.$store.getters["ideas/lastIdea"];
          console.debug("newIdea:" + newIdea.id);
          console.debug("lastIdea:" + lastIdea.id);
        });
      }
    },
  },
};
</script>
