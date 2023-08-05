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
            imgClick.click = true;
        },
    },
    mounted() {
        this.randomMemoryImgsLists = this.randomMemoryCard(); // All'avvio della pagina genero l'array delle card
    },
})

app.mount("#app");