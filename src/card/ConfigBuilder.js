function ConfigBuilder() {
    this.reset();
}

module.exports = ConfigBuilder;

ConfigBuilder.createBlankConfig = function () {
    var config = {
        gaugeSize:1,
        targetID:''
    };

    return config;
};

ConfigBuilder.prototype.reset = function () {
    this._config = this.constructor.createBlankConfig();

    return this;
};

ConfigBuilder.prototype.getConfig = function () {
    return this._config;
};

ConfigBuilder.prototype.setConfig = function (config) {
    for (var key in this._config)
        if (config.hasOwnProperty(key))
            this._config[key] = config[key];

    return this;
};

ConfigBuilder.prototype.setGaugeSize = function (gaugeSize) {
    this._config.gaugeSize = gaugeSize;

    return this;
};

ConfigBuilder.prototype.setTargetID = function (targetID) {
    this._config.targetID = targetID;

    return this;
};
