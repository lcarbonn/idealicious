<!-- Game page -->
<template>
  <div>
    <div class="md-layout md-alignment-top-center">
      <md-field v-if="started && round!=0">
        <label v-if="lastIdea && lastIdea.message!=''">Previous player's idea...</label>
        <label v-else-if="lastIdea && lastIdea.message==''">Previous player's idea skiped</label>
        <label v-else>Waiting for previous player's idea...</label>
        <md-input v-if="lastIdea" disabled v-model="lastIdea.message">{{ lastIdea.message }}</md-input>
      </md-field>
      <md-field>
        <label v-if="!started && round==0">Please, wait for the game to start...</label>
        <label v-else-if="started && round==0">Game started, write your first idea here...</label>
        <label v-else-if="!started && round!=0">Game as ended</label>
        <label v-else>Then, write your new idea here...</label>
        <md-input :disabled="disable"
          autofocus
          v-model="newIdea"
          @keydown.enter="addNewIdea"
          maxlength="140">
        </md-input>
      </md-field>
      <md-button :disabled="disable" 
        class="md-primary" 
        @click="addNewIdea">Send to next player</md-button>
      <md-button :disabled="disable" 
        class="md-primary" 
        @click="skipRound">Skip this round</md-button>
    </div>
    <div class="md-layout md-alignment-top-center">
      <md-avatar class="md-accent md-avatar-icon">{{round+1}}<md-tooltip md-direction="top">Round {{round+1}}</md-tooltip></md-avatar>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerGameComp",

  props: {
    started: false,
    lastIdea: Object,
    round:0
  },

  data: () => ({
    newIdea: "",
  }),

  computed: {
    disable() {
      if(!this.started) return true;
      if(this.round==0) return false;
      if(this.lastIdea==null) return true;
    }
  },

  methods: {
    addNewIdea() {
      if (this.newIdea != "") {
        this.$emit("addIdea", this.newIdea)
        this.newIdea=""
      }
    },
    skipRound() {
      //TODO : change skip management
        this.$emit("addIdea", "")
        this.newIdea=""
    },
  },
};
</script>
