<!-- Main page -->
<template>
  <div>
    <p>
    <GameAdminGame :game="game" :nbPlayers="nbPlayers" @startGame="startGame" @endGame="endGame" @resetLoves="resetLoves"/>
    </p>
    <p>
    <GameIdeasChain :mode="'game'" :ideas="ideas"/>
    </p>
  </div>
</template>

<script>
export default {
  name: "GamePage",

  created() {
    this.$store.dispatch("games/listenGame", this.id);
    this.$store.dispatch("ideas/getIdeas", this.id);
    this.$store.dispatch("players/listenNbPlayers", this.id);
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
      this.$store.dispatch("games/updateGameStatus", game)
      this.$store.dispatch("snackbar/setSnackbarMessage", { message: "Steady, Ready, Go!  ---  Ideas will appear there" });
    },
    endGame() {
      console.debug("endGame: gameId:" + this.game.id)
      const game = JSON.parse(JSON.stringify(this.game))
      game.started = false
      this.$store.dispatch("games/updateGameStatus", game)
      // this.$store.dispatch("ideas/getIdeas", this.game.id)
      this.$store.dispatch("snackbar/setSnackbarMessage", { message: "That was fun !!!" });
    },
    resetLoves() {
      console.debug("resetLoves: gameId:" + this.game.id)
      this.$store.dispatch("ideas/resetLoves", this.game.id)
      this.$store.dispatch("snackbar/setSnackbarMessage", { message: "Sorry for loves, reset done" });
    }
  },
};
</script>
