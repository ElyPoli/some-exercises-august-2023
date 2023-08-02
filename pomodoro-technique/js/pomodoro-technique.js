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
                nextTimer: false,
            },
            countDownToLongPause: 8,
            timeEnd: false,
            countDown: "",
            error: false,
        }
    },
    methods: {
        /**
         * Verifica che i valori inseirit siano validi e fa partire il primo countdown
         */
        startTomato() {
            if (this.workTime === "" || this.workTime <= 0 || this.shortPauseTime === "" || this.shortPauseTime <= 0 || this.longPauseTime === "" || this.longPauseTime <= 0) {
                this.error = true;
            } else {
                this.timerStart = true;
                this.timeInMillisForCountdown(this.workTime);
            }
        },
        /**
         * Trasforma il tempo inserito in milliseconti e richiama la funzione che fa partire il countdown
         * @param {number} time 
         */
        timeInMillisForCountdown(time) {
            let timeInMillis = time * 60 * 1000;
            let endTime = new Date().getTime() + timeInMillis;
            this.startCountdown(endTime);
        },
        /**
         * Avvia un countdown fino all'orario di fine indicato
         * @param {number} endTime 
         */
        startCountdown(endTime) {
            let interval = setInterval(() => {
                let now = new Date().getTime();
                let distance = endTime - now;

                if (distance <= 0) {
                    console.log("Tempo scaduto");
                    clearInterval(interval);
                    this.timeEnd = true;
                } else {
                    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    // Formatto i minuti e i secondi per averli sempre in doppia cifra
                    let minutesFormatted = minutes.toString().padStart(2, '0');
                    let secondsFormatted = seconds.toString().padStart(2, '0');

                    this.countDown = `${minutesFormatted}:${secondsFormatted}`;
                }
            }, 1000);

            this.countDownToLongPause--; // Aggiorno il contatore che indica la pausa lunga
            console.log(this.countDownToLongPause);
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
        },
    },
})

app.mount("#app");