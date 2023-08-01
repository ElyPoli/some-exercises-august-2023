"use strict";

const app = Vue.createApp({
    data() {
        return {
            workTime: "",
            shortPauseTime: "",
            longPauseTime: "",
            timerStart: false,
            isBtnActive: {
                startActive: false,
                pauseActive: false,
                stopActive: false,
            }
        }
    },
    methods: {
        startTomato() {
            console.log(this.workTime);
            console.log(this.shortPauseTime);
            console.log(this.longPauseTime);

            if (this.workTime === "" || this.workTime <= 0 || this.shortPauseTime === "" || this.shortPauseTime <= 0 || this.longPauseTime === "" || this.longPauseTime <= 0) {
                console.log("errore!");
            } else {
                this.timerStart = true;
            }
        },
        /**
         * Attiva il pulsante specificato con btnClick e disattiva tutti gli altri pulsanti
         * @param {string} btnClick 
         */
        btnActive(btnClick) {
            const isBtnActiveKey = Object.keys(this.isBtnActive); // Creo un array con le chiavi dell'oggetto

            for (let i = 0; i < isBtnActiveKey.length; i++) {
                const btnNowClick = isBtnActiveKey[i];
                let isActive;

                // Individuo se la chiave all'indice i corrisponde a quella del pulsante cliccato
                if (btnNowClick === btnClick) {
                    isActive = true;
                } else {
                    isActive = false;
                }

                this.isBtnActive[btnNowClick] = isActive; // Aggiorno il valore della chiave all'indice i
            }
        }
    },
})

app.mount("#app");