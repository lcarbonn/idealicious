<!-- Game page -->
<template>
  <div class="md-layout md-alignment-top-center">
    <md-field>
      <label>{{$t('joinGameLabel')}}</label>
      <md-input
        autofocus
        v-model="playerName"
        @keydown.enter="joinGame"
        maxlength="30"
      ></md-input>
    </md-field>
    <md-button class="md-accent md-icon-button md-raised" @click="joinGame">
      <md-icon>login</md-icon>
      <md-tooltip md-direction="top">{{$t('joinGameButton')}}</md-tooltip>
    </md-button>
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
