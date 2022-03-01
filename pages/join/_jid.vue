<!-- Main page -->
<template>

  <JoinGame @joinGame="joinGame" />

</template>

<script>
export default {
  name: "JoinPage",

  created() {
    this.$store.dispatch("games/getGame", this.id);
  },
  
  computed: {
    id() {
      return this.$route.params.jid;
    },
    game() {
      return this.$store.getters["games/game"];
    },
  },

  methods: {
    joinGame(player) {
      if (player != null) {
        const newPlayer = {
          name: player,
          gameId: this.game.id,
          playerId: null
        };
        this.$store.dispatch("players/addPlayer", newPlayer).then(() => {
          const storePlayer = this.$store.getters["players/player"];
          console.debug("newPlayer:" + storePlayer.id);
          console.debug("newPlayer playerId:" + storePlayer.playerId);
          this.$store.dispatch("snackbar/setSnackbarMessage", { message: "Hey welcome " + player + " ;-)" });
          this.$router.push("/player/" + storePlayer.id);
        });
      }
    },
  },
};
</script>
