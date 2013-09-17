var Builder = require('./Builder');
var inherits = require('inherits');
var CardBuilder = require('./CardBuilder');

function RangeBuilder() {
    this.initialize();
    this.reset();
};

module.exports = RangeBuilder;
inherits(RangeBuilder, Builder);

RangeBuilder._default = {
    host:'',
    name:'',
    relay:'',
    cards:[]
};

// --- External API ---
RangeBuilder.createBlankRange = function () {
    return Builder.blankCopy(this._default);
};

RangeBuilder.sanitizeRange = function (rawRange) {
    var range = Builder.sanitize(rawRange, this._default);

    for (var key in range.cards) {
        range.cards[key] = CardBuilder.sanitizeCard(range.cards[key]);
    }

    return range;
};

RangeBuilder.prototype.resetCards = function () {
    this._object.cards = [];

    return this;
};

RangeBuilder.prototype.getRange = function () {
    return this.getObject();
};

RangeBuilder.prototype.setRange = function (range) {
    this.setObject(range);
    this.setCards(range.cards || []);

    return this;
};

// --- Fine grained setters ---
RangeBuilder.prototype.setHost = function (host) {
    this._object.host = host;

    return this;
};

RangeBuilder.prototype.setName = function (name) {
    this._object.name = name;

    return this;
};

RangeBuilder.prototype.setRelay = function (relay) {
    this._object.relay = relay;

    return this;
};

RangeBuilder.prototype.setCards = function (cards) {
    this.resetCards();

    for (var idx in cards) {
        this.addCard(CardBuilder.sanitizeCard(cards[idx]));
    }

    return this;
};

RangeBuilder.prototype.addCard = function (card) {
    card = this._cardBuilder.reset()
        .setCard(card)
        .getCard();
    this._object.cards.push(card);

    return this;
};

// --- Internal API ---
RangeBuilder.prototype.initialize = function () {
    this._cardBuilder = new CardBuilder();
};
