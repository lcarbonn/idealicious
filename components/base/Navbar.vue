<template>
  <b-navbar toggleable="lg" type="dark" variant="info" class="sticky-top">
    <b-navbar-brand href="/">
      <b-avatar variant="primary" rounded src="~/static/icon.png"></b-avatar>
      Idealicious
    </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item v-if="title">{{ title }}</b-nav-item>
      <b-nav-item v-if="game">{{$t('game')}} : {{ game.title }}</b-nav-item>
      <b-nav-item v-if="player">{{$t('player')}} : {{player.name}}</b-nav-item>
    </b-navbar-nav>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item
              v-show="isConnected && isAdmin"
                href="/admin">{{$t('navbarGameList')}}</b-nav-item>
        <b-nav-item
              v-show="isConnected && isAdmin"
                href="/admin/users">{{$t('navbarUserList')}}</b-nav-item>
          <b-nav-item
                href="/games">{{$t('navbarMyGameList')}}</b-nav-item>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em v-if="!userName"><b-icon icon="person"></b-icon></em>
            <em v-if="userName">{{userName}} <b-icon icon="person"></b-icon></em>
          </template>
          <b-dropdown-item
              v-show="userEmail"
              disabled
              >{{userEmail}}</b-dropdown-item>
          <b-dropdown-item
              v-show="!isConnected || isAnonymous"
              href="/login">{{$t('navbarLogin')}}</b-dropdown-item>
          <b-dropdown-item
              v-show="!isConnected || isAnonymous"
              href="/signup">{{$t('navbarSignup')}}</b-dropdown-item>
          <b-dropdown-item 
              v-show="isConnected  && !isAnonymous" 
              @click="logout()">{{$t('navbarLogout')}}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>

  </b-navbar>
</template>

<script>
import { BIcon, BIconHouse, BIconPerson } from 'bootstrap-vue'

export default {
  name: 'NavbarComp',
  components: {
    BIcon,
    BIconHouse,
    BIconPerson
  },

  computed: {
      title() {
        return this.$store.getters["navbar/title"];
      },
      player() {
        return this.$store.getters["players/player"];
      },
      game() {
        return this.$store.getters["games/game"];
      },
      isAnonymous() {
        return this.$store.getters['auth/isAnonymous'];
      },
      isAdmin() {
        return this.$store.getters['auth/isAdmin'];
      },
      isConnected() {
          return this.$store.getters['auth/isConnected'];
      },
      userEmail() {
        return this.$store.getters['auth/getUserEmail'];
      },
      userName() {
        return this.$store.getters['auth/getUserName'];
      }

  },
  methods: {
    logout() {
        this.$store.dispatch('auth/signOut').then(() => {
          this.$router.push('/')
        });
    }
  }
}
</script>
