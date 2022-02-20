<!-- Game page -->
<template>
  <div>
    <div>
      <md-field v-if="nbRound!=0">
        <label v-if="lastIdea">Previous player's idea...</label>
        <label v-else>Waiting for previous player's idea...</label>
        <md-input v-if="lastIdea" disable v-model="lastIdea.message">{{ lastIdea.message }}</md-input>
      </md-field>
      <md-field>
        <label v-if="nbRound==0">Please, write the first idea here...</label>
        <label v-else>Please, write your idea here...</label>
        <md-input
          autofocus
          v-model="newIdea"
          @keydown.enter="addNewIdea"
        ></md-input>
      </md-field>
      <md-button class="md-primary" @click="addNewIdea"
        >Send to next player</md-button
      >
      <md-avatar class="md-primary">{{ nbRound }}</md-avatar>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerGameComp",

  props: {
    lastIdea: Object,
    nbRound:0
  },

  data: () => ({
    newIdea: "",
  }),

  methods: {
    addNewIdea() {
      if (this.newIdea != "") {
        this.$emit("addIdea", this.newIdea)
        this.newIdea=""
      }
    },
  },
};
</script>
