var TargetBuilder = require('./TargetBuilder');

function RingTargetBuilder() {
    TargetBuilder.prototype.constructor.apply(this);
}

RingTargetBuilder.prototype = new TargetBuilder();
RingTargetBuilder.prototype.constructor = RingTargetBuilder;
module.exports = RingTargetBuilder;

RingTargetBuilder.createBlankTarget = function () {
    var target = TargetBuilder.createBlankTarget();

    target.ringSizes = [1.];
    target.blackSize = [1.];
    target.numbersFrom = 1;
    target.numbersTo = 1;

    return target;
};

RingTargetBuilder.prototype.setRingSizes = function (ringSizes) {
    this._target.ringSizes = ringSizes;

    return this;
};

RingTargetBuilder.prototype.setBlackSize = function (blackSize) {
    this._target.blackSize = blackSize;

    return this;
};

RingTargetBuilder.prototype.setNumbersFrom = function (numbersFrom) {
    this._target.numbersFrom = numbersFrom;

    return this;
};

RingTargetBuilder.prototype.setNumbersTo = function (numbersTo) {
    this._target.numbersTo = numbersTo;

    return this;
};
