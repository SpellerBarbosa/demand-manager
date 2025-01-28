<script setup>
import { ref } from 'vue';

const user = ref("");
const password = ref("");
const sector = ref("");
const role = ref("");
const msgError = ref("");
const msgSuccess = ref("");

const url = "http://localhost:3001/api/signup";

const handlerSignup = async() =>{
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            user: user.value.toLowerCase().trim(),
            password: password.value.trim(),
            sector: sector.value.toLowerCase().trim(),
            role: role.value.toLowerCase().trim()
        })
    })

    const data = await response.json();

    if(!response.ok){
        msgSuccess.value = data.msg;
        setTimeout(() => {
            msgSuccess.value=""
        }, 2000);
    }else{
        msgError.value = data.msg;
        setTimeout(() => {
            msgError.value = ""
        }, 2000);
    }
}

</script>

<template>
    <section class="w-screen h-[75vh] flex items-center justify-center bg-gray-100
    ">
        <form class="flex  flex-col w-[80%] h-[80%] bg-white rounded-2xl items-center justify-evenly
        " @submit.prevent="handlerSignup()">
            <label for="user" class="flex  flex-col w-[80%] text-lg">Usuario
                <input type="text" id="user" placeholder="Digite o usuario" v-model="user" class="mt-5 border-b-2 outline-none border-b-blue-300 text-center">
            </label>
            <label for="password" class="flex  flex-col w-[80%] text-lg">Senha
                <input type="password" id="password" placeholder="Digite a senha" v-model="password" class="mt-5 border-b-2 outline-none border-b-blue-300 text-center">
            </label>
            <select name="sector" id="sector" v-model="sector">
                <option value="" disabled selected>Setor</option>
                <option value="contabil">Contábil</option>
                <option value="fiscal">Fiscal</option>
                <option value="rh">RH</option>
            </select>
            <select name="role" id="role" v-model="role">
                <option value=""  disabled selected>Permissão</option>
                <option value="admin">Administrador</option>
                <option value="funcionario">Funcionario</option>
                <option value="motoboy">Motoboy</option>
            </select>
            <button class="w-[40%] h-12 bg-blue-300 rounded-2xl">Cadastrar</button>
        </form>
    </section>
</template>