<!-- Game page -->
<template>
  <div>
    <md-field>
      <label>Enter the game theme</label>
      <md-input
        autofocus
        v-model="gameTitle"
        @keydown.enter="addNewGame"
      ></md-input>
    </md-field>
    <md-button class="md-primary" @click="addNewGame">Create the game</md-button>
  </div>
</template>

<script>
export default {
  name: "AddGameComp",

  data: () => ({
    gameTitle: "",
  }),

  methods: {
    addNewGame() {
      if (this.gameTitle != "") {
        this.$emit("addGame", {
          title: this.gameTitle,
        });
      }
    },
  },
};
</script>
