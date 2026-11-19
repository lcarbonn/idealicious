<template>
  <UPageCard :title="t('home.welcome')" class="text-white bg-primary mb-3">
    <template #footer>
      <UAvatar color="primary" size="lg" rounded src="/icon.png"></UAvatar>
      {{t('home.welcome2')}}
    </template>
  </UPageCard>
</template>

<script setup lang="ts">

  // for lang
  const { t } = useI18n()
  
</script>