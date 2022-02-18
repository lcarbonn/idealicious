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
      <AdminGame :game="game" />
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: "AdminGamePage",

  mounted() {
    this.$store.dispatch("games/getGame", this.id);
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
    game() {
      const game = this.$store.getters["games/game"];
      console.debug("admin game:" + game);
      return game;
    },
  },
  methods: {},
};
</script>
