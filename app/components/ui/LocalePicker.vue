<template>
    <USelect v-model="value" :items="items" value-key="value" />
</template>
<script setup lang="ts">
  
  import type { SelectItem } from '@nuxt/ui'
  import type { Locale } from 'vue-i18n';

  const { locales, setLocale, locale } = useI18n()

  const value = ref(locale.value)

  // change the locale language
  const changeLocale = (locale:Locale) => {
    setLocale(locale)
  }

  // set the list of navigation items
  const items = computed<SelectItem[]>(() => {
      const items:SelectItem[] = []

      locales.value.forEach(locale => {
        // add locales
        items.push(
          {
            label:locale.name,
            value:locale.code,
            onSelect: () => {
              changeLocale(locale.code)
            },
          }
        )
      
      });
    return items
  })

</script>