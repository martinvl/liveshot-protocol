function RangeBuilder() {
    this.reset();
};

module.exports = RangeBuilder;

// --- External API ---
RangeBuilder.createBlankRange = function () {
    var range = {
        host:'',
        name:'',
        relay:'',
        cards:[],
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
    this._range.cards.push(card);

    return this;
};
