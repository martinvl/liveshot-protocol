function TargetBuilder() {
    this.reset();
}

module.exports = TargetBuilder;

TargetBuilder.createBlankTarget = function () {
    var target = {
        scale:1,
        gaugeSize:.01
    };

    return target;
};

TargetBuilder.prototype.reset = function () {
    this._target = this.constructor.createBlankTarget();

    return this;
};

TargetBuilder.prototype.getTarget = function () {
    return this._target;
};

TargetBuilder.prototype.setScale = function (scale) {
    this._target.scale = scale;

    return this;
};

TargetBuilder.prototype.setGaugeSize = function (gaugeSize) {
    this._target.gaugeSize = gaugeSize;

    return this;
};
