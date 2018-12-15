//This is the player attached to the mouse/keyboard.


window.PlayerClass = class Player {
    constructor(app) {
        console.log("Main player constructor")
        this.Deck = ['Card_Hearts_Q', 'Card_Clubs_2', 'Card_Spades_2'] //remove this later when we can draw cards
        this.NextCardPosition = 1;
        this.DrawnCards = [];
        this.CardPositions = [];
        this.app = app; //we're not using the standard
                        // entity model here so we need
                        // to pass a ref to app
        for (let i = 1; i < 16; i++) { //card positions start at one.. hah
            let HandPosition = this.app.root.findByName(`Player1CardPlacement${i}`);
            if (!HandPosition) throw new Error("Card position is missing");
            this.CardPositions.push({
                Entity: HandPosition,
                Position: HandPosition.getPosition(),
                Filled: false,
                Name: `Player1CardPlacement${i}`,
                Slot: i,

            })
        }
        this.app.on('Player:Draw', this.DrawCardToHand.bind(this));
    }



    async DrawCardToHand() {

        let CardSlot = this.CardPositions.find(A => !A.Filled);

        if (!CardSlot) throw new Error("No Space left in hand")
        CardSlot.Filled = true;
        let MoveCardRequestedToLocation = CardSlot.Position;
        let DrawnCard = await this.AskServerForCard();

        this.DrawCardFromDeck(DrawnCard, MoveCardRequestedToLocation)
    }

    //faking server calls for now
    async AskServerForCard() {
        if (this.Deck.length === 0) return null;
        return this.Deck.shift();
    }

    CardCount() {
        return this.DrawnCards.length;
    }

    DrawCardFromDeck(CardName, HandPosition) {
        this.app.fire(`PlayingCard:Draw:${CardName}`, HandPosition);
    }

}


