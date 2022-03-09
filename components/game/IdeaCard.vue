<!-- Ideas page -->
<template>
  <md-card v-if="idea">
    <md-card-content>
      {{idea.message}}
    </md-card-content>
    <md-card-actions>
      <md-button class="md-icon-button" :class="getLovedClass()" @click="loveIdea">
        <md-icon>favorite</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: "IdeaCardComp",
  props: {
    idea: Object,
  },

  methods: {
    loveIdea() {
      console.debug("love idea:" + this.idea.message),
      this.$emit("loveIdea", this.idea);
    },
    getLovedClass() {
      if(this.idea.isLoved) return "md-raised md-primary"
    }
  },

};
</script>

<style lang="scss" scoped>
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>
