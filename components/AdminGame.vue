<!-- Game page -->
<template>
  <div>
    <div>
      <span>Copy/Paste the link and share it to players</span>
    </div>
    <div>
      <nuxt-link v-if="game" :to="'/game/' + game.id">{{gamePath}}</nuxt-link>
    </div>
    <div>
      <md-button v-if="game" class="md-primary" :to="'/game/' + game.id">Join the game</md-button>
      <md-button class="md-primary" @click="endGame">End the game</md-button>
      <md-button class="md-primary" @click="resetGame">Reset game</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminGameComp",

  props: {
    game: Object,
  },

  computed: {
    gamePath() {
      if(this.game) return window.location.origin + '/game/' + this.game.id
      else return
    }
  },

  methods: {
    endGame() {
      this.$emit("endGame");
    },
    resetGame() {
      this.$emit("resetGame");
    },
  },
};
</script>
