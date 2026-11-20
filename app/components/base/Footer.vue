<template>
  <div>
    <!-- pre footer to add weight on 100 vh-->
    <UFooter>
      <template #top>
        <p>
          &nbsp;
        </p>
      </template>
    </UFooter>
    <!-- real footer fixed on bottom-->
    <UTheme
      :ui="{
        footer: {
            root: 'fixed',
        },

      }"
        >
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
    </UTheme>
   </div>
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
