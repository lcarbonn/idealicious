<!-- Game page -->
<template>
  <div class="md-layout md-alignment-top-center">
    <md-field>
      <label>Enter the game challenge</label>
      <md-input
        autofocus
        v-model="gameTitle"
        @keydown.enter="addNewGame"
        maxlength="140"
      ></md-input>
    </md-field>
    <md-button class="md-accent md-icon-button md-fab" @click="addNewGame">
      <md-icon>add</md-icon>
      <md-tooltip md-direction="top">Add new game</md-tooltip>
    </md-button>
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
          started:false
        });
      }
    },
  },
};
</script>
