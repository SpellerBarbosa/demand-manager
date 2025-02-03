<script setup>
const props = defineProps({
    msgSuccess:{
        type: null,
        required: true
    }
})

</script>
<template>
    <span
        class="w-[90%] h-[6vh] bg-green-500 relative rounded-3xl overflow-hidden text-white flex items-center justify-center lg:w-[40%]"
        v-if="msgSuccess">{{ msgSuccess }}
        <div class="w-screen h-1 bg-white absolute bottom-0 animate-regressive"></div>
    </span>
</template>