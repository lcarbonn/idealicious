<!-- Game page -->
<template>
  <div>
    <md-card>
      <md-card-content>
        <div class="md-layout md-alignment-top-center">
          <span>Copy the link and share it to players to join the game</span>
        </div>
        <div class="md-layout md-alignment-center-center">
          <NuxtLink class="md-accent" v-if="game" :to="'/join/' + game.id" target="_blank">{{gamePath}}</NuxtLink>
          <md-button class="md-icon-button md-accent" @click="copyToClipboard">
            <md-icon>content_copy</md-icon>
            <md-tooltip md-direction="top">Copy to clipboard</md-tooltip>
          </md-button>
        </div>
        <div class="md-layout md-alignment-top-center">
          <span>Players in the game : {{nbPlayers}}</span>
        </div>
      </md-card-content>
      <md-card-actions class="md-layout md-alignment-top-center">
      <md-button :disabled="this.started" class="md-primary md-icon-button" @click="startGame">
        <md-icon>start</md-icon>
        <md-tooltip md-direction="top">Start the game</md-tooltip>
      </md-button>
      <md-button :disabled="!this.started" class="md-primary md-icon-button" @click="endGame">
        <md-icon>stop</md-icon>
        <md-tooltip md-direction="top">End the game</md-tooltip>
      </md-button>
      <md-button :disabled="this.started" class="md-primary md-icon-button" @click="resetLoves">
        <md-icon>restart_alt</md-icon>
        <md-tooltip md-direction="top">Reset loves</md-tooltip>
      </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "AdminGameComp",

  props: {
    game: Object,
    nbPlayers: 0
  },

  computed: {
    gamePath() {
      if(this.game) return window.location.origin + '/join/' + this.game.id
      else return ""
    },
    started() {
      console.debug("game"+this.game)
      if(this.game) return this.game.started
      return false
    }
  },

  methods: {
    startGame() {
      this.$emit("startGame")
    },
    endGame() {
      this.$emit("endGame")
    },
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.gamePath);
        this.$store.dispatch("snackbar/setSnackbarMessage", { message: "Copy to clipboard done" });
      } catch($e) {
        this.$store.dispatch("snackbar/setSnackbarMessage", { message: "Copy to clipboard error" });
      }
    },
    resetLoves() {
      this.$emit("resetLoves")
    }
  },
};
</script>
