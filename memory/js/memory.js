"use strict";

const app = Vue.createApp({
    data() {
        return {
            memoryImgsLists: [
                {
                    img: "-1",
                    click: false,
                },
                {
                    img: "-2",
                    click: false,
                },
                {
                    img: "-3",
                    click: false,
                },
                {
                    img: "-4",
                    click: false,
                },
                {
                    img: "-5",
                    click: false,
                },
                {
                    img: "-6",
                    click: false,
                },
                {
                    img: "-7",
                    click: false,
                },
                {
                    img: "-8",
                    click: false,
                },
                {
                    img: "-9",
                    click: false,
                },
                {
                    img: "-10",
                    click: false,
                },
                {
                    img: "-11",
                    click: false,
                },
                {
                    img: "-12",
                    click: false,
                },
                {
                    img: "-13",
                    click: false,
                },
                {
                    img: "-14",
                    click: false,
                },
                {
                    img: "-15",
                    click: false,
                },
                {
                    img: "-16",
                    click: false,
                },
            ]
        }
    },
    methods: {
        /**
         * Genera una lista di carte random partendo dall'array originale "memoryImgsLists"
         * @returns {Array}
         */
        randomMemoryCard() {
            // Creo un array contenente due volte l'array di partenza
            let copyMemoryImgsLists = [...this.memoryImgsLists];
            let duplicatedMemoryImgsLists = copyMemoryImgsLists.concat(copyMemoryImgsLists);

            // Randomizzo l'ordine delle card create
            let randomMemoryImgsLists = [];
            for (let i = duplicatedMemoryImgsLists.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                randomMemoryImgsLists[i] = duplicatedMemoryImgsLists[j];
                randomMemoryImgsLists[j] = duplicatedMemoryImgsLists[i];
            }

            return randomMemoryImgsLists;
        },
    },
})

app.mount("#app");