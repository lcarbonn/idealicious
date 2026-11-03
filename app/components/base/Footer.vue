<template>
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

    <!-- <BRow>
      <BCol align-h="center" class="text-center">
        {{$t('copyright')}} - V{{appVersion}}
      </BCol>
    </BRow> -->
    <!-- <BRow>
      <BCol align-h="center" class="text-center">
        <BLink class="text-white" to="/mentions-legales">{{$t('legalNotices')}}</BLink>
      </BCol>
    </BRow> -->
  </UFooter>
</template>

<script setup lang="ts">

  const props = defineProps({
    appVersion: {
        type: String,
        default: ''
      }
  });
  const year = new Date().getFullYear()
</script>

<style scoped>
a {
  text-decoration: none !important;
}
</style>
