"use strict";

const app = Vue.createApp({
    data() {
        return {
            start: false,
            textInsert: "",
            textsCount: {
                characters: 0,
                charactersWidthSpace: 0,
                words: "",
                phrases: 0,
                paragraphs: 0,
                mostRepeatedWord: {
                    wordRepeat: "",
                    numberOfRepetitions: 0,
                },
            }
        }
    },
    methods: {
        /**
         * Calcola diverse statistiche circa il testo inserito dall'utente
         */
        viewCount() {
            this.start = true;
            let arrayTotalCharacters = this.textInsert.split("");
            let space = 0;
            let endPhrase = 0;

            arrayTotalCharacters.forEach(character => {
                if (character === " ") {
                    space++;
                }
                if (character === "!" || character === "?" || character === ".") {
                    endPhrase++;
                }
            });

            this.textsCount.characters = this.textInsert.length - space; // Caratteri spazi esclusi
            this.textsCount.charactersWidthSpace = this.textInsert.length; // Caratteri totali
            this.countWords(); // Numero di parole
            this.textsCount.phrases = endPhrase; // Numero di frasi            
            this.countParagraphs() // Numero di paragrafi    
        },
        /**
         * Conta il numero di parole presenti
         */
        countWords() {
            let delimiters = [" ", "\n"];
            let arrayTotalWords = [];
            let currentWord = '';

            for (let i = 0; i < this.textInsert.length; i++) {
                if (delimiters.includes(this.textInsert[i])) {
                    this.textsCount.words++;
                    if (currentWord !== '') {
                        arrayTotalWords.push(currentWord);
                        currentWord = '';
                    }
                } else {
                    currentWord += this.textInsert[i];
                }
            }

            this.wordRepeat(arrayTotalWords); // Parola più ripetuta
        },
        /**
         * Conta da quanti paragrafi è formato il testo inserito
         */
        countParagraphs() {
            let delimiters = [".", "?", "!"];
            for (let i = 0; i < this.textInsert.length; i++) {
                if (delimiters.includes(this.textInsert[i])) {
                    // Controllo se il carattere successivo è un carattere di invio
                    if (this.textInsert[i + 1] === "\n" || i === this.textInsert.length - 1) {
                        this.textsCount.paragraphs++;
                    }
                }
            }
        },
        /**
         * Trova la parola ripetuta più volte all'interno del testo
         * @param {Array} arrayTotalWords 
         */
        wordRepeat(arrayTotalWords) {
            let repeatNumber = 0;
            let repatWord = "";

            for (let i = 0; i < arrayTotalWords.length; i++) {
                let repeatNumberNow = 0;
                let repatWordNow = arrayTotalWords[i];

                for (let z = 0; z < arrayTotalWords.length; z++) {
                    if (arrayTotalWords[i] === arrayTotalWords[z]) {
                        repeatNumberNow++;
                    }
                }

                if (repeatNumberNow > repeatNumber) {
                    repeatNumber = repeatNumberNow;
                    repatWord = repatWordNow;
                }
            }

            this.textsCount.mostRepeatedWord.wordRepeat = repatWord;
            this.textsCount.mostRepeatedWord.numberOfRepetitions = repeatNumber;
        },
    }
})

app.mount("#app");