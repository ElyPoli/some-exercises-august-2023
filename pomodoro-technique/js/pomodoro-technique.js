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
            countDownCurrentName: "",
            countDownFinished: false,
            countDownFinishedName: "",
            checkTomato: [false, false, false, false],
            indexCheckTomato: 0,
            interval: "",
            timeRemaining: "",
        }
    },
    methods: {
        /**
         * Verifica che i valori inseiriti siano validi e fa partire il primo countdown
         */
        startTomato() {
            if (this.workTime === "" || this.workTime <= 0 || this.shortPauseTime === "" || this.shortPauseTime <= 0 || this.longPauseTime === "" || this.longPauseTime <= 0) {
                this.error = true;
            } else {
                this.error = false;
                this.countDownFinished = false;
                this.timerStart = true;
                this.countDownCurrentName = "Work time";
                this.timeInMillisForCountdown(this.workTime);
            }
        },
        /**
         * Avvia il timer successivo nella sequenza
         */
        startNextTimer() {
            this.timeEnd = false;

            let btnClick = "";
            this.btnActive(btnClick);

            if (this.countDownToLongPause > 1) {
                if (this.countDownCurrentName === "Work time") {
                    this.countDownCurrentName = "Short pause time";
                    this.timeInMillisForCountdown(this.shortPauseTime);
                    this.checkTomato[this.indexCheckTomato] = true; // Imposto il pomodoro corrente come completato
                    this.indexCheckTomato++;
                } else {
                    this.countDownCurrentName = "Work time";
                    this.timeInMillisForCountdown(this.workTime);
                }
            } else if (this.countDownToLongPause === 0) {
                this.countDownToLongPause = 8;
                this.timerStart = false;
                this.countDownFinished = true;
                this.countDownFinishedName = "You're done, well done!";
            } else {
                this.countDownCurrentName = "Long pause time";
                this.timeInMillisForCountdown(this.longPauseTime);
                this.checkTomato[this.indexCheckTomato] = true; // Imposto il pomodoro corrente come completato
                this.indexCheckTomato++;
                this.workTime = "";
                this.shortPauseTime = "";
                this.longPauseTime = "";
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
            this.interval = setInterval(() => {
                let now = new Date().getTime();
                let distance = endTime - now;

                if (distance <= 0) {
                    clearInterval(this.interval);
                    this.timeEnd = true;
                } else {
                    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    // Formatto i minuti e i secondi per averli sempre in doppia cifra
                    let minutesFormatted = minutes.toString().padStart(2, '0');
                    let secondsFormatted = seconds.toString().padStart(2, '0');

                    this.countDown = `${minutesFormatted}:${secondsFormatted}`;

                    this.timeRemaining = distance; // Salvo quanto tempo rimane
                }
            }, 1000);

            this.countDownToLongPause--; // Aggiorno il contatore che indica la pausa lunga
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
        /**
         * Mette in pausa il timer corrente
         * @param {string} btnClick 
         */
        btnPause(btnClick) {
            this.btnActive(btnClick); // Richiamo la funzione che attiva il pulsante cliccato
            clearInterval(this.interval); // Metto il timer in pausa
        },
        /**
         * Riavvia il timer corrente utilizzando il tempo rimanente salvato
         * @param {string} btnClick 
         */
        btnStart(btnClick) {
            this.btnActive(btnClick); // Richiamo la funzione che attiva il pulsante cliccato
            let endTime = new Date().getTime() + this.timeRemaining;
            this.startCountdown(endTime); // Riavvio il timer
        },
        /**
         * Stoppa il timer corrente impostando a 0 il countdown
         * @param {string} btnClick 
         */
        btnStop(btnClick) {
            this.btnActive(btnClick); // Richiamo la funzione che attiva il pulsante cliccato
            clearInterval(this.interval); // Stoppo il timer
            this.countDown = `00:00`;
            this.timeEnd = true;
            this.timeRemaining = "";
        },
    },
})

app.mount("#app");