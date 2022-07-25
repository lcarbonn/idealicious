<template>
  <b-navbar type="dark" variant="info" class="sticky-top">
    <b-navbar-brand href="/">
      <b-icon icon="house"></b-icon>
    </b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item v-if="game">{{$t('game')}} : {{ game.title }}</b-nav-item>
      <b-nav-item v-if="player">{{$t('player')}} : {{player.name}}</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { BIcon, BIconHouse } from 'bootstrap-vue'

export default {
  name: 'NavbarComp',
  components: {
    BIcon,
    BIconHouse
  },

  computed: {
      player() {
        return this.$store.getters["players/player"];
      },
      game() {
        return this.$store.getters["games/game"];
      }
  }
}
</script>
