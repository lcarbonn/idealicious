<!-- Main page -->
<template>
  <div>
    <PlayerGame v-if="!ended" 
      @addIdea="addIdea" 
      :player="player" 
      :game="game"
      :deck="deck"
      :lastIdea="lastIdea"
      :started="started"
      :ended="ended"
      :round="round"/>
    <div v-if="ended">
      <div>
        <h2>{{$t('pidGameEnded')}}</h2>
      </div>
      <div>
        <GameIdeasChain @loveIdea="loveIdea" :mode="'player'" :ideas="ideas"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerPage",

  created() {
    console.debug("pid:"+this.playerId)
    console.debug("game:"+this.gameId)
    this.$store.dispatch("games/listenGame", this.gameId);
    this.$store.dispatch("players/getPlayer", {
      gameId: this.gameId,
      playerId: this.playerId
      }).then(() => {
        let player = this.$store.getters["players/player"];
        this.$store.dispatch("decks/getDeck", {
          gameId: this.gameId,
          playerId: player.playerId
          })
      })
    this.$store.dispatch("players/listenNbPlayers", this.gameId);
  },
  
  computed: {
    playerId() {
      return this.$route.params.pid;
    },
    gameId() {
      return this.$route.params.game;
    },
    player() {
      return this.$store.getters["players/player"];
    },
    deck() {
      return this.$store.getters["decks/deck"];
    },
    game() {
      return this.$store.getters["games/game"];
    },
    lastIdea() {
      return this.$store.getters["decks/lastIdea"];
    },
    nbPlayers() {
      return this.$store.getters["players/nbPlayers"];
    },    
    started() {
      console.debug("game start:"+this.game)
      if(!this.game) return false
      console.debug("game started :"+this.game.started + ", ended:"+this.game.ended)
      return this.game.started && !this.game.ended
    },
    ended() {
      console.debug("game ended:"+this.game)
      if(!this.game) return false
      if(this.game.ended) this.$store.dispatch("ideas/listenIdeas", { 
        gameId : this.gameId,
        sortByLove : false
      });
      return this.game.ended
    },
    ideas() {
      return this.$store.getters["ideas/ideas"];
    },
    round() {
      if(this.player) return this.player.round
      return 0
    }
  },

  methods: {
    addIdea(idea) {
      const deck = this.deck
      const newIdea = {
        message: idea,
        playerId: this.player.id,
        loved:0,
        createTime: null,
      }
      if(idea!=null) {
        this.$store.dispatch("ideas/addIdea", 
        {
          gameId:this.gameId,
          deckId:deck.id,
          idea:newIdea
        }).then(() => {
          console.debug("newIdea added:" + newIdea.id+", deckId:"+deck.id);
        })
      }
        
      this.sendDeckToNextPlayer(deck)
    },
    sendDeckToNextPlayer(deck) {
          // send the deck to next player
          const deckToNextPlayer = {}
          Object.assign(deckToNextPlayer,deck)
          // get next deck id
          deckToNextPlayer.playerId = getNextPlayerId(deck.playerId, this.nbPlayers)
          this.$store.dispatch("decks/sendDeck", 
          {
            gameId:this.gameId,
            deck:deckToNextPlayer
          }).then(() => {
            this.listendToNewDeck()
            this.updatePlayerround()
          })
    },
    listendToNewDeck() {
      // the listen to deck availability and get last idea
      this.$store.dispatch("decks/listenDeck", {
        gameId: this.gameId,
        playerId: this.player.playerId
        })
    },
    updatePlayerround() {
      // then update player round
      const upPlayer = {}
      Object.assign(upPlayer,this.player)
      upPlayer.round++
      this.$store.dispatch("players/updatePlayerRound", 
      {
        gameId:this.gameId,
        player:upPlayer
      })
    },
    loveIdea(param) {
      if(param) {
        console.debug("loveIdea idea gameId:"+param.gameId +", deckid:"+param.deckId+", message"+ param.idea.message)
        this.$store.dispatch("ideas/loveIdea", 
        {
          gameId:this.gameId,
          deckId:param.deckId,
          idea:param.idea,
          isLoved:param.isLoved
        })
      }
    }
  },
};

export const getNextPlayerId = (playerId, nbPlayers) => {
  let maxId = nbPlayers-1
  console.debug("actualPlayer:"+playerId+", maxId="+maxId)
  let nextPlayer = playerId+1;
  if(nextPlayer>maxId) nextPlayer=0;
  console.debug("nextPlayer:"+nextPlayer+", maxId="+maxId)
  return nextPlayer
}

</script>
