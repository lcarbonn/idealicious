<template>
  <div>
      <BCard bg-variant="primary" text-variant="light" class="mt-3">
        <BCardTitle>
          <BLink
                v-if="link"
                  :to="link" variant="light" class="nodecoLink">{{title}}</BLink>
          <span v-else>{{title}}</span>
        </BCardTitle>
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
