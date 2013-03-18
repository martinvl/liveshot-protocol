LiveShot protocol
=================
Protocol specification for data formats used in LiveShot. The protocol is
implemented through various builders.

CardBuilder
-----------
Builds a card object. All properties must be present, but default to empty
placeholders, and are therefore optional.

```javascript
var card = new CardBuilder()
    .setName('Martin')
    .setLane('1')
    .setClub('Rygge')
    .setClassName('4')
    .setCategory('A')
    .setSeriesSum('50')
    .setTotalSum('150')
    .getCard();
```

* CardBuilder. **createBlankCard**() - ( _object_ )  
    Static method. Creates and returns a new empty card, with all necessary
    fields present, but set to empty placeholder values.
* **reset**() - ( _CardBuilder_ )  
    Resets the current card of the builder. Returns pointer to the builder for
    convenience.
* **getCard**() - ( _object_ )  
    Returns pointer to the current card
* **setName**(< _string_ >name) - ( _CardBuilder_ )
* **setLane**(< _string_ >lane) - ( _CardBuilder_ )
* **setClub**(< _string_ >club) - ( _CardBuilder_ )
* **setClassName**(< _string_ >className) - ( _CardBuilder_ )
* **setCategory**(< _string_ >category) - ( _CardBuilder_ )
* **setShots**(< _object_ >shots) - ( _CardBuilder_ )  
    _shots_ should be object created by ShotListBuilder
* **setSeriesSum**(< _string_ >seriesSum) - ( _CardBuilder_ )
* **setTotalSum**(< _string_ >totalSum) - ( _CardBuilder_ )
* **setTarget**(< _object_ >target) - ( _CardBuilder_ )  
    _target_ should be object created by TargetBuilder

TargetBuilder
-------------
Builds a target object. All properties must be present, but default to empty
placeholders, and are therefore optional.

```javascript
var target = new TargetBuilder()
    .setRingSizes([1., .9, .8, .7, .6, .5, .4, .3, .2, .1, .05])
    .setScale(300000)
    .setGaugeSize(.0133)
    .setBlackSize(.4)
    .setNumbersFrom(1)
    .setNumbersTo(9)
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
* **setRingSizes**(< _array_ >ringSizes) - ( _TargetBuilder_ )  
    _ringSizes_ should be a stricly decreasing positive sequence of
    numbers. Each number represents the radius of a ring on the target. The
    largest should ring always have size `1`.
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
* **setBlackSize**(< _number_ >blackSize) - ( _TargetBuilder_ )  
    _blackSize_ is the size of the black disc with repect to the target size.
    For instance, a target with radius `300mm' and a black disc with radius
    `120mm`, _blackSize_ should be `120mm / 300mm = .4'.
* **setNumbersFrom**(< _number_ >numbersFrom) - ( _TargetBuilder_ )
* **setNumbersTo**(< _number_ >numbersFrom) - ( _TargetBuilder_ )

ShotBuilder
-----------
Builds a shot object. All properties must be present, but default to empty
placeholders, and are therefore optional.

```javascript
var shot = new ShotBuilder()
    .setScaledPosition(30, 0, target.scale)
    .setValue('X.0')
    .getShot();
```

* ShotBuilder. **createBlankShot**() - ( _object_ )  
    Static method. Creates and returns a new empty shot, with all necessary
    fields present, but set to empty placeholder values.
* **reset**() - ( _ShotBuilder_ )  
    Resets the current shot of the builder. Returns pointer to the builder
    for convenience.
* **setValue**(< _string_ >value) - ( _ShotBuilder_ )
* **setPosition**(< _number_ >x, < _number_ >y) - ( _ShotBuilder_ )  
    _x_ and _y_ should be normalized (i.e. `-1 <= x, y <= 1`)
* **setPolarPosition**(< _number_ >t, < _number_ >r) - ( _ShotBuilder_ )  
    _t_ is the angle (theta) of the shot position i polar coordinates, _r_ is
    the distance from origo to the shot. _r_ should be normalized (i.e. `-1 <= r <= 1`).
* **setScaledPosition**(< _number_ >x, < _number_ >y, < _number_ >scale) - ( _ShotBuilder_ )
* **setScaledPolarPosition**(< _number_ >t, < _number_ >r, < _number_ >scale) - ( _ShotBuilder_ )
* **setX**(< _number_ >x) - ( _ShotBuilder_ )  
    _x_ should be normalized (i.e. `-1 <= x <= 1`)
* **setY**(< _number_ >y) - ( _ShotBuilder_ )  
    _y_ should be normalized (i.e. `-1 <= y <= 1`)

ShotListBuilder
---------------
Builds a shot list object.

```javascript
var shotList = new ShotListBuilder()
    .addShot(shot)
    .addShotForPosition(.1, 0, 'X.0')
    .getShotList();
```

* ShotListBuilder. **createBlankShotList**() - ( _object_ )  
    Static method. Creates and returns a new empty shot list.
* **reset**() - ( _ShotListBuilder_ )  
    Resets the current shot list of the builder. Returns pointer to the builder
    for convenience.
* **addShot**(< _object_ >shot) - ( _ShotListBuilder_ )  
    _shot_ should be object created by ShotBuilder
* **addShotForPosition**(< _number_ >x, < _number_ >y, < _string_ >value) - ( _ShotListBuilder_ )
