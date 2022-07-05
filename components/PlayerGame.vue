<!-- Game page -->
<template>
  <div>
    <b-card>
      <b-card-text>
        <b-form-group v-if="started && !ended && round!=0" class="mb-0">
          <label :for="lastIdea" v-if="lastIdea && lastIdea.message!=''">{{$t('playerGamePreviousIdea')}}</label>
          <label :for="lastIdea" v-else>{{$t('playerGameWaitingIdea')}}</label>
          <b-form-input v-if="lastIdea" disabled v-model="lastIdea.message">{{ lastIdea.message }} class="mb-0">
          </b-form-input>
        </b-form-group>
      </b-card-text>
    </b-card>
    <b-card>
      <b-card-text>
        <b-form-group>
          <label for="newIdea" v-if="!started && !ended">{{$t('playerGameWaitingStart')}}</label>
          <label for="newIdea" v-else-if="started && !ended && round==0">{{$t('playerGameFirstIdea')}}</label>
          <label for="newIdea" v-else-if="ended">{{$t('playerGameEnded')}}</label>
          <label for="newIdea" v-else>{{$t('playerGameNewIdea')}}</label>
          <b-form-input id="newIdea" :disabled="disable" autofocus v-model="newIdea" @keydown.enter="addNewIdea"
            maxlength="140" trim class="mb-0" :state="newIdeaState"></b-form-input>
        </b-form-group>
      </b-card-text>
      <b-container>
        <b-row align-h="center">
          <b-col md="auto">
            <b-button id="addButton" :disabled="disable" @click="addNewIdea">
              <b-icon icon="plus-circle-fill"></b-icon>
            </b-button>
            <b-tooltip target="addButton" triggers="hover">{{ $t('playerGameAddIdea')}}</b-tooltip>
          </b-col>
          <b-col md="auto">
            <b-avatar id="avatar" variant="secondary" icon="arrow-counterclockwise" :badge="round+1">
            </b-avatar>
            <b-tooltip target="avatar" triggers="hover">{{$t('playerGameRound')}} {{round+1}}</b-tooltip>
          </b-col>
          <b-col md="auto">
            <b-button id="skipButton" :disabled="disable" @click="skipRound">
              <b-icon icon="skip-end"></b-icon>
            </b-button>
            <b-tooltip target="skipButton" triggers="hover">{{ $t('playerGameSkip')}}</b-tooltip>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import { BIcon, BIconPlusCircleFill, BIconArrowCounterclockwise, BIconSkipEnd } from 'bootstrap-vue'

export default {
  name: "PlayerGameComp",

  components: {
    BIcon,
    BIconPlusCircleFill,
    BIconArrowCounterclockwise,
    BIconSkipEnd
  },

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
    },
    newIdeaState() {
      return (this.newIdea != null && this.newIdea != "") ? true : false
    },

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
