<!-- Game page -->
<template>
  <div>
    <div>
      <span>Copy/Paste the link and share it to players</span>
    </div>
    <div>
      <NuxtLink v-if="game" :to="'/game/' + game.id" target="_blank">{{gamePath}}</NuxtLink>
    </div>
    <br/>
    <div>
      <span>Players in the game : {{nbPlayers}}</span>
    </div>
    <div>
      <md-button v-if="game" class="md-primary" :to="'/game/' + game.id" target="_blank">Join the game</md-button>
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
    }
  },
};
</script>
