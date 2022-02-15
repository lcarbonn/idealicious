<!-- Main page -->
<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-small md-dense md-primary">
      <span class="md-title">Idealicious</span>
      <span class="md-title">Player {{ player }}</span>
    </md-app-toolbar>
    <md-app-drawer :md-active.sync="menuVisible"> </md-app-drawer>
    <md-app-content>
      <PlayerGame
        v-show="isGamePlay"
        @endGame="endGame"
        @resetGame="resetGame"
      />
      <IdeasChain v-show="isEndGame" @back2Game="back2Game" :ideas="ideas" />
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: "MainPage",
  data: () => ({
    player: 0,
    ideas: [],
    menuVisible: false,
    isGamePlay: true,
    isEndGame: false,
  }),

  methods: {
    endGame(ideas) {
      if (ideas.length != 0) {
        this.isGamePlay = false;
        this.isEndGame = true;
        console.log(ideas);
        this.ideas = ideas;
      }
    },
    back2Game() {
      this.isGamePlay = true;
      this.isEndGame = false;
      this.ideas = [];
    },
    resetGame() {
      this.isGamePlay = true;
      this.isEndGame = false;
      this.ideas = [];
    },
  },
};
</script>
