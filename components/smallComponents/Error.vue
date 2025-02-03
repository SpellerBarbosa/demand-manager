<script setup>
const props = defineProps({
    msgError: {
        type: null,
        required: true
    }
})
</script>

<template>
    <span
        class="w-[90%] h-[6vh] bg-red-500  flex-col absolute top-2 rounded-3xl overflow-hidden text-white flex items-center justify-center  lg:w-[40%] m-auto"
        v-if="msgError">{{ msgError }}
        <div class="w-screen h-1 bg-white  absolute bottom-0 animate-regressive"></div>
    </span>
</template>