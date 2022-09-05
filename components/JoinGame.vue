<!-- Join page -->
<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-form-group :label="$t('joinGameLabel')" label-for="joinGame" description="" class="mb-0">
            <b-form-input autofocus id="joinGame" v-model="playerName" :state="nameState" @keydown.enter="joinGame"
              maxlength="30" trim class="mb-0"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="auto">
          <b-button id="join" variant="secondary" @click="joinGame">
            <b-icon icon="box-arrow-in-right"></b-icon>
          </b-button>
          <b-tooltip target="join" triggers="hover">{{ $t('joinGameButton')}}</b-tooltip>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { BIcon, BIconBoxArrowInRight } from 'bootstrap-vue'

export default {
  name: "JoinGameComp",

  components: {
    BIcon,
    BIconBoxArrowInRight
  },

  data: () => ({
    playerName: "",
  }),

  computed: {
    nameState() {
      return (this.playerName != null && this.playerName != "") ? true : false
    },
  },

  methods: {
    joinGame() {
      if (this.playerName != "") {
        console.debug("Player Name:" + this.playerName),
          this.$emit("joinGame", this.playerName);
      }
    },
  },
};
</script>
