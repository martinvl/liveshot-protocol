LiveShot protocol
=================
Protocol specification for data formats used in LiveShot. The protocol is
implemented through various builders.

Data Objects
------------
This section contains definitions of the data objects used by LiveShot. These
objects represent the data format provided by the parser library, and accepted
by the display library.

**Range**
_This definition is considered a draft and is subject to change._

* < _string_ >`name`
    The range display name, ex: `'100m'`
* < _string_ >`relay`
    The display name for the relay, ex: `'1'`
<!--
* < _Date_ >`timerZero`
    Timestamp representing timer zero, which it can do in three different ways:
    * If `timerZero` is `undefined`, the timer is inactive
    * If `timerZero` is a date in the past, the timer is counting up in such a
    manner that zero time occured at `timerZero`
    * If `timerZero` is a date in the future, the timer is counting down in
    such a manner that zero time will occur at `timerZero`
    The timer relies on the accuracy of the machine clocks at both ends of the
    system, so care must be taken to synchronize these to a reasonable extent.
    -->
* < _iterable_ >`cards`
    * Contains zero or more < _Card_ > objects, the keys of this object can be
    anything, as long as they iterate in the correct order. Typically this is
    just an array containing zero or more cards.

<!--
_Discussion_
Range name and relay name is now duplicated across both `Range` and `Card`
objects. Do we need this?

`rangeName` and `relay` is needed in Card for
* (`rangeName`) assembling CardID for fetching card
    Can be fetched either from range (which you need to load at some point), or
    from http fetch string
* (`relay`) relay may be different accross different cards on the same range.
  Can it?
    At this point no. If it can, we need some way to handle this at range level
    anyway
* single card display mode, needs to display range and relay.
    Still needs to load range at some point, which gives this data
* identifying which range it belongs to
    Can be handled in Core Data by using http fetch string
* makes sense given data provided in Megalink files
    Not an argument
    -->

**Card**
* < _string_ >`lane`  
    The display name for the lane, ex: `'1'`
* < _Shooter_ >`shooter`  
    See **Shooter** below.
* < _Result_ >`result`  
    See **Result** below.
* < _CardConfig_ >`config`  
    See **CardConfig** below.

`CardBuilder` should be used to create `Card` objects, including its
subobjects.

**Shooter**
* < _string_ >`name`  
    The display name for the shooter, ex: `'Martin V. Larsen'`
* < _string_ >`club`  
    The display name of the club of the shooter, ex: `'Rygge'`
* < _string_ >`className`  
    The class of the shooter, ex: `'V55'`
* < _string_ >`category`  
    The the category of the shooter, ex: `'LF'`

Either use `ShooterBuilder` to build directly, or use the convenience methods
of `CardBuilder` to build indirectly.

**Result**
* < _string_ >`seriesName`  
    The display name for the series, ex: `'Prone'`
* < _string_ >`seriesSum`
    The sum of the current series, formatted for display, ex: `'50'`
* < _string_ >`totalSum`
    The total sum of the card, formatted for display, ex: `'150'`
* < _iterable_ >`shots`
    * Contains zero or more < _Shot_ > objects, the keys of this object can be
    anything, as long as they iterate in the correct order. Typically these
    keys are just normal numeric indices as in an array.

Either use `ResultBuilder` to build directly, or use the convenience methods of
`CardBuilder` to build indirectly.

**Shot**
* < _number_ >`x`  
    The x-coordinate of the _center_ of the shot. This should be
    normalized, such that -1 <= `x` <= 1.
* < _number_ >`y`  
    The y-coordinate of the _center_ of the shot. This should be
    normalized, such that -1 <= `y` <= 1.
* < _string_ >`value`  
    `value` is the shot value, appropriately formatted for display,
    ex: `'X.0'`

Either use `ShotBuilder` to build directly, or use `addShotData` of
`ResultBuilder` or `CardBuilder`.

**CardConfig**
* < _number_ >`gaugeSize`  
    The size of the gauge (similar to diameter of the bullet) relative to
    the target size. For instance, if the target diameter is `1000mm`, and
    the gauge diameter is `8mm`, the value of `gaugeSize` should be `8mm /
    1000mm = .008`.
* < _string_ >`targetID`
    For valid values of `targetID`, see _List of implemented targets_ in
    [liveshot-core](https://github.com/martinvl/liveshot-core#list-of-implemented-targets).

`ConfigBuilder` should be used to create `CardConfig` objects.

**RangeBuilder**  
Builds _Range_ objects. All setters return reference to the builder, for convenience.

```javascript
var range = new RangeBuilder()
    .setName('300m')
    .setRelay('1')
    .setCards(cards)
    .getRange();
```

* (static method) **RangeBuilder.createBlankRange**() - ( _Range_ )  
    Creates and returns a new empty range, with all fields present, but set to
    empty placeholder values.
* **reset**() - ( _RangeBuilder_ )  
    Resets the current range. Returns pointer to the builder for convenience.
* **getRange**() - ( _Range_ )  
    Returns pointer to the current range
* **setName**(< _string_ >range) - ( _RangeBuilder_ )
* **setRelay**(< _string_ >relay) - ( _RangeBuilder_ )
* **setCards**(< _iterable_ >cards) - ( _RangeBuilder_ )
    `cards` should be as described above. This method iterates through the
    provided `cards` and adds them to an empty array.
* **resetCards**() - ( _RangeBuilder_ )  
    Resets the current list of cards
* **addCard**(< _Card_ >card) - ( _RangeBuilder_ )
    Adds a `Card` object to the `cards` key of the current range. These cards
    are inserted in the same order they are added.

**CardBuilder**  
Builds _Card_ objects. All setters return reference to the builder, for convenience.

```javascript
var card = new CardBuilder()
    .setLane('1')
    .setName('Martin V. Larsen')
    .setClub('Rygge')
    .setClassName('4')
    .setCategory('A')
    .setSeriesName('Ligg')
    .addShotData(.1, 0, 'X.0')
    .addShotData(0, -.1, 'X.0')
    .addShotData(.071, .071, 'X.0')
    .addShotData(.071, -.071, 'X.0')
    .addShotData(-.071, .071, 'X.0')
    .setSeriesSum('50')
    .setTotalSum('150')
    .setGaugeSize(.00533)
    .setTargetID('NO-DFS_300M')
    .getCard();
```

* (static method) **CardBuilder.createBlankCard**() - ( _Card_ )  
    Creates and returns a new empty card, with all fields present, but set to
    empty placeholder values.
* **reset**() - ( _CardBuilder_ )  
    Resets the current card. Returns pointer to the builder for convenience.
* **getCard**() - ( _Card_ )  
    Returns pointer to the current card
* **setLane**(< _string_ >lane) - ( _CardBuilder_ )
* **setName**(< _string_ >name) - ( _CardBuilder_ )
* **setClub**(< _string_ >club) - ( _CardBuilder_ )
* **setClassName**(< _string_ >className) - ( _CardBuilder_ )
* **setCategory**(< _string_ >category) - ( _CardBuilder_ )
* **setSeriesName**(< _string_ >seriesName) - ( _CardBuilder_ )
* **setSeriesSum**(< _string_ >seriesSum) - ( _CardBuilder_ )
* **setTotalSum**(< _string_ >totalSum) - ( _CardBuilder_ )
* **setGaugeSize**(< _number_ >gaugeSize) - ( _CardBuilder_ )
* **setTargetID**(< _string_ >targetID) - ( _CardBuilder_ )  
    For valid values of `targetID`, see _List of implemented targets_ in
    [liveshot-core](https://github.com/martinvl/liveshot-core#list-of-implemented-targets).
* **setShooter**(< _Shooter_ >shooter) - ( _CardBuilder_ )  
    `shooter` should be as described above
* **setResult**(< _Result_ >result) - ( _CardBuilder_ )  
    `result` should be as described above
* **setConfig**(< _CardConfig_ >config) - ( _CardBuilder_ )  
    `config` should be as described above
* **setShots**(< _iterable_ >shots) - ( _CardBuilder_ )  
    `shots` should be as described above
* **resetShots**() - ( _CardBuilder_ )  
    Resets the current list of shots
* **addShot**(< _Shot_ >shot) - ( _CardBuilder_ )  
    `shot` should be as described above
* **addShotData**(< _number_ >x, < _number_ >y, < _string_ >value) - ( _CardBuilder_ )  
    -1 <= `x`, `y` <= 1, where (`x`, `y`) represent the _center_ of the shot  
    `value` is the shot value, appropriately formatted for displaying

**ShooterBuilder**  
Builds _Shooter_ objects. All setters return reference to the builder, for convenience.
```javascript
var shooter = new ShooterBuilder()
    .setName('Martin V. Larsen')
    .setClub('Rygge')
    .setClassName('4')
    .setCategory('A')
    .getShooter();
```

* (static method) **ShooterBuilder.createBlankShooter**() - ( _Shooter_ )  
    Creates and returns a new empty shooter object, with all fields present,
    but set to empty placeholder values.
* **reset**() - ( _ShooterBuilder_ )  
    Resets the current shooter object.
* **getShooter**() - ( _Shooter_ )  
    Returns pointer to the current shooter object
* **setShooter**(< _object_ >shooter) - ( _ShooterBuilder_ )  
    Copies all relevant fields from `shooter`
* **setName**(< _string_ >name) - ( _ShooterBuilder_ )
* **setClub**(< _string_ >club) - ( _ShooterBuilder_ )
* **setClassName**(< _string_ >className) - ( _ShooterBuilder_ )
* **setCategory**(< _string_ >category) - ( _ShooterBuilder_ )

**ResultBuilder**  
Builds _Result_ objects. All setters return reference to the builder, for convenience.
```javascript
var result = new ResultBuilder()
    .setSeriesName('Ligg')
    .setSeriesSum('50')
    .setTotalSum('150')
    .addShot(shot)
    .addShotData(0, -.1, 'X.0')
    .addShotData(.071, .071, 'X.0')
    .addShotData(.071, -.071, 'X.0')
    .addShotData(-.071, .071, 'X.0')
    .getResult();
```

* (static method) **ResultBuilder.createBlankResult**() - ( _Result_ )  
    Creates and returns a new empty result object, with all fields present,
    but set to empty placeholder values.
* **reset**() - ( _ResultBuilder_ )  
    Resets the current result object.
* **getResult**() - ( _Result_ )  
    Returns pointer to the current result object
* **setResult**(< _Result_ >result) - ( _ResultBuilder_ )  
    Copies all relevant fields from `result`
* **setSeriesName**(< _string_ >seriesName) - ( _ResultBuilder_ )
* **setSeriesSum**(< _string_ >seriesSum) - ( _ResultBuilder_ )
* **setTotalSum**(< _string_ >totalSum) - ( _ResultBuilder_ )
* **setShots**(< _iterable_ >shots) - ( _ResultBuilder_ )  
    `shots` should be as described above
* **resetShots**() - ( _ResultBuilder_ )  
    Resets the current list of shots
* **addShot**(< _Shot_ >shot) - ( _ResultBuilder_ )  
    `shot` should be as described above
* **addShotData**(< _number_ >x, < _number_ >y, < _string_ >value) - ( _ResultBuilder_ )  
    -1 <= `x`, `y` <= 1, where (`x`, `y`) represent the _center_ of the shot  
    `value` is the shot value, appropriately formatted for displaying

**ShotBuilder**  
```javascript
var shot = new ShotBuilder()
    .setPosition(.1, 0)
    .setValue('X.0')
    .getShot();
```

Builds _Shot_ objects. All setters return reference to the builder, for convenience.
* (static method) **ShotBuilder.createBlankShot**() - ( _Shot_ )  
    Creates and returns a new empty shot object, with all fields present,
    but set to empty placeholder values.
* **reset**() - ( _ShotBuilder_ )  
    Resets the current shot object.
* **getShot**() - ( _Shot_ )  
    Returns pointer to the current shot object
* **setValue**(< _string_ >value) - ( _ShotBuilder_ )
* **setPosition**(< _number_ >x, < _number_ >y) - ( _ShotBuilder_ )  
    _x_ and _y_ should be normalized (i.e. `-1 <= x, y <= 1`)
* **setX**(< _number_ >x) - ( _ShotBuilder_ )  
    _x_ should be normalized (i.e. `-1 <= x <= 1`)
* **setY**(< _number_ >y) - ( _ShotBuilder_ )  
    _y_ should be normalized (i.e. `-1 <= y <= 1`)

**ConfigBuilder**  
Builds _Config_ objects. All setters return reference to the builder, for convenience.
```javascript
var config = new ConfigBuilder()
    .setGaugeSize(.00533)
    .setTargetID('NO-DFS_300M')
    .getConfig();
```

* (static method) **ConfigBuilder.createBlankConfig**() - ( _CardConfig_ )  
    Creates and returns a new empty config object, with all fields present,
    but set to empty placeholder values.
* **reset**() - ( _ConfigBuilder_ )  
    Resets the current config object.
* **getConfig**() - ( _CardConfig_ )  
    Returns pointer to the current config object
* **setConfig**(< _object_ >config) - ( _ConfigBuilder_ )  
    Copies all relevant fields from `config`
* **setGaugeSize**(< _number_ >gaugeSize) - ( _ConfigBuilder_ )
* **setTargetID**(< _string_ >targetID) - ( _ConfigBuilder_ )  
    For valid values of `targetID`, see _List of implemented targets_ in
    [liveshot-core](https://github.com/martinvl/liveshot-core#list-of-implemented-targets).
