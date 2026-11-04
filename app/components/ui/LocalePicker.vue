<template>
    <UNavigationMenu 
      :items="items"
      content-orientation="vertical"/>

</template>
<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui';
  import type { Locale } from 'vue-i18n';

  const { locales, setLocale } = useI18n()

  // change the locale language
  const changeLocale = (locale:Locale) => {
    setLocale(locale)
  }

  // set the list of navigation items
  const items = computed<NavigationMenuItem[]>(() => {
    const items:NavigationMenuItem[] = []

    items.push(
      {
        label: 'Locale',
        icon: 'streamline-color:web-flat',
        children: []
      }
    )

    locales.value.forEach(element => {
      // add locales
      items[0]?.children?.push(
        {
        label: element.name,
        onSelect: () => {
          changeLocale(element.code)
        }}
      )
     
    });
    return items
    })

</script>