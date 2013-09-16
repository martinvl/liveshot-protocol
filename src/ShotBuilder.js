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

ShotBuilder.sanitizeShot = function (rawShot) {
    var shot = this.createBlankShot();

    for (var key in shot) {
        if (!rawShot.hasOwnProperty(key)) {
            continue;
        }

        shot[key] = rawShot[key];
    }

    return shot;
};

ShotBuilder.prototype.reset = function () {
    this._shot = this.constructor.createBlankShot();

    return this;
};

ShotBuilder.prototype.getShot = function () {
    return this._shot;
};

ShotBuilder.prototype.setShot = function (shot) {
    this.reset();

    for (var key in this._shot) {
        if (shot.hasOwnProperty(key)) {
            this._shot[key] = shot[key];
        }
    }

    return this;
};

ShotBuilder.prototype.setPosition = function (x, y) {
    this.setX(x);
    this.setY(y);

    return this;
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
