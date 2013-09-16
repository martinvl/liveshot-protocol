var ShotBuilder = require('./ShotBuilder');

function ResultBuilder() {
    this.initialize();
    this.reset();
}

module.exports = ResultBuilder;

// --- External API ---
ResultBuilder.createBlankResult = function () {
    var result = {
        seriesName:'',
        seriesSum:'',
        totalSum:'',
        shots:[]
    };

    return result;
};

ResultBuilder.prototype.reset = function () {
    this._result = this.constructor.createBlankResult();

    return this;
};

ResultBuilder.prototype.resetShots = function () {
    this._result.shots = [];

    return this;
};

ResultBuilder.prototype.getResult = function () {
    return this._result;
};

ResultBuilder.prototype.setResult = function (result) {
    this.reset();

    for (var key in this._result) {
        if (key != 'shots' && result.hasOwnProperty(key)) {
            this._result[key] = result[key];
        }
    }

    if (result.hasOwnProperty('shots')) {
        this.setShots(result.shots);
    }

    return this;
};

ResultBuilder.prototype.setSeriesName = function (seriesName) {
    this._result.seriesName = seriesName;

    return this;
};

ResultBuilder.prototype.setSeriesSum = function (seriesSum) {
    this._result.seriesSum = seriesSum;

    return this;
};

ResultBuilder.prototype.setTotalSum = function (totalSum) {
    this._result.totalSum = totalSum;

    return this;
};

ResultBuilder.prototype.setShots = function (shots) {
    this.resetShots();

    for (var idx in shots) {
        var shot = this._shotBuilder.reset()
            .setShot(shots[idx])
            .getShot();

        this.addShot(shot);
    }

    return this;
};

ResultBuilder.prototype.addShot = function (shot) {
    this._result.shots.push(shot);

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
