<script setup>
import Profile from '~/components/Profile.vue';
import Menu from '~/components/Menu.vue';
import Home from '~/components/Home.vue';
import Signup from '~/components/Signup.vue';
import useMenuStore from '~/store/useMenuStore';

const useMenu = useMenuStore();
</script>

<template>
    <section>
        <Profile />
        <section>
            <Home v-if=" useMenu.startMenu === 'home'" />
            <Signup v-if="useMenu.startMenu ==='signup'" />
        </section>
        <Menu />
    </section>
</template>