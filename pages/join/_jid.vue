<!-- Main page -->
<template>

  <div>
    <JoinGame @joinGame="joinGame"/>
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
          round:0
        };
        const newDeck = {
          id:null,
          gameId: this.game.id,
          playerId:null
        }
        //create the player
        this.$store.dispatch("players/addPlayer", newPlayer).then(() => {
          const storePlayer = this.$store.getters["players/player"];
          newDeck.id = storePlayer.playerId
          newDeck.playerId = storePlayer.playerId
          // then create his deck
          this.$store.dispatch("decks/addDeck", newDeck)
          console.debug("newPlayer playerId:" + storePlayer.playerId);
          this.$store.dispatch("snackbar/setSnackbarMessage", { message: this.$i18n.t('jidWelcomePlayer', {player: player}) });
          this.$router.push("/game/"+this.game.id+"/player/" + storePlayer.id);
        });
      }
    },
  },
};
</script>
