<!-- Main page -->
<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-small md-dense md-primary">
      <span class="md-title">
        <n-link to="/" class="md-title n-link">Idealicious</n-link>
      </span>
      <span class="md-title" v-if="game">Game theme : {{ game.title }}</span>
    </md-app-toolbar>
    <md-app-content>
      <JoinGame @joinGame="joinGame" />
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: "GamePage",

  mounted() {
    this.$store.dispatch("games/getGame", this.id);
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    game() {
      return this.$store.getters["games/game"];
    },
  },

  methods: {
    joinGame(player) {
      if (player != null) {
        let newPlayer = {
          name: player,
          gameId: this.game.id,
        };
        this.$store.dispatch("players/addPlayer", newPlayer).then(() => {
          newPlayer = this.$store.getters["players/player"];
          console.debug("newPlayer:" + newPlayer.id);
          this.$router.push("/player/" + newPlayer.id);
        });
      }
    },
  },
};
</script>
