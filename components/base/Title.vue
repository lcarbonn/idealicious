<template>
  <div>
      <BCard variant="info">
      
        <BLink
              v-if="link"
                :to="link" variant="light" class="nodecoLink">{{title}}</BLink>
        <span v-else>{{title}}</span>
      </BCard>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
        type: String,
        default:null
    },
    link: {
      type: String,
      default:null
    }
  });

</script>
<style scoped>
.nodecoLink {
  text-decoration: none !important;
}
</style>
