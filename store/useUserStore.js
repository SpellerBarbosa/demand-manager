import { defineStore } from "pinia";
import { useCookie } from "#app";



const useUserStore = defineStore('user',{
    state: () =>({
        userId: null,
        userName: null,
        sector: null,
        role: null,        
    }),
    actions:{
        setUser(userId, userName, sector, role) {
            this.userId = userId;
            this.userName = userName;
            this.sector = sector;
            this.role = role;
        }
    }
})

export default useUserStore;