<!-- Main page -->
<template>
  <div>
    <p>
      <GameAdminGame :game="game" :nbPlayers="nbPlayers" 
        @startGame="startGame"
        @endGame="endGame"
        @resetLoves="resetLoves"
        @exportIdeas="exportIdeas"/>
    </p>
    <p>
      <GameIdeasChain :mode="'game'" :ideas="ideas"/>
    </p>
  </div>
</template>

<script>
import { exportCSVFile } from "/scripts/common.js";


export default {
  name: "GamePage",

  created() {
    this.$store.dispatch("games/listenGame", this.id);
    this.$store.dispatch("ideas/listenIdeas", { 
        gameId : this.id,
        sortByLove : true
      });
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
      game.ended = false
      this.$store.dispatch("games/updateGameStatus", game)
      this.$store.dispatch("snackbar/setSnackbarMessage", { message: this.$i18n.t('gidStartGame') });
    },
    endGame() {
      console.debug("endGame: gameId:" + this.game.id)
      const game = JSON.parse(JSON.stringify(this.game))
      game.ended = true
      this.$store.dispatch("games/updateGameStatus", game)
      // this.$store.dispatch("ideas/getIdeas", this.game.id)
      this.$store.dispatch("snackbar/setSnackbarMessage", { message: this.$i18n.t('gidEndGame') });
    },
    resetLoves() {
      console.debug("resetLoves: gameId:" + this.game.id)
      this.$store.dispatch("ideas/resetLoves", this.game.id)
      this.$store.dispatch("snackbar/setSnackbarMessage", { message: this.$i18n.t('gidResetLoves') });
    },
    exportIdeas() {
      const separator = this.$i18n.t('exportSeparator')
      exportCSVFile(this.ideas, "Idealicious-ideas-"+this.game.id, separator)
    }
  },
};
</script>
