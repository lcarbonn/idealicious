<!-- Game page -->
<template>
  <div>
      <md-card>
        <md-card-content>
          <md-field v-if="started && !ended && round!=0">
            <label v-if="lastIdea && lastIdea.message!=''">{{$t('playerGamePreviousIdea')}}</label>
            <label v-else>{{$t('playerGameWaitingIdea')}}</label>
            <md-input v-if="lastIdea" disabled v-model="lastIdea.message">{{ lastIdea.message }}</md-input>
          </md-field>
        </md-card-content>
      </md-card>
      <p/>
      <md-card>
        <md-card-content>
          <md-field>
            <label v-if="!started && !ended">{{$t('playerGameWaitingStart')}}</label>
            <label v-else-if="started && !ended && round==0">{{$t('playerGameFirstIdea')}}</label>
            <label v-else-if="ended">{{$t('playerGameEnded')}}</label>
            <label v-else>{{$t('playerGameNewIdea')}}</label>
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
              <md-tooltip md-direction="top">{{$t('playerGameAddIdea')}}</md-tooltip>
          </md-button>
          </div>
          <div>
            <md-badge :md-content="round+1">
              <md-avatar class="md-accent md-avatar-icon">
                <md-icon>loop</md-icon>
                <md-tooltip md-direction="top">{{$t('playerGameRound')}} {{round+1}}</md-tooltip>
              </md-avatar>
            </md-badge>
          </div>
          <div>
          <md-button :disabled="disable" 
            class="md-accent md-icon-button md-raised" 
            @click="skipRound">
              <md-icon>skip_next</md-icon>
              <md-tooltip md-direction="top">{{$t('playerGameSkip')}}</md-tooltip>
            </md-button>
          </div>
        </md-card-actions>
      </md-card>
  </div>
</template>

<script>
export default {
  name: "PlayerGameComp",

  props: {
    started: false,
    ended: false,
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
        this.$emit("addIdea", "")
        this.newIdea=""
    },
  },
};
</script>
