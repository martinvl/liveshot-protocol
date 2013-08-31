LiveShot protocol
=================
Protocol specification for data formats used in LiveShot. The protocol is
implemented through various builders.

Data Objects
------------
This section contains definitions of the data objects used by LiveShot. These
objects represent the data format provided by the parser library, and accepted
by the display library.

**Card**
* < _string_ >`range`  
    The range display name, ex: `'100m'`
* < _string_ >`relay`  
    The display name for the relay, ex: `'1'`
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

**CardBuilder**  
Builds _Card_ objects. All setters return reference to the builder, for convenience.

```javascript
var card = new CardBuilder()
    .setRange('300m')
    .setRelay('1')
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

* (static method) **CardBuilder.createBlankCard**() - ( _object_ )  
    Creates and returns a new empty card, with all fields present, but set to
    empty placeholder values.
* **reset**() - ( _CardBuilder_ )  
    Resets the current card. Returns pointer to the builder for convenience.
* **getCard**() - ( _object_ )  
    Returns pointer to the current card
* **setRange**(< _string_ >range) - ( _CardBuilder_ )
* **setRelay**(< _string_ >relay) - ( _CardBuilder_ )
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
* **setShooter**(< _object_ >shooter) - ( _CardBuilder_ )  
    `shooter` should be as described above
* **setResult**(< _object_ >result) - ( _CardBuilder_ )  
    `result` should be as described above
* **setConfig**(< _object_ >config) - ( _CardBuilder_ )  
    `config` should be as described above
* **setShots**(< _object_ >shots) - ( _CardBuilder_ )  
    `shots` should be as described above
* **resetShots**() - ( _CardBuilder_ )  
    Resets the current list of shots
* **addShot**(< _object_ >shot) - ( _CardBuilder_ )  
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

* (static method) **ShooterBuilder.createBlankShooter**() - ( _object_ )  
    Creates and returns a new empty shooter object, with all fields present,
    but set to empty placeholder values.
* **reset**() - ( _ShooterBuilder_ )  
    Resets the current shooter object.
* **getShooter**() - ( _object_ )  
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

* (static method) **ResultBuilder.createBlankResult**() - ( _object_ )  
    Creates and returns a new empty result object, with all fields present,
    but set to empty placeholder values.
* **reset**() - ( _ResultBuilder_ )  
    Resets the current result object.
* **getResult**() - ( _object_ )  
    Returns pointer to the current result object
* **setResult**(< _object_ >result) - ( _ResultBuilder_ )  
    Copies all relevant fields from `result`
* **setSeriesName**(< _string_ >seriesName) - ( _ResultBuilder_ )
* **setSeriesSum**(< _string_ >seriesSum) - ( _ResultBuilder_ )
* **setTotalSum**(< _string_ >totalSum) - ( _ResultBuilder_ )
* **setShots**(< _object_ >shots) - ( _ResultBuilder_ )  
    `shots` should be as described above
* **resetShots**() - ( _ResultBuilder_ )  
    Resets the current list of shots
* **addShot**(< _object_ >shot) - ( _ResultBuilder_ )  
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
* (static method) **ShotBuilder.createBlankShot**() - ( _object_ )  
    Creates and returns a new empty shot object, with all fields present,
    but set to empty placeholder values.
* **reset**() - ( _ShotBuilder_ )  
    Resets the current shot object.
* **getShot**() - ( _object_ )  
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

* (static method) **ConfigBuilder.createBlankConfig**() - ( _object_ )  
    Creates and returns a new empty config object, with all fields present,
    but set to empty placeholder values.
* **reset**() - ( _ConfigBuilder_ )  
    Resets the current config object.
* **getConfig**() - ( _object_ )  
    Returns pointer to the current config object
* **setConfig**(< _object_ >config) - ( _ConfigBuilder_ )  
    Copies all relevant fields from `config`
* **setGaugeSize**(< _number_ >gaugeSize) - ( _ConfigBuilder_ )
* **setTargetID**(< _string_ >targetID) - ( _ConfigBuilder_ )  
    For valid values of `targetID`, see _List of implemented targets_ in
    [liveshot-core](https://github.com/martinvl/liveshot-core#list-of-implemented-targets).
