<template>
  <NuxtLink
    :href=baseUrl
    target="_blank">
    <UTooltip text="Open on Baserow">
      <UAvatar 
        class="rounded-none"
        src="/baserow-logo-64x64.png"/>
    </UTooltip>
  </NuxtLink>
</template>
<script setup lang="ts">
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl + '/database/' + config.public.baseId + '/table/' + config.public.tableFacture
</script>