<template>
    <USelect v-model="value" :items="items" value-key="value" variant="ghost" :size="size"/>
</template>
<script setup lang="ts">
  
  import type { SelectItem } from '@nuxt/ui'
  import type { Locale } from 'vue-i18n';

    // props
  const props = defineProps<{
      size?: "sm" | "md" | "xs" | "lg" | "xl" | undefined
  }>()

  const { locales, setLocale, locale } = useI18n()

  const value = ref(locale.value)

  // change the locale language
  const changeLocale = (locale:Locale) => {
    setLocale(locale)
  }

  const getFlag = (locale:Locale) => {
    switch (locale) {
        case 'fr':
            return 'twemoji:flag-france'
        default:
            return 'twemoji:flag-united-kingdom'
    }
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
            icon: getFlag(locale.code),
            onSelect: () => {
              changeLocale(locale.code)
            },
          }
        )
      
      });
    return items
  })

</script>