<template>
  <UPopover v-model:open="open" :ui="{ content: 'px-6 py-4 flex flex-col gap-4 overflow-y-auto' }" class="w-min">
    <template #default>
        <UButton
          :icon="selectedMode?.icon"
          :size="size"
          square
          color="neutral"
          :variant="open ? 'soft' : 'ghost'"
          aria-label="Color mode"
          :ui="{ leadingIcon: 'text-primary' }"
        />
    </template>
    <template #content>
      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2 select-none flex items-center gap-1">
          Color Mode
        </legend>
        <div class="grid grid-cols-3 gap-1 -mx-2">
          <UButton v-for="m in modes"
            :size="size"
            :icon="m.icon"
            :label="m.label"
            variant="outline"
            :aria-label="m.label"
            :class="[selectedMode?.label==m.label ? 'bg-elevated' : 'hover:bg-elevated/50']"
            @click="selectedMode=m, open=!open"
            />
        </div>
      </fieldset>        
    </template>
  </UPopover>
</template>
<script setup lang="ts">
  const appConfig = useAppConfig()

    // props
  const props = defineProps<{
      size?: "sm" | "md" | "xs" | "lg" | "xl" | undefined
  }>()

  const open = ref(false)

  const modes = [
    { label: 'dark', icon: appConfig.ui.icons.dark },
    { label: 'light', icon: appConfig.ui.icons.light },
    { label: 'system', icon: appConfig.ui.icons.system },
  ]
  const getModeByLabel = (label: string) => {
    return modes.find(mode => mode.label === label)
  }

  // default
  const selectedMode = ref()

  watch(selectedMode, value => {
    if(value) {
      useColorMode().preference = value.label
    }
  })

  watch(useColorMode(), value => {
    if(value) {
      const pref = getModeByLabel(value.preference)
      selectedMode.value = pref?pref:modes[0]
    }
  })

</script>