<!-- Game page -->
<template>
  <div>
    <md-field v-if="lastIdea">
      <md-input disable v-model="lastIdea">{{ lastIdea }}</md-input>
    </md-field>
    <md-field>
      <label v-if="!lastIdea">Please, write the first idea here...</label>
      <label v-else>Please, write your idea here...</label>
      <md-input
        autofocus
        v-model="newIdea"
        @keydown.enter="addNewIdea"
      ></md-input>
    </md-field>
    <md-button class="md-primary" @click="addNewIdea"
      >Send to next player</md-button
    >
    <span class="md-primary">{{ size }}</span>
    <md-button class="md-primary" @click="endGame">End the game</md-button>
    <md-button class="md-primary" @click="resetGame">Reset game</md-button>
  </div>
</template>

<script>
export default {
  name: "GamePage",

  data: () => ({
    lastIdea: "",
    newIdea: "",
    size: "",
    ideas: [],
  }),

  methods: {
    addNewIdea() {
      if (this.newIdea != "") {
        this.ideas.push({ message: this.newIdea }),
          (this.lastIdea = this.newIdea),
          (this.newIdea = "");
        this.size = this.ideas.length;
      }
      //this.$store.dispatch("idea/saveIdea", this.newIdea)
    },
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
