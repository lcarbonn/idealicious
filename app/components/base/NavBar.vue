<template>
  <UHeader mode="modal" toggle-side="right">
    <template #title>
      <UAvatar
        class="rounded-none"
        src="/icon-64x64.png"/>Idealicious
    </template>
    <UNavigationMenu :items="items" content-orientation="vertical"/>
    <template #right>
      <NuxtLink href="/wsbaserow">WS</NuxtLink>
      <UiColorModePicker size="sm"/>
      <BaseBaserow/>
    </template>
    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>    
  </UHeader>
</template>
<script setup lang="ts">

import type { NavigationMenuItem } from '@nuxt/ui'

    // get user session
  const { loggedIn, user, clear } = useUserSession()

  const userName = computed(() => {
    return user.value?.first_name
  })

  const items = computed<NavigationMenuItem[]>(() => {
    const items:NavigationMenuItem[] = []
    if (!loggedIn.value) return []
    else {
      items.push(
        {
          label: userName.value,
          icon:"streamline-color:user-circle-single-flat",
          children: [
            {
            label: 'Sign Out',
            icon: 'streamline-color:logout-1-flat',
            onSelect: () => {
              signOut()
            },
          }]
        },
      )
    }
    return items
  })

  const signOut = async () => {
    await clear()
    await navigateTo('/login')
    messageToSnack("Signed out")
  }

</script>