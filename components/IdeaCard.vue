<!-- Ideas page -->
<template>
    <md-card v-if="idea">
      <md-card-content>
        {{idea.message}}
      </md-card-content>
    </md-card>
</template>

<script>
export default {
  name: 'IdeaCard',
    props: {
        idea:Object
    }
}
</script>

<style lang="scss" scoped>
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>
