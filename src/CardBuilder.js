var ConfigBuilder = require('./ConfigBuilder');
var ResultBuilder = require('./ResultBuilder');
var ShooterBuilder = require('./ShooterBuilder');

function CardBuilder() {
    this.initialize();
    this.reset();
}

module.exports = CardBuilder;

// --- External API ---
CardBuilder.createBlankCard = function () {
    var card = {
        lane:'',
        shooter:ShooterBuilder.createBlankShooter(),
        result:ResultBuilder.createBlankResult(),
        config:ConfigBuilder.createBlankConfig()
    };

    return card;
};

CardBuilder.prototype.reset = function () {
    this._card = this.constructor.createBlankCard();

    this._card.shooter = this._shooterBuilder.reset().getShooter();
    this._card.result = this._resultBuilder.reset().getResult();
    this._card.config = this._configBuilder.reset().getConfig();

    return this;
};

CardBuilder.prototype.getCard = function () {
    return this._card;
};

// --- Bulk setters ---
CardBuilder.prototype.setCard = function (card) {
    this.reset();

    for (var key in this._card) {
        if (key != 'shooter' && key != 'result'
                && key != 'config' && card.hasOwnProperty(key)) {
            this._card[key] = card[key];
        }
    }

    if (card.hasOwnProperty('config')) {
        this.setConfig(card.config);
    }

    if (card.hasOwnProperty('result')) {
        this.setResult(card.result);
    }

    if (card.hasOwnProperty('shooter')) {
        this.setShooter(card.shooter);
    }

    return this;
};

CardBuilder.prototype.setConfig = function (config) {
    this._card.config = this._configBuilder.setConfig(config).getConfig();

    return this;
};

CardBuilder.prototype.setResult = function (result) {
    this._card.result = this._resultBuilder.setResult(result).getResult();

    return this;
};

CardBuilder.prototype.setShooter = function (shooter) {
    this._card.shooter = this._shooterBuilder.setShooter(shooter).getShooter();

    return this;
};

// --- Fine grained setters ---
CardBuilder.prototype.setLane = function (lane) {
    this._card.lane = lane;

    return this;
};

CardBuilder.prototype.setName = function (name) {
    this._shooterBuilder.setName(name);

    return this;
};

CardBuilder.prototype.setClub = function (club) {
    this._shooterBuilder.setClub(club);

    return this;
};

CardBuilder.prototype.setClassName = function (className) {
    this._shooterBuilder.setClassName(className);

    return this;
};

CardBuilder.prototype.setCategory = function (category) {
    this._shooterBuilder.setCategory(category);

    return this;
};

CardBuilder.prototype.setSeriesName = function (seriesName) {
    this._resultBuilder.setSeriesName(seriesName);

    return this;
};

CardBuilder.prototype.setSeriesSum = function (seriesSum) {
    this._resultBuilder.setSeriesSum(seriesSum);

    return this;
};

CardBuilder.prototype.setTotalSum = function (totalSum) {
    this._resultBuilder.setTotalSum(totalSum);

    return this;
};

CardBuilder.prototype.setGaugeSize = function (gaugeSize) {
    this._configBuilder.setGaugeSize(gaugeSize);

    return this;
};

CardBuilder.prototype.setTargetID = function (targetID) {
    this._configBuilder.setTargetID(targetID);

    return this;
};

CardBuilder.prototype.setShots = function (shots) {
    this._card.result = this._resultBuilder.setShots(shots).getResult();

    return this;
};

CardBuilder.prototype.resetShots = function () {
    this._card.result = this._resultBuilder.resetShots().getResult();

    return this;
};

CardBuilder.prototype.addShot = function (shot) {
    this._card.result = this._resultBuilder.addShot(shot).getResult();

    return this;
};

CardBuilder.prototype.addShotData = function (x, y, value) {
    this._card.result = this._resultBuilder.addShotData(x, y, value).getResult();

    return this;
};

// --- Internal API ---
CardBuilder.prototype.initialize = function () {
    this._shooterBuilder = new ShooterBuilder();
    this._resultBuilder = new ResultBuilder();
    this._configBuilder = new ConfigBuilder();
};
