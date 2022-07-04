<!-- Main page -->
<template>
  <div class="d-flex flex-column justify-content-between min-vh-100">
    <div>
      <BaseNavbar></BaseNavbar>
      <b-container>
        <b-row>
          <b-col>
            <nuxt />
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="d-flex flex-column justify-content-end">
      <BaseSnackbar></BaseSnackbar>
      <BaseFooter :appVersion="appVersion"></BaseFooter>
    </div>
  </div>
</template>

<script>

import authenticated from '~/mixins/authenticated.js';
import { version } from '../package.json';

export default {
  name: "DefaultLayout",
  // anonymous login
  mixins: [authenticated],

  data: () => ({
    appVersion: version
  }),

  created() {
    console.debug("appVersion:"+this.appVersion)
  },
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
