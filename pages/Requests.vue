<script setup>
import { watchEffect } from 'vue';
import { ref } from 'vue';
import useMenuStore from '~/store/useMenuStore';
import useUserStore from '~/store/useUserStore';
import Error from '~/components/smallComponents/Error.vue';
import Success from '~/components/smallComponents/Success.vue';
import Menu from '~/components/Menu.vue';
import Profile from '~/components/Profile.vue';
definePageMeta({
    middleware: 'auth'
});


const url = 'https://api-rm.vercel.app/api/requests';
const editUrl = 'https://api-rm.vercel.app/api/schedule';
const requests = ref([]);
const date_planned = ref();
const new_status = ref();
const useMenu = useMenuStore();
const useUser = useUserStore();
const msgError = ref();
const msgSuccess = ref();
const request = ref();
const details = ref({});



watchEffect(async () => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const data = await response.json();

    if (response.ok) {
        requests.value = data.requests.filter(req => req.status === 'aguardando');
    }
})


const editRequest = async (requestId) => {
    const response = await fetch(editUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            request_id: requestId,
            date_planned: date_planned.value,
            new_status: new_status.value
        })
    })

    const data = await response.json()

    if (response.ok) {
        useMenu.setMenu('request')
        msgSuccess.value = data.msg;
        setTimeout(() => {
            useMenu.setMenu('requests')
        }, 3000);

    } else {
        msgError.value = data.msg;
        setTimeout(() => {
            msgError.value = ""
        }, 3000);
    }
}

const togleDetails = (requestId) =>{
    details.value[requestId] = !details.value[requestId]
}

const viewRequest = (requestId) => {
    request.value = requestId
}
</script>

<template>
    <section>
        <Profile />
        <section class="w-screen min-h-[75vh] p-6 bg-gray-50 lg:absolute top-0 lg:w-[70%] lg:ml-[30%] lg:h-[100vh]">
            <h1 class="text-3xl font-bold text-center mt-5 text-gray-800 mb-8">Solicitações recebidas</h1>
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto h-[75vh] lg:flex lg:flex-col">
                <form v-for="(request, index) in requests" :key="index"
                    class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300  relative cursor-pointer"
                    @submit.prevent="editRequest(request.id)">
                    <div class="space-y-4" @click="togleDetails(request.id)">
                        <div :class="details[request.id] ? 'visible': 'hidden'">
                            <label for="data-solicitacao" class="block text-sm font-medium text-gray-700">ID da
                                solicitação:</label>
                            <input type="text" id="data-solicitacao" disabled v-model="request._id"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 text-gray-700">
                        </div>
                        <div :class="details[request.id] ? 'visible': 'hidden'">
                            <label for="data-solicitacao" class="block text-sm font-medium text-gray-700">Data
                                solicitação:</label>
                            <input type="text" id="data-solicitacao" disabled v-model="request.date"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 text-gray-700">
                        </div>
                        <div>
                            <label for="solicitante"
                                class="block text-sm font-medium text-gray-700">Solicitante:</label>
                            <input type="text" id="solicitante" disabled v-model="request.usuario.userName"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 text-gray-700">
                        </div>
                        <div :class="details[request.id] ? 'visible': 'hidden'">
                            <label for="tipo-servico" class="block text-sm font-medium text-gray-700">Tipo de
                                serviço:</label>
                            <input type="text" id="tipo-servico" disabled v-model="request.type_service"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 text-gray-700">
                        </div>
                        <div :class="details[request.id] ? 'visible': 'hidden'">
                            <label for="descricao" class="block text-sm font-medium text-gray-700">Descrição:</label>
                            <textarea id="descricao" disabled v-model="request.description"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 text-gray-700"></textarea>
                        </div>
                        <div :class="details[request.id] ? 'visible': 'hidden'">
                            <p class="text-sm font-medium text-gray-700">Status: <span
                                    :class="{ 'text-green-600': request.status === 'entregue', 'text-red-600': request.status === 'pendente', 'text-yellow-600': request.status === 'aguardando' }">{{
                                        request.status }}</span></p>
                        </div>
                        <div :class="details[request.id] ? 'visible': 'hidden'">
                            <label for="planned" class="block text-sm font-medium text-gray-700">Agendar:</label>
                            <input type="date" id="planned"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-700"
                                v-model="date_planned">
                        </div>
                        <div :class="details[request.id] ? 'visible': 'hidden'">
                            <label for="new_status" class="block text-sm font-medium text-gray-700">Mudar
                                status:</label>
                            <select id="new_status"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-700"
                                v-model="new_status">
                                <option value="" disabled selected>Selecione um status</option>
                                <option value="pendente">PENDENTE</option>
                                <option value="cancelar">CANCELADO</option>
                            </select>
                        </div>
                        <div :class="details[request.id] ? 'visible': 'hidden'">
                            <button
                                class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300">
                                Agendar
                            </button>
                        </div>
                    </div>
                </form>
                <Error :msg-error="msgError" />
            </div>
        </section>
        <Menu />
    </section>
</template>
