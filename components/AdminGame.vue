<!-- Game page -->
<template>
  <div>
    <div>
      <nuxt-link v-if="game" :to="'/game/' + game.id"
        >Join the Game (Copy/Paste the link to players)</nuxt-link
      >
    </div>
    <div>
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

  methods: {
    endGame() {
      console.log(this.ideas), this.$emit("endGame", this.ideas);
    },
    resetGame() {
      (this.ideas = []), (this.lastIdea = ""), (this.newIdea = "");
      this.size = "";
      this.$emit("resetGame");
    },
  },
};
</script>
