function TargetBuilder() {
    this.reset();
}

module.exports = TargetBuilder;

TargetBuilder.createBlankTarget = function () {
    var target = {
        ringSizes:[1.],
        scale:1,
        gaugeSize:.01,
        blackSize:.4,
        numbersFrom:1,
        numbersTo:1
    };

    return target;
};

TargetBuilder.prototype.reset = function () {
    this._target = TargetBuilder.createBlankTarget();

    return this;
};

TargetBuilder.prototype.getTarget = function () {
    return this._target;
};

TargetBuilder.prototype.setRingSizes = function (ringSizes) {
    this._target.ringSizes = ringSizes;

    return this;
};

TargetBuilder.prototype.setScale = function (scale) {
    this._target.scale = scale;

    return this;
};

TargetBuilder.prototype.setGaugeSize = function (gaugeSize) {
    this._target.gaugeSize = gaugeSize;

    return this;
};

TargetBuilder.prototype.setBlackSize = function (blackSize) {
    this._target.blackSize = blackSize;

    return this;
};

TargetBuilder.prototype.setNumbersFrom = function (numbersFrom) {
    this._target.numbersFrom = numbersFrom;

    return this;
};

TargetBuilder.prototype.setNumbersTo = function (numbersTo) {
    this._target.numbersTo = numbersTo;

    return this;
};
