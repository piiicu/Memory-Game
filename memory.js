class Card {
    image;
    hasFaceUp = false

    constructor(image) {
        this.image = image
    }

    turnFaceUp() {
        this.hasFaceUp = true
    }

    turnFaceDown() {
        this.hasFaceUp = false
    }
}

class Game {
    cards

    constructor(cards) {
        this.cards = cards
    }

    shuffle() {
        this.cards.sort(() => Math.random() - 0.5)
    }

    isOver() {
        // toate cartile sunt pe fata
        return this.cards.every((card) => card.hasFaceUp)
    }
}

class Dealer {
    game
    activeCards = []

    constructor(game) {
        this.game = game
        game.shuffle()
    }

    turnCard(card) {
        // daca sunt deja intoarse 2 carti active
        // sau jocul s-a terminat 
        // sau cartea este deja pe fata
        // nu mai intoarce nici o carte
        if(this.activeCards.length == 2 || this.game.isOver() || card.hasFaceUp) {
            return
        } 
        card.turnFaceUp()
        // tin minte cartea pe care am deschis-o
        this.activeCards.push(card)
        // daca sunt 2 carti active, le ascund dupa o secunda 
        if(this.activeCards.length == 2) {
            // daca au aceeasi imagine
            if(this.activeCards[0].image == this.activeCards[1].image) {
                this.activeCards = []
                return
            }
            // daca nu au aceeasi imagine le ascund dupa 1 sec
            setTimeout(this.hideCards, 1000)
        }
    }

    hideCards = () => {
        // intoarce inapoi cu fata in jos ultimile 2 carti afisate
        this.activeCards.forEach(
            (card) => card.turnFaceDown()
        )
        // reseteaza lista de carti, si trebuie sa intoarcem alte 2 carti
        this.activeCards = []
    }
}

new Vue({
    el: '#app',
    data() {
        return {
            dealer: new Dealer(
                new Game(
                    [
                        new Card('bear.png'),
                        new Card('corgi.png'),
                        new Card('crab.png'),
                        new Card('fish.png'),
                        new Card('panda.png'),
                        new Card('parrot.png'),
                        new Card('pig.png'),
                        new Card('rabbit.png'),
                        new Card('rhinoceros.png'),
                        new Card('shark.png'),
                        new Card('snail.png'),
                        new Card('turtle.png'),
                        new Card('bear.png'),
                        new Card('corgi.png'),
                        new Card('crab.png'),
                        new Card('fish.png'),
                        new Card('panda.png'),
                        new Card('parrot.png'),
                        new Card('pig.png'),
                        new Card('rabbit.png'),
                        new Card('rhinoceros.png'),
                        new Card('shark.png'),
                        new Card('snail.png'),
                        new Card('turtle.png')
                    ]
                )
            )
        }
    },
    template: `
    <div class="game">
        <div 
            v-for="card in dealer.game.cards"
            :class="{card, faceUp: card.hasFaceUp}"
            @click="click(card)"
        >
        <img :src="'img/icons8-' + card.image">
        </div>
    </div>
    `,
    methods: {
        click(card) {
            this.dealer.turnCard(card)
        }
    },
})