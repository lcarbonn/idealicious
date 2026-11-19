<template>
  <div>
      <UPageCard class="mt-3 mb-3 text-inverted bg-primary">
        <template #title>
          <ULink
                v-if="link"
                  :to="link" variant="light" class="text-inverted">{{title}}</ULink>
          <span v-else>{{title}}</span>
        </template>
      </UPageCard>
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
