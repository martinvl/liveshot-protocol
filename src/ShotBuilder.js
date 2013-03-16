function ShotBuilder() {
    this.reset();
}

module.exports = ShotBuilder;

ShotBuilder.createBlankShot = function () {
    var shot = {
        x:0,
        y:0,
        value:''
    };

    return shot;
};

ShotBuilder.prototype.reset = function () {
    this._shot = ShotBuilder.createBlankShot();

    return this;
};

ShotBuilder.prototype.getShot = function () {
    return this._shot;
};

ShotBuilder.prototype.setPosition = function (x, y) {
    this.setX(x);
    this.setY(y);

    return this;
};

ShotBuilder.prototype.setPolarPosition = function (t, r) {
    var x = Math.cos(t) * r;
    var y = Math.sin(t) * r;

    return this.setPosition(x, y);
};

ShotBuilder.prototype.setScaledPosition = function (x, y, scale) {
    x /= scale;
    y /= scale;

    return this.setPosition(x, y);
};

ShotBuilder.prototype.setScaledPolarPosition = function (t, r, scale) {
    r /= scale;

    return this.setPolarPosition(t, r);
};

ShotBuilder.prototype.setX = function (x) {
    this._shot.x = x;

    return this;
};

ShotBuilder.prototype.setY = function (y) {
    this._shot.y = y;

    return this;
};

ShotBuilder.prototype.setValue = function (value) {
    this._shot.value = value;

    return this;
};
