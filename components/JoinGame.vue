<!-- Game page -->
<template>
  <div>
    <md-field>
      <label>Enter your name</label>
      <md-input
        autofocus
        v-model="playerName"
        @keydown.enter="joinGame"
        maxlength="30"
      ></md-input>
    </md-field>
    <md-button class="md-primary" @click="joinGame">Join the game</md-button>
  </div>
</template>

<script>
export default {
  name: "JoinGameComp",

  data: () => ({
    playerName: "",
  }),

  methods: {
    joinGame() {
      if (this.playerName != "") {
        console.debug("Player Name:" + this.playerName),
          this.$emit("joinGame", this.playerName);
      }
    },
  },
};
</script>
