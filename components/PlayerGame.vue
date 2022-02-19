<!-- Game page -->
<template>
  <div>
    <div>
      <md-field v-if="lastIdea">
        <md-input disable v-model="lastIdea.message">{{ lastIdea.message }}</md-input>
      </md-field>
      <md-field>
        <label v-if="!lastIdea">Please, write the first idea here...</label>
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
      <md-avatar class="md-primary">{{ size }}</md-avatar>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerGameComp",

  props: {
    lastIdea: Object,
  },

  data: () => ({
    newIdea: "",
    size: 0,
  }),

  methods: {
    addNewIdea() {
      if (this.newIdea != "") {
        this.size++
        this.$emit("addIdea", this.newIdea)
        this.newIdea=""
      }
    },
  },
};
</script>
