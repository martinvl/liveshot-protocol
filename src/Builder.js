function Builder() {
    this.reset();
}

module.exports = Builder;

// --- Static methods ---
Builder.blankCopy = function (defaultObject) {
    return clone(defaultObject);
};

Builder.sanitize = function (rawObject, defaultObject) {
    return set(rawObject, this.blankCopy(defaultObject));
};

// --- Non-static methods ---
Builder._default = {};

Builder.prototype.reset = function () {
    this._object = Builder.blankCopy(this.constructor._default);

    return this;
};

Builder.prototype.getObject = function () {
    return clone(this._object);
};

Builder.prototype.setObject = function (rawObject) {
    this._object = Builder.sanitize(rawObject, this.constructor._default);

    return this;
};

// --- Internal helpers ---
/** Copies all existing fields in 'to' from 'from' */
function set(from, to) {
    for (var key in to) {
        if (!from.hasOwnProperty(key)) {
            continue;
        }

        to[key] = from[key];
    }

    return to;
}

function clone(object) {
    var copy = {};

    for (var key in object) {
        copy[key] = object[key];
    }

    return copy;
}
