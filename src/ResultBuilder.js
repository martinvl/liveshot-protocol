var Builder = require('./Builder');
var ShotBuilder = require('./ShotBuilder');
var inherits = require('inherits');

function ResultBuilder() {
    this.initialize();
    this.reset();
}

module.exports = ResultBuilder;
inherits(ResultBuilder, Builder);

ResultBuilder._default = {
    seriesName:'',
    seriesSum:'',
    totalSum:'',
    marking:false,
    shots:[]
};

// --- External API ---
ResultBuilder.createBlankResult = function () {
    return Builder.blankCopy(this._default);
};

ResultBuilder.sanitizeResult = function (rawResult) {
    var result = Builder.sanitize(rawResult, this._default);

    for (var key in result.shots) {
        result.shots[key] = ShotBuilder.sanitizeShot(result.shots[key]);
    }

    return result;
};

ResultBuilder.prototype.resetShots = function () {
    this._object.shots = [];

    return this;
};

ResultBuilder.prototype.getResult = function () {
    return this.getObject();
};

ResultBuilder.prototype.setResult = function (result) {
    this.setObject(result);
    this.setShots(result.shots || []);

    return this;
};

ResultBuilder.prototype.setSeriesName = function (seriesName) {
    this._object.seriesName = seriesName;

    return this;
};

ResultBuilder.prototype.setSeriesSum = function (seriesSum) {
    this._object.seriesSum = seriesSum;

    return this;
};

ResultBuilder.prototype.setTotalSum = function (totalSum) {
    this._object.totalSum = totalSum;

    return this;
};

ResultBuilder.prototype.setMarking = function (marking) {
    this._object.marking = marking;

    return this;
};

ResultBuilder.prototype.setShots = function (shots) {
    this.resetShots();

    for (var idx in shots) {
        this.addShot(ShotBuilder.sanitizeShot(shots[idx]));
    }

    return this;
};

ResultBuilder.prototype.addShot = function (shot) {
    this._object.shots.push(shot);

    return this;
};

ResultBuilder.prototype.addShotData = function (x, y, value) {
    var shot = this._shotBuilder.reset()
        .setPosition(x, y)
        .setValue(value)
        .getShot();

    return this.addShot(shot);
};

// --- Internal API ---
ResultBuilder.prototype.initialize = function () {
    this._shotBuilder = new ShotBuilder();
};
