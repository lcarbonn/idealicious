<template>
    <UFooter>
      <template #top>
        <USeparator type="dashed" color="primary"
          :avatar="{
            src: '/icon-64x64.png'
        }"/>
      </template>
      <template #default>
        <span>{{t('copyright', { year, appVersion})}}</span>
      </template>
    </UFooter>
</template>

<script setup>
  // for lang
  const { t } = useI18n()

  const props = defineProps({
    appVersion: {
        type: String,
        default: ''
      }
  });
  const year = new Date().getFullYear()
</script>
