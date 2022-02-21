<!-- Main page -->
<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-small md-dense md-primary">
      <span class="md-title">
        <n-link to="/" class="md-title n-link">Idealicious</n-link>
      </span>
      <span class="md-title" v-if="game">Game theme : {{ game.title }}</span>
    </md-app-toolbar>
    <md-app-content>
      <AdminGame :game="game" @endGame="endGame"/>
      <IdeasChain :ideas="ideas"/>
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: "AdminGamePage",

  mounted() {
    this.$store.dispatch("games/getGame", this.id);
    this.$store.dispatch("ideas/getIdeas", this.id)
  },

computed: {
    id() {
      return this.$route.params.aid;
    },
    game() {
      return this.$store.getters["games/game"];
    },
    ideas() {
      return this.$store.getters["ideas/ideas"];
    },

  },
  methods: {
    endGame() {
      console.debug("endGame: gameId:" + this.game.id);
      this.$store.dispatch("ideas/getIdeas", this.game.id)
    }
  },
};
</script>
