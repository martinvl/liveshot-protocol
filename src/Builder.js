function Builder() {
    this.reset();
}

module.exports = Builder;

// --- Static methods ---
Builder.blankCopy = function (defaultObject) {
    return cloneDeep(defaultObject);
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
    return cloneDeep(this._object);
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

        var value = from[key];

        if (value instanceof Array) {
            to[key] = [].concat(value);
        } else {
            to[key] = value;
        }
    }

    return to;
}

function clone(object) {
    var copy = {};

    for (var key in object) {
        var value = object[key];

        if (value instanceof Array) {
            copy[key] = [].concat(value);
        } else {
            copy[key] = value;
        }
    }

    return copy;
}

function cloneDeep(object) {
    if (!(object instanceof Object)) {
        return object;
    }

    var copy = {};

    for (var key in object) {
        var value = object[key];

        if (value instanceof Array) {
            copy[key] = [];

            for (var idx in value) {
                copy[key].push(cloneDeep(value[idx]));
            }
        } else {
            copy[key] = cloneDeep(value);
        }
    }

    return copy;
}
