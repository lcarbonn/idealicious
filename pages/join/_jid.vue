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
    //if user connected, get direct to join
    const userName = this.$store.getters['auth/getUserName']
    if(userName) {
      this.joinGame(userName)
    }
  },
  
  computed: {
    gameId() {
      return this.$route.params.jid;
    }
  },

  methods: {
    joinGame(playerName) {
      if (playerName != null) {
        const newPlayer = {
          uid: this.$store.getters['auth/getUserUid'],
          name: playerName,
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
          gameId:this.gameId,
          player:newPlayer
        }).then(() => {
          const storePlayer = this.$store.getters["players/player"];
          newDeck.id = storePlayer.playerId
          newDeck.playerId = storePlayer.playerId
          // then create his deck
          this.$store.dispatch("decks/addDeck", {gameId:this.gameId, deck:newDeck})
          console.debug("newPlayer playerId:" + storePlayer.playerId);
          this.$store.dispatch("snackbar/setSnackbarMessage", { message: this.$i18n.t('jidWelcomePlayer', {player: playerName}) });
          this.$router.push("/game/"+this.gameId+"/player/" + storePlayer.uid);
        });
      }
    },
  },
};
</script>
