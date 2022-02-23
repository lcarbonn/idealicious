<!-- Game page -->
<template>
  <div>
    <div>
      <span>Copy the link and share it to players to join the game</span>
    </div>
    <div class="halign">
      <NuxtLink v-if="game" :to="'/game/' + game.id" target="_blank">{{gamePath}}</NuxtLink>
      <md-button class="md-icon-button" @click="copyToClipboard">
        <md-icon>content_copy</md-icon>
        <md-tooltip md-direction="top">Copy to clipboard</md-tooltip>
      </md-button>
    </div>
    <div>
      <span>Players in the game : {{nbPlayers}}</span>
    </div>
    <div>
      <md-button :disabled="this.started" class="md-primary" @click="startGame">Start the game</md-button>
      <md-button :disabled="!this.started" class="md-primary" @click="endGame">End the game</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminGameComp",

  props: {
    game: Object,
    nbPlayers: 0
  },

  data: () => ({
    // started: false,
  }),

  computed: {
    gamePath() {
      if(this.game) return window.location.origin + '/game/' + this.game.id
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
      } catch($e) {
        alert('Cannot copy');
      }
    }    
  },
};
</script>

<style lang="scss" scoped>
.halign {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>