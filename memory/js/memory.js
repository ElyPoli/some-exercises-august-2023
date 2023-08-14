"use strict";

const app = Vue.createApp({
    data() {
        return {
            memoryImgsLists: [
                {
                    id: "",
                    img: "-1",
                    click: false,
                },
                {
                    id: "",
                    img: "-2",
                    click: false,
                },
                {
                    id: "",
                    img: "-3",
                    click: false,
                },
                {
                    id: "",
                    img: "-4",
                    click: false,
                },
                {
                    id: "",
                    img: "-5",
                    click: false,
                },
                {
                    id: "",
                    img: "-6",
                    click: false,
                },
                {
                    id: "",
                    img: "-7",
                    click: false,
                },
                {
                    id: "",
                    img: "-8",
                    click: false,
                },
                {
                    id: "",
                    img: "-9",
                    click: false,
                },
                {
                    id: "",
                    img: "-10",
                    click: false,
                },
                {
                    id: "",
                    img: "-11",
                    click: false,
                },
                {
                    id: "",
                    img: "-12",
                    click: false,
                },
                {
                    id: "",
                    img: "-13",
                    click: false,
                },
                {
                    id: "",
                    img: "-14",
                    click: false,
                },
                {
                    id: "",
                    img: "-15",
                    click: false,
                },
                {
                    id: "",
                    img: "-16",
                    click: false,
                },
            ],
            randomMemoryImgsLists: [],
            lastImgClick: {
                id: "",
                img: "",
                click: false,
            },
            stopClick: false,
            firstClick: true,
            endGame: false,
            winner: "",
            totalCardsRevealed: 0,
            player: {
                count: 1,
                scorePlayerOne: 0,
                scorePlayerTwo: 0,
            }
        }
    },
    methods: {
        /**
         * Genera una lista di carte random partendo dall'array originale "memoryImgsLists"
         * @returns {Array}
         */
        randomMemoryCard() {
            // Creo un array contenente due volte l'array di partenza
            let duplicatedMemoryImgsLists = [...this.memoryImgsLists, ...this.memoryImgsLists];

            // Randomizzo l'ordine delle card create
            let shuffledMemoryImgsLists = [];
            while (duplicatedMemoryImgsLists.length > 0) {
                let randomIndex = Math.floor(Math.random() * duplicatedMemoryImgsLists.length);
                let randomElement = duplicatedMemoryImgsLists[randomIndex]; // Estraggo l'elemento corrispondente all'indice casuale
                shuffledMemoryImgsLists.push(randomElement); // Aggiungo l'elemento estratto all'array mescolato
                duplicatedMemoryImgsLists.splice(randomIndex, 1); // Rimuovo l'elemento estratto dall'array originale
            }

            // Assegno un id univoco a ciascun oggetto nell'array casuale
            this.randomMemoryImgsLists = [];
            for (let i = 0; i < shuffledMemoryImgsLists.length; i++) {
                this.randomMemoryImgsLists.push({
                    ...shuffledMemoryImgsLists[i],
                    id: i + 1
                });
            }

            return this.randomMemoryImgsLists;
        },
        /**
         * Rende visibile la carta corrispondente all'id cliccato
         * @param {Object} imgId 
         */
        revealCard(imgClick) {
            if (this.firstClick === true) {
                imgClick.click = true;
                this.firstClick = false;

                // Salvo la prima immagine cliccata
                this.lastImgClick.img = imgClick.img;
                this.lastImgClick.id = imgClick.id;
                this.lastImgClick.click = imgClick.click;
            } else {
                imgClick.click = true;
                this.disableCardClicks(); // Rendo momentaneamente non cliccabili le card
                if (this.lastImgClick.img != imgClick.img) {
                    // Dopo un secondo le nascondo nascondo entrambe le carte 
                    setTimeout(() => {
                        imgClick.click = false;
                        this.randomMemoryImgsLists[this.lastImgClick.id - 1].click = false;
                    }, 1000);
                } else {
                    this.totalCardsRevealed++;
                    // Aggiorno il punteggio
                    if (this.player.count === 1) {
                        this.player.scorePlayerOne++;
                    } else {
                        this.player.scorePlayerTwo++;
                    }
                }
            }

            // Controllo se sono state rivelate tutte le carte
            if (this.totalCardsRevealed === 16) {
                this.endGame = true;

                // Controllo il vincitore
                if (this.player.scorePlayerOne > this.player.scorePlayerTwo) {
                    this.winner = "Great Job, Player 1! You're the Winner";
                } else if (this.player.scorePlayerOne < this.player.scorePlayerTwo) {
                    this.winner = "Great Job, Player 2! You're the Winner";
                } else {
                    this.winner = "Memory Duel Ends in a Tie! Keep Playing!";
                }
            }
        },
        /**
         * Rende tutte le card momentaneamente non cliccabili e aggiorna il turno
         */
        disableCardClicks() {
            this.stopClick = true;
            setTimeout(() => {
                this.stopClick = false;

                // Aggiorno il turno
                if (this.player.count === 1) {
                    this.player.count = 2;
                } else {
                    this.player.count = 1;
                }
                this.firstClick = true;
            }, 1100);
        },
    },
    mounted() {
        this.randomMemoryImgsLists = this.randomMemoryCard(); // All'avvio della pagina genero l'array delle card
    },
})

app.mount("#app");