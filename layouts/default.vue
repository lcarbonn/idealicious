<!-- Main page -->
<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-small md-dense md-primary md-layout md-alignment-top-center">
      <span class="md-title">
        <n-link to="/" class="md-title n-link">Idealicious</n-link>
      </span>
      <span class="md-title" v-if="game">Game : {{game.title}}</span>
      <span class="md-title" v-if="player"> - Player : {{player.name}}</span>
    </md-app-toolbar>
    <md-app-content>
      <nuxt/>
      <div class="md-layout md-alignment-bottom-center md-body-1">
        <span>Copyright © 2022 - Agilized in Toulouse, France</span>
      </div>
      <BaseSnackbar/>
    </md-app-content>
  </md-app>
</template>

<script>

export default {
  name: "DefaultLayout",
  
  computed: {
    player() {
      return this.$store.getters["players/player"];
    },
    game() {
      return this.$store.getters["games/game"];
    }
  }
};
</script>
