<template>
    <UPageGrid class="grid-cols-2 mb-4">
      <UiListTypeSwitch v-model="listType" size="sm" class="justify-self-end md:col-start-3 lg:col-start-5"/>
    </UPageGrid>
    <LazyListGamePlayersListCard v-if="listType=='card'"
      :players="players"
      :is-admin="isAdmin"
      />
    <LazyListGamePlayersListTable v-if="listType=='table'"
      :players="players"
      :is-admin="isAdmin"
      />
</template>

<script setup lang="ts">
  // for lang
  const { t } = useI18n()

  const listType = ref()

  // props
  const props = defineProps({
      isAdmin: {
          type: Boolean,
          default: false
      },
      players: {
          type: Array<IPlayer>,
          default: undefined
      },
  })
</script>
