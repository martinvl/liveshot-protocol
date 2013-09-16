var Builder = require('./Builder');
var inherits = require('inherits');

function ConfigBuilder() {
    this.reset();
}

module.exports = ConfigBuilder;
inherits(ConfigBuilder, Builder);

ConfigBuilder._default = {
    gaugeSize:.02,
    targetID:'NO_DFS_200M'
};

ConfigBuilder.createBlankConfig = function () {
    return Builder.blankCopy(this._default);
};

ConfigBuilder.sanitizeConfig = function (config) {
    return Builder.sanitize(config, this._default);
};

ConfigBuilder.prototype.getConfig = function () {
    return this.getObject();
};

ConfigBuilder.prototype.setConfig = function (config) {
    return this.setObject(config);
};

ConfigBuilder.prototype.setGaugeSize = function (gaugeSize) {
    this._object.gaugeSize = gaugeSize;

    return this;
};

ConfigBuilder.prototype.setTargetID = function (targetID) {
    this._object.targetID = targetID;

    return this;
};
