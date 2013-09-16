var CardBuilder = require('./CardBuilder');

function RangeBuilder() {
    this.initialize();
    this.reset();
};

module.exports = RangeBuilder;

// --- External API ---
RangeBuilder.createBlankRange = function () {
    var range = {
        host:'',
        name:'',
        relay:'',
        cards:[]
    };

    return range;
};

RangeBuilder.prototype.reset = function () {
    this._range = this.constructor.createBlankRange();

    return this;
};

RangeBuilder.prototype.resetCards = function () {
    this._range.cards = [];

    return this;
};

RangeBuilder.prototype.getRange = function () {
    return this._range;
};

// --- Bulk setters ---
RangeBuilder.prototype.setRange = function (range) {
    this.reset();

    for (var key in this._range) {
        if (key != 'cards' && range.hasOwnProperty(key)) {
            this._range[key] = range[key];
        }
    }

    if (range.hasOwnProperty('cards')) {
        this.setCards(range.cards);
    }

    return this;
};

// --- Fine grained setters ---
RangeBuilder.prototype.setHost = function (host) {
    this._range.host = host;

    return this;
};

RangeBuilder.prototype.setName = function (name) {
    this._range.name = name;

    return this;
};

RangeBuilder.prototype.setRelay = function (relay) {
    this._range.relay = relay;

    return this;
};

RangeBuilder.prototype.setCards = function (cards) {
    this.resetCards();

    for (var idx in cards) {
        this.addCard(cards[idx]);
    }

    return this;
};

RangeBuilder.prototype.addCard = function (card) {
    card = this._cardBuilder.reset()
        .setCard(card)
        .getCard();
    this._range.cards.push(card);

    return this;
};

// --- Internal API ---
RangeBuilder.prototype.initialize = function () {
    this._cardBuilder = new CardBuilder();
};
