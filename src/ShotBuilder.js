var Builder = require('./Builder');
var inherits = require('inherits');

function ShotBuilder() {
    this.reset();
}

module.exports = ShotBuilder;
inherits(ShotBuilder, Builder);

ShotBuilder._default = {
    x:0,
    y:0,
    value:''
};

ShotBuilder.createBlankShot = function () {
    return Builder.blankCopy(this._default);
};

ShotBuilder.sanitizeShot = function (shot) {
    return Builder.sanitize(shot, this._default);
};

ShotBuilder.prototype.getShot = function () {
    return this.getObject();
};

ShotBuilder.prototype.setShot = function (shot) {
    return this.setObject(shot);
};

ShotBuilder.prototype.setPosition = function (x, y) {
    this.setX(x);
    this.setY(y);

    return this;
};

ShotBuilder.prototype.setX = function (x) {
    this._object.x = x;

    return this;
};

ShotBuilder.prototype.setY = function (y) {
    this._object.y = y;

    return this;
};

ShotBuilder.prototype.setValue = function (value) {
    this._object.value = value;

    return this;
};
