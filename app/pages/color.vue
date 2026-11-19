<script setup lang="ts">
import { bg } from 'zod/locales';


const isActive = ref(false)

const bgColor = (id:number) => {
  let color = 'bg-postit0-400'
switch (id) {
    case 0:
        color = 'bg-postit0-400'
        break;
    case 1:
        color = 'bg-postit1-400'
        break;
    case 2:
        color = 'bg-postit2-400'
        break;
    case 3:
        color = 'bg-postit3-400'
        break;
    case 4:
        color = 'bg-postit4-400'
        break;
    default:
        color = 'bg-postit0-400'
        break;
  }
  return color
}
const cardClasses = computed(() =>
  isActive.value
    ? bgColor(2)
    : 'bg-gray-100 text-gray-900'
)
</script>

<template>
  <UCard :class="cardClasses">
    Carte avec un style conditionnel
    {{ cardClasses }}
  </UCard>

  <UButton @click="isActive = !isActive">
    Basculer l’état
  </UButton>
</template>