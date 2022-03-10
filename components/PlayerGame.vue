<!-- Game page -->
<template>
  <div>
    <div>
      <md-card>
        <md-card-content>
          <md-field v-if="started && round!=0">
            <label v-if="lastIdea && lastIdea.message!=''">Previous player's idea...</label>
            <label v-else-if="lastIdea && lastIdea.message==''">Previous player's idea skiped</label>
            <label v-else>Waiting for previous player's idea...</label>
            <md-input v-if="lastIdea" disabled v-model="lastIdea.message">{{ lastIdea.message }}</md-input>
          </md-field>
        </md-card-content>
      </md-card>
      <p/>
      <md-card>
        <md-card-content>
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
        </md-card-content>
        <md-card-actions md-alignment="space-between">
          <div>
          <md-button :disabled="disable" 
            class="md-accent md-icon-button md-raised" 
            @click="addNewIdea">
              <md-icon>queue</md-icon>
              <md-tooltip md-direction="top">Add the idea and send to next player</md-tooltip>
          </md-button>
          </div>
          <div>
            <md-badge :md-content="round+1">
              <md-avatar class="md-accent md-avatar-icon">
                <md-icon>loop</md-icon>
                <md-tooltip md-direction="top">Round {{round+1}}</md-tooltip>
              </md-avatar>
            </md-badge>
          </div>
          <div>
          <md-button :disabled="disable" 
            class="md-accent md-icon-button md-raised" 
            @click="skipRound">
              <md-icon>skip_next</md-icon>
              <md-tooltip md-direction="top">Skip this round</md-tooltip>
            </md-button>
          </div>
        </md-card-actions>
      </md-card>
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
