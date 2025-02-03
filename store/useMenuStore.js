import { defineStore } from "pinia";

const useMenuStore = defineStore('menu',{
    state:() =>({
        startMenu: ""
    }),
    actions:{
        setMenu(startMenu){
            this.startMenu = startMenu
        }
    }
})

export default useMenuStore;