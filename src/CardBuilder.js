const TargetBuilder = require('./TargetBuilder');
const ShotListBuilder = require('./ShotListBuilder');

function CardBuilder() {
    this.reset();
}

module.exports = CardBuilder;

CardBuilder.createBlankCard = function () {
    var card = {
        name:'',
        lane:'',
        club:'',
        className:'',
        category:'',
        shots:ShotListBuilder.createBlankShotList(),
        seriesSum:'',
        totalSum:'',
        target:TargetBuilder.createBlankTarget()
    };

    return card;
};

CardBuilder.prototype.reset = function () {
    this._card = CardBuilder.createBlankCard();

    return this;
};

CardBuilder.prototype.getCard = function () {
    return this._card;
};

CardBuilder.prototype.setName = function (name) {
    this._card.name = name;

    return this;
};

CardBuilder.prototype.setLane = function (lane) {
    this._card.lane = lane;

    return this;
};

CardBuilder.prototype.setClub = function (club) {
    this._card.club = club;

    return this;
};

CardBuilder.prototype.setClassName = function (className) {
    this._card.className = className;

    return this;
};

CardBuilder.prototype.setCategory = function (category) {
    this._card.category = category;

    return this;
};

CardBuilder.prototype.setShots = function (shots) {
    this._card.shots = shots;

    return this;
};

CardBuilder.prototype.setSeriesSum = function (seriesSum) {
    this._card.seriesSum = seriesSum;

    return this;
};

CardBuilder.prototype.setTotalSum = function (totalSum) {
    this._card.totalSum = totalSum;

    return this;
};

CardBuilder.prototype.setTarget = function (target) {
    this._card.target = target;

    return this;
};
