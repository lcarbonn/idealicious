<!-- Game page -->
<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-form-group :label="$t('addGameLabel')" label-for="gameTitle" description="" class="mb-0">
            <b-form-input id="gameTitle" v-model="gameTitle" :state="gameState" @keydown.enter="addNewGame"
              maxlength="140" trim class="mb-0"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="12" md="auto">
          <b-button id="addButton" variant="info" @click="addNewGame">
            <b-icon icon="plus-circle-fill"></b-icon>
          </b-button>
          <b-tooltip target="addButton" triggers="hover">{{$t('addGameButton')}}</b-tooltip>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { BIcon, BIconPlusCircleFill } from 'bootstrap-vue'

export default {
  name: "AddGameComp",

  components: {
    BIcon,
    BIconPlusCircleFill
  },

  data: () => ({
    gameTitle: "",
  }),

  computed: {
    gameState() {
      return (this.gameTitle != null && this.gameTitle != "") ? true : false
    },
  },

  methods: {
    addNewGame() {
      if (this.gameTitle != "") {
        this.$emit("addGame", {
          title: this.gameTitle,
          started:false
        });
      }
    },
  },
};
</script>
