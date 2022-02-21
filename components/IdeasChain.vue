<!-- Game page -->
<template>
  <div>
    <div>
      <IdeaCard v-for="idea in ideas" :key="idea.id" :idea="idea" />
    </div>
  </div>
</template>

<script>
export default {
  name: "IdeasChainComp",

  props: {
    ideas: [],
  }

};
</script>
