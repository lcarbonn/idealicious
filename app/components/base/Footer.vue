<template>
  <div>
    <UFooter>
      <template #top>
        <USeparator type="dashed" color="primary"
          :avatar="{
            src: '/icon-64x64.png'
        }"/>
      </template>
      <template #default>
        <span>Copyright © {{year}} - Agilisé à Toulouse, France - V{{appVersion}}</span>
      </template>
    </UFooter>
   </div>
</template>

<script setup>
  const props = defineProps({
    appVersion: {
        type: String,
        default: ''
      }
  });
  const year = new Date().getFullYear()
</script>
