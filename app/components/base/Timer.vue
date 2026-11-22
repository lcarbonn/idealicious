<template>
    <UCard text-variant="danger">
        <template #default class="text-center" align-h="around">
            <span>Il vous reste {{timerDisplay}} secondes</span>
            <!-- <UButton @click="restartTimer">Restart</UButton> -->
        </template>
    </UCard>
</template>
<script setup lang="ts">

    const formatTime = (seconds:number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    // props
    const props = defineProps({
        max: {
            type: Number,
            default: 20
        },
        restart: {
            type:Boolean,
            default: false
        }
    })

    const timeLeft = ref(props.max)
    const timerDisplay = ref(formatTime(props.max))
    let timerId:any = null


    onMounted(() => {
        startTimer()
    })

    // watch if restart is aked
    watch(() => props.restart, (restart) => {
        if (restart) restartTimer()
    })

    const emit = defineEmits(['timerCompleted'])

    const startTimer = () => {
    if (timerId) return;

    timerId = setInterval(() => {
        timeLeft.value--;
        timerDisplay.value = formatTime(timeLeft.value);

        if (timeLeft.value <= 0) {
            clearInterval(timerId);
            timerId = null;
            emit('timerCompleted')
        }
    }, 1000);
    }

    const restartTimer = () => {
        clearInterval(timerId);
        timerId = null;
        timeLeft.value = props.max;
        timerDisplay.value = formatTime(timeLeft.value);
        startTimer()
    }
</script>