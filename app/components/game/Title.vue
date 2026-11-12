<template>
  <div>
      <UCard class="mt-3 mb-3">
        <template #title>
          <ULink
                v-if="link"
                  :to="link" variant="light" class="nodecoLink">{{title}}</ULink>
          <span v-else>{{title}}</span>
        </template>
      </UCard>
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
