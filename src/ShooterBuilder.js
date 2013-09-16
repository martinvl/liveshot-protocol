function ShooterBuilder() {
    this.reset();
}

module.exports = ShooterBuilder;

ShooterBuilder.createBlankShooter = function () {
    var shooter = {
        name:'',
        club:'',
        className:'',
        category:''
    };

    return shooter;
};

ShooterBuilder.prototype.reset = function () {
    this._shooter = this.constructor.createBlankShooter();

    return this;
};

ShooterBuilder.prototype.getShooter = function () {
    return this._shooter;
};

ShooterBuilder.prototype.setShooter = function (shooter) {
    this.reset();

    for (var key in this._shooter) {
        if (shooter.hasOwnProperty(key)) {
            this._shooter[key] = shooter[key];
        }
    }

    return this;
};

ShooterBuilder.prototype.setName = function (name) {
    this._shooter.name = name;

    return this;
};

ShooterBuilder.prototype.setClub = function (club) {
    this._shooter.club = club;

    return this;
};

ShooterBuilder.prototype.setClassName = function (className) {
    this._shooter.className = className;

    return this;
};

ShooterBuilder.prototype.setCategory = function (category) {
    this._shooter.category = category;

    return this;
};
