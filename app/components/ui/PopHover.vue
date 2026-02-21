<template>
    <UPopover
      :content="{ side: 'top', sideOffset: 16, updatePositionStrategy: 'always' }"
      :open="open.show"
      :reference="reference">
      <template #content>
        <span class="text-xs p-2">{{message}}</span>
      </template>
    </UPopover>  

</template>
<script setup lang="ts">

  // props
  const props = defineProps<{
      message:string
      position:HoverPosition
      open:ModalShow
  }>()

  const reference = computed(() => ({
    getBoundingClientRect: () =>
      ({
        width: 0,
        height: 0,
        left: props.position.x,
        right: props.position.x,
        top: props.position.y,
        bottom: props.position.y,
        ...props.position
      }) as DOMRect
  }))

  export type HoverPosition = {
    x:number,
    y:number
  }
</script>