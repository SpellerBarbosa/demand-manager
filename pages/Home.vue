<script setup>
import Menu from '~/components/Menu.vue';
import Profile from '~/components/Profile.vue';

definePageMeta({
    middleware:'auth'
});
</script>

<template>
    <section>
        <Profile/>
        <section class="bg-home  h-[77vh]  w-screen lg:w-[70%] lg:h-[100vh] lg:ml-[30vh] lg:absolute lg:top-0 lg:right-0">
        </section>
        <Menu/>
    </section>
</template>