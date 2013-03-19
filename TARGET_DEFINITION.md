Target definitions
==================

TargetBuilder
-------------
Builds a target object. All properties must be present, but default to empty
placeholders, and are therefore optional.

```javascript
var target = new TargetBuilder()
    .setScale(300000)
    .setGaugeSize(.0133)
    .getTarget();
```

* TargetBuilder. **createBlankTarget**() - ( _object_ )  
    Static method. Creates and returns a new empty target, with all necessary
    fields present, but set to empty placeholder values.
* **reset**() - ( _TargetBuilder_ )  
    Resets the current target of the builder. Returns pointer to the builder
    for convenience.
* **getTarget**() - ( _object_ )  
    Returns pointer to the current target
* **setScale**(< _number_ >scale) - ( _TargetBuilder_ )  
    _scale_ is the real size of the target, with respect to the coordinates
    given for shots. For instance, a normal ten ring target with radius `300mm`,
    where the shot position is given in `mm` coordinates, has scale `300`. This
    is highly optional, and can easily be avoided if all shot coordinates are
    normalized (i.e. `-1 <= x, y <= 1`).
* **setGaugeSize**(< _number_ >gaugeSize) - ( _TargetBuilder_ )  
    _gaugeSize_ is the size of the gauge used with respect to the target size. For
    instance, a target with radius `300mm` and a gauge with radius `4mm`,
    _gaugeSize_ should be `4mm / 300mm = .0133`.

RingTargetBuilder
-----------------
Subclass of TargetBuilder, contains some additional setters:

```javascript
var target = new RingTargetBuilder()
    .setRingSizes([1., .9, .8, .7, .6, .5, .4, .3, .2, .1, .05])
    .setScale(300000)
    .setGaugeSize(.0133)
    .setBlackSize(.4)
    .setNumbersFrom(1)
    .setNumbersTo(9)
    .getTarget();
```

* **setRingSizes**(< _array_ >ringSizes) - ( _RingTargetBuilder_ )  
    _ringSizes_ should be a stricly decreasing positive sequence of
    numbers. Each number represents the radius of a ring on the target. The
    largest should ring always have size `1`.
* **setBlackSize**(< _number_ >blackSize) - ( _RingTargetBuilder_ )  
    _blackSize_ is the size of the black disc with repect to the target size.
    For instance, a target with radius `300mm` and a black disc with radius
    `120mm`, _blackSize_ should be `120mm / 300mm = .4`.
* **setNumbersFrom**(< _number_ >numbersFrom) - ( _RingTargetBuilder_ )
* **setNumbersTo**(< _number_ >numbersFrom) - ( _RingTargetBuilder_ )
