<template>
      <!-- Élément sentinelle pour détecter la fin de la liste -->
    <div ref="sentinel" class="col-span-full h-20 flex items-center justify-center">
      <UIcon 
        v-if="loading" 
        name="i-lucide-refresh-cw"
        class="w-6 h-6 animate-spin"
      />
      <p v-else-if="!hasMore" class="text-sm text-gray-500">
        End of List
      </p>
    </div>

</template>
<script setup lang="ts">

  // props
  const props = defineProps<{
    loading: boolean;
    hasMore: boolean;
  }>()

  const sentinel = ref<HTMLElement>()
  // emits declaration
  const emit = defineEmits(['loadMore'])
  
  // Configuration of the IntersectionObserver
  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          emit('loadMore')
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px' // Start charging at 100px before end
      }
    )
    
    if (sentinel.value) {
      observer.observe(sentinel.value)
    }
    
    // Clean to observer on unmount
    onUnmounted(() => {
      observer.disconnect()
    })
  })

</script>