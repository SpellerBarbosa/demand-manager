<script setup>
import Profile from '~/components/Profile.vue';
import Home from '~/components/Home.vue';
import Signup from '~/components/Signup.vue';
import useMenuStore from '~/store/useMenuStore';
import Request from '~/components/Request.vue';
import Requests from '~/components/Requests.vue';
import Menu from '~/components/Menu.vue';

const useMenu = useMenuStore();
</script>

<template>
    <section>
        <Profile />
        <main>
            <Home v-if=" useMenu.startMenu === 'home'" />
            <Signup v-if="useMenu.startMenu ==='signup'" />
            <Request v-if="useMenu.startMenu ==='request'"/>
            <Requests v-if="useMenu.startMenu ==='requests'"/>
        </main>
        <Menu />
    </section>
</template>