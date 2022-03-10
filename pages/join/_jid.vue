<!-- Main page -->
<template>

  <div>
    <JoinGame v-if="!started" @joinGame="joinGame"/>
    <div v-else>
      <md-card class="md-layout md-alignment-top-center">
        <md-card-content>
          <h2>Game is started, to late to join</h2>
        </md-card-content>
      </md-card>
    </div>
  </div>

</template>

<script>
export default {
  name: "JoinPage",

  created() {
    this.$store.dispatch("games/listenGame", this.id);
  },
  
  computed: {
    id() {
      return this.$route.params.jid;
    },
    game() {
      return this.$store.getters["games/game"];
    },
    started() {
      if(this.game) return this.game.started
      return false
    }
  },

  methods: {
    joinGame(player) {
      if (player != null) {
        const newPlayer = {
          name: player,
          gameId: this.game.id,
          playerId: null,
          deckId:null,
          round:0
        };
        this.$store.dispatch("players/addPlayer", newPlayer).then(() => {
          const storePlayer = this.$store.getters["players/player"];
          console.debug("newPlayer:" + storePlayer.id);
          console.debug("newPlayer playerId:" + storePlayer.playerId);
          this.$store.dispatch("snackbar/setSnackbarMessage", { message: "Hey welcome " + player + " ;-)" });
          this.$router.push("/game/"+this.game.id+"/player/" + storePlayer.id);
        });
      }
    },
  },
};
</script>
