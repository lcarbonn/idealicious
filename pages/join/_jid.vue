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
    }
  },

  methods: {
    joinGame(player) {
      if (player != null) {
        const newPlayer = {
          name: player,
          playerId: null,
          round:0
        };
        const newDeck = {
          id:null,
          playerId:null
        }
        //create the player
        this.$store.dispatch("players/addPlayer", 
        {
          gameId:this.id,
          player:newPlayer
        }).then(() => {
          const storePlayer = this.$store.getters["players/player"];
          newDeck.id = storePlayer.playerId
          newDeck.playerId = storePlayer.playerId
          // then create his deck
          this.$store.dispatch("decks/addDeck", {gameId:this.id, deck:newDeck})
          console.debug("newPlayer playerId:" + storePlayer.playerId);
          this.$store.dispatch("snackbar/setSnackbarMessage", { message: this.$i18n.t('jidWelcomePlayer', {player: player}) });
          this.$router.push("/game/"+this.id+"/player/" + storePlayer.id);
        });
      }
    },
  },
};
</script>
