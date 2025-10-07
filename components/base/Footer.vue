<template>
  <BContainer fluid class="bg-primary text-white">
    <BRow>
      <BCol align-h="center" class="text-center">
        {{$t('copyright')}} - V{{appVersion}}
      </BCol>
    </BRow>
    <!-- <BRow>
      <BCol align-h="center" class="text-center">
        <BLink class="text-white" to="/mentions-legales">{{$t('legalNotices')}}</BLink>
      </BCol>
    </BRow> -->
  </BContainer>
</template>

<script setup lang="ts">

  const props = defineProps({
    appVersion: {
        type: String,
        default: ''
      }
  });
</script>

<style scoped>
a {
  text-decoration: none !important;
}
</style>
