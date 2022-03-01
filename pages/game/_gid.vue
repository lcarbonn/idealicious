<!-- Main page -->
<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-small md-dense md-primary">
      <span class="md-title">
        <n-link to="/" class="md-title n-link">Idealicious</n-link>
      </span>
      <span class="md-title" v-if="game">Game : {{game.title}}</span>
    </md-app-toolbar>
    <md-app-content>
      <GameAdminGame :game="game" :nbPlayers="nbPlayers" @startGame="startGame" @endGame="endGame"/>
      <GameIdeasChain :ideas="ideas"/>
      <BaseSnackbar/>
      <div class="md-layout md-alignment-bottom-center md-body-1">
        <span>Copyright © 2022 - Agilized in Toulouse, France</span>
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: "GamePage",

  created() {
    this.$store.dispatch("games/getGame", this.id);
    this.$store.dispatch("ideas/getIdeas", this.id);
    this.$store.dispatch("players/getNbPlayers", this.id);
  },

computed: {
    id() {
      return this.$route.params.gid;
    },
    game() {
      return this.$store.getters["games/game"];
    },
    ideas() {
      return this.$store.getters["ideas/ideas"];
    },
    nbPlayers() {
      return this.$store.getters["players/nbPlayers"];
    }

  },
  methods: {
    startGame() {
      console.debug("startGame: gameId:" + this.game.id)
      const game = JSON.parse(JSON.stringify(this.game))
      game.started = true
      this.$store.dispatch("games/startGame", game)
      this.$store.dispatch("snackbar/setSnackbarMessage", { message: "Steady, Ready, Go!  ---  Ideas will appear there" });
    },
    endGame() {
      console.debug("endGame: gameId:" + this.game.id)
      const game = JSON.parse(JSON.stringify(this.game))
      game.started = false
      this.$store.dispatch("games/startGame", game)
      this.$store.dispatch("ideas/getIdeas", this.game.id)
      this.$store.dispatch("snackbar/setSnackbarMessage", { message: "That was fun !!!" });
    }
  },
};
</script>
