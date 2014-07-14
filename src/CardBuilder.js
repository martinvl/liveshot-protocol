var Builder = require('./Builder');
var inherits = require('inherits');
var ConfigBuilder = require('./ConfigBuilder');
var ResultBuilder = require('./ResultBuilder');
var ShooterBuilder = require('./ShooterBuilder');

function CardBuilder() {
    this.initialize();
    this.reset();
}

module.exports = CardBuilder;
inherits(CardBuilder, Builder);

CardBuilder._default = {
    lane:'',
    shooter:ShooterBuilder.createBlankShooter(),
    result:ResultBuilder.createBlankResult(),
    config:ConfigBuilder.createBlankConfig()
};

// --- External API ---
CardBuilder.createBlankCard = function () {
    return Builder.blankCopy(this._default);
};

CardBuilder.sanitizeCard = function (rawCard) {
    var card = Builder.sanitize(rawCard, this._default);

    card.shooter = ShooterBuilder.sanitizeShooter(card.shooter);
    card.result = ResultBuilder.sanitizeResult(card.result);
    card.config = ConfigBuilder.sanitizeConfig(card.config);

    return card;
};

CardBuilder.prototype.reset = function () {
    Builder.prototype.reset.apply(this);

    this._object.shooter = this._shooterBuilder.reset().getShooter();
    this._object.result = this._resultBuilder.reset().getResult();
    this._object.config = this._configBuilder.reset().getConfig();

    return this;
};

CardBuilder.prototype.getCard = function () {
    return this.getObject();
};

// --- Bulk setters ---
CardBuilder.prototype.setCard = function (card) {
    this.setObject(card);

    this.setConfig(card.config || {});
    this.setResult(card.result || {});
    this.setShooter(card.shooter || {});

    return this;
};

CardBuilder.prototype.setConfig = function (config) {
    this._object.config = this._configBuilder.setConfig(config).getConfig();

    return this;
};

CardBuilder.prototype.resetConfig = function () {
    this._object.config = this._configBuilder.reset().getConfig();

    return this;
};

CardBuilder.prototype.setResult = function (result) {
    this._object.result = this._resultBuilder.setResult(result).getResult();

    return this;
};

CardBuilder.prototype.resetResult = function () {
    this._object.result = this._resultBuilder.reset().getResult();

    return this;
};

CardBuilder.prototype.setShooter = function (shooter) {
    this._object.shooter = this._shooterBuilder.setShooter(shooter).getShooter();

    return this;
};

CardBuilder.prototype.resetShooter = function () {
    this._object.shooter = this._shooterBuilder.reset().getShooter();

    return this;
};

// --- Fine grained setters ---
CardBuilder.prototype.setLane = function (lane) {
    this._object.lane = lane;

    return this;
};

CardBuilder.prototype.setName = function (name) {
    this._object.shooter = this._shooterBuilder.setName(name).getShooter();

    return this;
};

CardBuilder.prototype.setClub = function (club) {
    this._object.shooter = this._shooterBuilder.setClub(club).getShooter();

    return this;
};

CardBuilder.prototype.setClassName = function (className) {
    this._object.shooter = this._shooterBuilder.setClassName(className).getShooter();

    return this;
};

CardBuilder.prototype.setCategory = function (category) {
    this._object.shooter = this._shooterBuilder.setCategory(category).getShooter();

    return this;
};

CardBuilder.prototype.setSeriesName = function (seriesName) {
    this._object.result = this._resultBuilder.setSeriesName(seriesName).getResult();

    return this;
};

CardBuilder.prototype.setSeriesSum = function (seriesSum) {
    this._object.result = this._resultBuilder.setSeriesSum(seriesSum).getResult();

    return this;
};

CardBuilder.prototype.setTotalSum = function (totalSum) {
    this._object.result = this._resultBuilder.setTotalSum(totalSum).getResult();

    return this;
};

CardBuilder.prototype.setMarking = function (marking) {
    this._object.result = this._resultBuilder.setMarking(marking).getResult();

    return this;
};

CardBuilder.prototype.setGaugeSize = function (gaugeSize) {
    this._object.config = this._configBuilder.setGaugeSize(gaugeSize).getConfig();

    return this;
};

CardBuilder.prototype.setTargetID = function (targetID) {
    this._object.config = this._configBuilder.setTargetID(targetID).getConfig();

    return this;
};

CardBuilder.prototype.setShots = function (shots) {
    this._object.result = this._resultBuilder.setShots(shots).getResult();

    return this;
};

CardBuilder.prototype.resetShots = function () {
    this._object.result = this._resultBuilder.resetShots().getResult();

    return this;
};

CardBuilder.prototype.addShot = function (shot) {
    this._object.result = this._resultBuilder.addShot(shot).getResult();

    return this;
};

CardBuilder.prototype.addShotData = function (x, y, value) {
    this._object.result = this._resultBuilder.addShotData(x, y, value).getResult();

    return this;
};

// --- Internal API ---
CardBuilder.prototype.initialize = function () {
    this._shooterBuilder = new ShooterBuilder();
    this._resultBuilder = new ResultBuilder();
    this._configBuilder = new ConfigBuilder();
};
