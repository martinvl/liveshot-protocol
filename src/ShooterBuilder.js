var Builder = require('./Builder');
var inherits = require('inherits');

function ShooterBuilder() {
    this.reset();
}

module.exports = ShooterBuilder;
inherits(ShooterBuilder, Builder);

ShooterBuilder._default = {
    name:'',
    club:'',
    className:'',
    category:''
};

ShooterBuilder.createBlankShooter = function () {
    return Builder.blankCopy(this._default);
};

ShooterBuilder.sanitizeShooter = function (shooter) {
    return Builder.sanitize(shooter, this._default);
};

ShooterBuilder.prototype.getShooter = function () {
    return this.getObject();
};

ShooterBuilder.prototype.setShooter = function (shooter) {
    return this.setObject(shooter);
};

ShooterBuilder.prototype.setName = function (name) {
    this._object.name = name;

    return this;
};

ShooterBuilder.prototype.setClub = function (club) {
    this._object.club = club;

    return this;
};

ShooterBuilder.prototype.setClassName = function (className) {
    this._object.className = className;

    return this;
};

ShooterBuilder.prototype.setCategory = function (category) {
    this._object.category = category;

    return this;
};
