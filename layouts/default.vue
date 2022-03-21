<!-- Main page -->
<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-small md-dense md-primary md-layout md-alignment-top-center">
      <span class="md-title">
        <n-link :to="localePath('/')" class="md-title n-link">Idealicious</n-link>
      </span>
      <span class="md-title" v-if="game">{{$t('game')}} : {{game.title}}</span>
      <span class="md-title" v-if="player"> - {{$t('player')}} : {{player.name}}</span>
    </md-app-toolbar>
    <md-app-content>
      <nuxt/>
      <div class="md-layout md-alignment-bottom-center md-body-1">
        <p><span>{{$t('copyright')}}</span></p>
      </div>
      <BaseSnackbar/>
    </md-app-content>
  </md-app>
</template>

<script>

import authenticated from '~/mixins/authenticated.js';

export default {
  name: "DefaultLayout",
  // anonymous login
  mixins: [authenticated],

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
