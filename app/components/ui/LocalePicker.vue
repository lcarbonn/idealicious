<template>
  <UPopover v-model:open="open" :ui="{ content: 'px-6 py-4 flex flex-col gap-4 overflow-y-auto z-100' }" class="w-min">
    <template #default>
        <UButton
          :icon="selectedLang?.icon"
          :size="size"
          square
          color="neutral"
          :variant="open ? 'soft' : 'ghost'"
          aria-label="Language select"
          :ui="{ leadingIcon: 'text-primary' }"
        />
    </template>
    <template #content>
      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2 select-none flex items-center gap-1">
          Language select
        </legend>
        <div class="grid grid-cols-2 gap-1 -mx-2">
          <UButton v-for="m in items"
            :size="size"
            :icon="m.icon"
            variant="outline"
            :class="[selectedLang?.locale===m.locale ? 'bg-elevated' : 'hover:bg-elevated/50']"
            @click="selectedLang=m, open=!open"
            />
        </div>
      </fieldset>        
    </template>
  </UPopover>
</template>
<script setup lang="ts">

  import type { Locale } from 'vue-i18n';

  type LocaleUI = {
      locale:"en" | "fr",
      icon:string
  }
  const { locales, setLocale, locale } = useI18n()

    // props
  const props = defineProps<{
      size?: "sm" | "md" | "xs" | "lg" | "xl" | undefined
  }>()

  const open = ref(false)

  const getFlag = (locale:Locale) => {
    switch (locale) {
        case 'en':
            return 'twemoji:flag-united-kingdom'
        default:
            return 'twemoji:flag-france'
    }
  }

  // set the list of navigation items
  const items = computed<LocaleUI[]>(() => {
      const items:LocaleUI[] = []

      locales.value.forEach(locale => {
        // add locales
        items.push(
          {
            // code:locale.code,
            icon: getFlag(locale.code),
            locale:locale.code
          }
        )
      
      });
    return items
  })

  // default
  const selectedLang = ref<LocaleUI>(
    {
      icon: getFlag(locale.value),
      locale:locale.value
    }
  )

  watch(selectedLang, value => {
    if(value) {
      setLocale(value.locale)
    }
  })

</script>