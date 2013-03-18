const ShotBuilder = require('./ShotBuilder');

function ShotListBuilder() {
    this.reset();
    this._shotBuilder = new ShotBuilder();
}

module.exports = ShotListBuilder;

ShotListBuilder.createBlankShotList = function () {
    return [];
};

ShotListBuilder.prototype.reset = function () {
    this._shotList = this.constructor.createBlankShotList();
};

ShotListBuilder.prototype.getShotList = function () {
    return this._shotList;
};

ShotListBuilder.prototype.addShot = function (shot) {
    this._shotList.push(shot);

    return this;
};

ShotListBuilder.prototype.addShotForPosition = function (x, y, value) {
    var shot = this._shotBuilder.reset().
        setPosition(x, y).
        setValue(value).
        getShot();

    return this.addShot(shot);
};
