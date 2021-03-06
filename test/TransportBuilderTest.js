var assert = require('chai').assert;

var protocol = require('../index');

var Builder = protocol.Builder;
var CardBuilder = protocol.CardBuilder;
var ConfigBuilder = protocol.ConfigBuilder;
var RangeBuilder = protocol.RangeBuilder;
var ResultBuilder = protocol.ResultBuilder;
var ShooterBuilder = protocol.ShooterBuilder;
var ShotBuilder = protocol.ShotBuilder;

suite('Builder', function() {
    test('blankCopy() creates exact copy', function () {
        var defaultObject = {foo:'bar', car:true, age:13};
        var copy = Builder.blankCopy(defaultObject);

        assert.deepEqual(copy, defaultObject);
        assert.notEqual(copy, defaultObject, 'should be a copy');
    });

    test('blankCopy() copies all levels of properties', function () {
        var defaultObject = {foo:'bar', car:true, age:13, house:{}};
        var copy = Builder.blankCopy(defaultObject);

        assert.deepEqual(copy, defaultObject);
        assert.notEqual(copy, defaultObject, 'should be a copy');

        assert.deepEqual(copy.house, defaultObject.house);
        assert.notEqual(copy.house, defaultObject.house, 'should be a copy');
    });

    test('blankCopy() makes copies of arrays, and the array values', function () {
        var defaultObject = {foo:'bar', car:true, age:13, shots:[{}]};
        var copy = Builder.blankCopy(defaultObject);

        assert.deepEqual(copy, defaultObject);
        assert.notEqual(copy, defaultObject, 'should be a copy');

        assert.deepEqual(copy.shots, defaultObject.shots);
        assert.notEqual(copy.shots, defaultObject.shots, 'should be a copy');

        assert.deepEqual(copy.shots[0], defaultObject.shots[0]);
        assert.notEqual(copy.shots[0], defaultObject.shots[0], 'should be a copy');
    });

    test('sanitize() copies all relevant fields', function () {
        var defaultObject = {foo:'bar', car:true, age:13};
        var rawObject = {foo:'car', car:false, age:10};
        var object = Builder.sanitize(rawObject, defaultObject);

        assert.deepEqual(object, rawObject);
        assert.notEqual(object, rawObject); // make sure it's a copy
    });

    test('sanitize() ignores irrelevant fields', function () {
        var defaultObject = {foo:'bar', car:true, age:13};
        var rawObject = {phone:false, foo:'car', car:false, age:10, city:'oslo'};
        var object = Builder.sanitize(rawObject, defaultObject);

        assert.deepEqual(object, {foo:'car', car:false, age:10});
    });

    test('sanitize() sets default values for empty fields', function () {
        var defaultObject = {foo:'bar', car:true, age:13};
        var rawObject = {phone:false, foo:'car'};
        var object = Builder.sanitize(rawObject, defaultObject);

        assert.deepEqual(object, {foo:'car', car:true, age:13});
    });

    test('sanitize() only handles fields at top level', function () {
        var defaultObject = {foo:'bar', car:true, age:13};
        var rawObject = {foo:{loo:'par', gko:'baf'}, phone:{foo:'car', goo:'bar'}};
        var object = Builder.sanitize(rawObject, defaultObject);

        assert.deepEqual(object, {foo:{loo:'par', gko:'baf'}, car:true, age:13});
        assert.equal(object.foo, rawObject.foo, 'should not be a copy');
    });

    setup(function () {
        this.builder = new Builder();
    });

    test('reset() returns builder', function () {
        assert.equal(this.builder.reset(), this.builder);
    });

    test('getObject() returns copy of internal object', function () {
        this.builder._object = {foo:'bar', car:true, age:13};

        assert.deepEqual(this.builder.getObject(), this.builder._object);
        assert.notEqual(this.builder.getObject(), this.builder._object);
    });

    test('setObject() returns builder', function () {
        assert.equal(this.builder.setObject({}), this.builder);
    });
});

suite('ConfigBuilder', function() {
    setup(function () {
        this.builder = new ConfigBuilder();
    });

    test('Creates blank config object to spec', function () {
        var config = ConfigBuilder.createBlankConfig();

        assert.deepEqual(config, {gaugeSize:.02, targetID:'NO_DFS_200M'});
    });

    test('getConfig() works as expected', function () {
        assert.deepEqual(this.builder.getConfig(), {gaugeSize:.02, targetID:'NO_DFS_200M'});
    });

    test('Sets gaugeSize as expected', function () {
        var gaugeSize = .5;

        this.builder.setGaugeSize(gaugeSize);
        assert.deepEqual(this.builder.getConfig(), {gaugeSize:gaugeSize, targetID:'NO_DFS_200M'});
    });

    test('Sets targetID as expected', function () {
        var targetID = '100m';

        this.builder.setTargetID(targetID);
        assert.deepEqual(this.builder.getConfig(), {gaugeSize:.02, targetID:targetID});
    });

    test('Sets config as expected', function () {
        var configA = this.builder
        .setGaugeSize(.5)
        .setTargetID('100m')
        .getConfig();

    var configB = new ConfigBuilder()
        .setGaugeSize(.7)
        .setTargetID('300m')
        .getConfig();

    assert.deepEqual(this.builder.getConfig(), configA);
    this.builder.setConfig(configB);
    assert.deepEqual(this.builder.getConfig(), configB);
    });

    test('Resets as expected', function () {
        // change to non-default values
        var gaugeSize = .5;
        var targetID = '100m';

        this.builder.setGaugeSize(gaugeSize);
        this.builder.setTargetID(targetID);

        var config = this.builder.getConfig();
        assert.deepEqual(config, {gaugeSize:gaugeSize, targetID:targetID});

        // reset
        this.builder.reset();
        assert.deepEqual(this.builder.getConfig(), {gaugeSize:.02, targetID:'NO_DFS_200M'});

        // check that the original config has not been changed
        assert.deepEqual(config, {gaugeSize:gaugeSize, targetID:targetID});
    });
});

suite('ShotBuilder', function() {
    setup(function () {
        this.builder = new ShotBuilder();
    });

    test('Creates blank shot object to spec', function () {
        var shot = ShotBuilder.createBlankShot();

        assert.deepEqual(shot, {x:0, y:0, value:''});
    });

    test('Sanitizes shot object as expected', function () {
        assert.deepEqual(ShotBuilder.sanitizeShot({x:1, y:2, value:'foo'}), {x:1, y:2, value:'foo'});
        assert.deepEqual(ShotBuilder.sanitizeShot({x:1, y:2}), {x:1, y:2, value:''});
        assert.deepEqual(ShotBuilder.sanitizeShot({x:1, value:'foo'}), {x:1, y:0, value:'foo'});
        assert.deepEqual(ShotBuilder.sanitizeShot({y:2, value:'foo'}), {x:0, y:2, value:'foo'});
        assert.deepEqual(ShotBuilder.sanitizeShot({value:'foo'}), {x:0, y:0, value:'foo'});
        assert.deepEqual(ShotBuilder.sanitizeShot({y:2}), {x:0, y:2, value:''});
        assert.deepEqual(ShotBuilder.sanitizeShot({x:1}), {x:1, y:0, value:''});
        assert.deepEqual(ShotBuilder.sanitizeShot({}), {x:0, y:0, value:''});
    });

    test('getShot() works as expected', function () {
        assert.deepEqual(this.builder.getShot(), {x:0, y:0, value:''});
    });

    test('Sets x-position as expected', function () {
        var x = Math.random()*2 - 1;

        this.builder.setX(x);
        assert.deepEqual(this.builder.getShot(), {x:x, y:0, value:''});
    });

    test('Sets y-position as expected', function () {
        var y = Math.random()*2 - 1;

        this.builder.setY(y);
        assert.deepEqual(this.builder.getShot(), {x:0, y:y, value:''});
    });

    test('Sets value as expected', function () {
        var value = 'X.0';

        this.builder.setValue(value);
        assert.deepEqual(this.builder.getShot(), {x:0, y:0, value:value});
    });

    test('Sets position as expected', function () {
        var x = Math.random()*2 - 1;
        var y = Math.random()*2 - 1;

        this.builder.setPosition(x, y);
        assert.deepEqual(this.builder.getShot(), {x:x, y:y, value:''});
    });

    test('Resets as expected', function () {
        // change to non-default values
        var x = Math.random()*2 - 1;
        var y = Math.random()*2 - 1;
        var value = 'X.0';

        this.builder.setPosition(x, y);
        this.builder.setValue(value);

        var shot = this.builder.getShot();
        assert.deepEqual(shot, {x:x, y:y, value:value});

        // reset
        this.builder.reset();
        assert.deepEqual(this.builder.getShot(), {x:0, y:0, value:''});

        // check that the original shot has not been changed
        assert.deepEqual(shot, {x:x, y:y, value:value});
    });

    test('setShot() creates empty shot for empty shot data', function () {
        this.builder.setShot({});

        assert.deepEqual(this.builder.getShot(), ShotBuilder.createBlankShot());
    });

    test('setShot() resets existing shot data', function () {
        this.builder.setPosition(2, 3);
        this.builder.setValue('foo');
        this.builder.setShot({});

        assert.deepEqual(this.builder.getShot(), ShotBuilder.createBlankShot());
    });

    test('setShot() accepts all available fields', function () {
        var shot = {x:1, y:2, value:'X'};
        this.builder.setShot(shot);

        assert.deepEqual(this.builder.getShot(), shot);
    });

    test('setShot() handles missing fields', function () {
        var blankShot = ShotBuilder.createBlankShot();

        this.builder.setShot({x:1});
        assert.deepEqual(this.builder.getShot(), {x:1, y:0, value:''});
        this.builder.setShot({y:1});
        assert.deepEqual(this.builder.getShot(), {x:0, y:1, value:''});
        this.builder.setShot({value:'foo'});
        assert.deepEqual(this.builder.getShot(), {x:0, y:0, value:'foo'});
    });
});

suite('ShooterBuilder', function() {
    setup(function () {
        this.builder = new ShooterBuilder();
    });

    test('Creates blank shooter object to spec', function () {
        var shooter = ShooterBuilder.createBlankShooter();

        assert.deepEqual(shooter, {name:'', club:'', className:'', category:''});
    });

    test('Sanitizes shooter object as expected', function () {
        assert.deepEqual(ShooterBuilder.sanitizeShooter({name:'foo', club:'boo', className:'coo', category:'goo'}), {name:'foo', club:'boo', className:'coo', category:'goo'}, 'should pass all relevant fields');
        assert.deepEqual(ShooterBuilder.sanitizeShooter({}), {name:'', club:'', className:'', category:''}, 'should fill in missing fields');
        assert.deepEqual(ShooterBuilder.sanitizeShooter({foo:'car', bar:'foo'}), {name:'', club:'', className:'', category:''}, 'should ignore irrelevant fields');
    });

    test('getShooter() works as expected', function () {
        assert.deepEqual(this.builder.getShooter(), {name:'', club:'', className:'', category:''});
    });

    test('Sets name as expected', function () {
        var name = 'Martin V. Larsen';

        this.builder.setName(name);
        assert.deepEqual(this.builder.getShooter(), {name:name, club:'', className:'', category:''});
    });

    test('Sets club as expected', function () {
        var club = 'Rygge';

        this.builder.setClub(club);
        assert.deepEqual(this.builder.getShooter(), {name:'', club:club, className:'', category:''});
    });

    test('Sets className as expected', function () {
        var className = '4';

        this.builder.setClassName(className);
        assert.deepEqual(this.builder.getShooter(), {name:'', club:'', className:className, category:''});
    });

    test('Sets category as expected', function () {
        var category = 'LF';

        this.builder.setCategory(category);
        assert.deepEqual(this.builder.getShooter(), {name:'', club:'', className:'', category:category});
    });

    test('Sets shooter as expected', function () {
        var shooterA = this.builder
        .setName('Martin V. Larsen')
        .setClub('Rygge')
        .setClassName('4')
        .setCategory('LF')
        .getShooter();

    var shooterB = new ShooterBuilder()
        .setName('Edward Murr')
        .setClub('Fredrikstad')
        .setClassName('3')
        .setCategory('A')
        .getShooter();

    assert.deepEqual(this.builder.getShooter(), shooterA);
    this.builder.setShooter(shooterB);
    assert.deepEqual(this.builder.getShooter(), shooterB);
    });

    test('Resets as expected', function () {
        // change to non-default values
        var name = 'Martin V. Larsen';
        var club = 'Rygge';
        var className = '4';
        var category = 'LF';

        this.builder.setName(name);
        this.builder.setClub(club);
        this.builder.setClassName(className);
        this.builder.setCategory(category);

        var shooter = this.builder.getShooter();
        assert.deepEqual(shooter, {name:name, club:club, className:className, category:category});

        // reset
        this.builder.reset();
        assert.deepEqual(this.builder.getShooter(), {name:'', club:'', className:'', category:''});

        // check that the original shooter has not been changed
        assert.deepEqual(shooter, {name:name, club:club, className:className, category:category});
    });
});

suite('ResultBuilder', function() {
    setup(function () {
        this.builder = new ResultBuilder();
    });

    test('Creates blank result object to spec', function () {
        var result = ResultBuilder.createBlankResult();
        var blank = {
            seriesName:'',
            seriesSum:'',
            totalSum:'',
            marking:false,
            shots:[]
        };

        assert.deepEqual(result, blank);
    });

    test('Sanitizes result object as expected', function () {
        var result = {seriesName:'foo', seriesSum:'50', totalSum:'100', marking:true, shots:[]};
        assert.deepEqual(ResultBuilder.sanitizeResult(result), result, 'should pass all relevant fields');
        assert.notEqual(ResultBuilder.sanitizeResult(result).shots, result.shots, 'should copy shots array');

        assert.deepEqual(ResultBuilder.sanitizeResult({}), {seriesName:'', seriesSum:'', totalSum:'', marking:false, shots:[]}, 'should fill in missing fields');
        assert.deepEqual(ResultBuilder.sanitizeResult({foo:'car', bar:'foo'}), {seriesName:'', seriesSum:'', totalSum:'', marking:false, shots:[]}, 'should ignore irrelevant fields');

        result = {shots:[{x:1, y:2, value:'foo', moose:false}, {x:2, y:1, value:'boo', dog:true}]};
        assert.deepEqual(ResultBuilder.sanitizeResult(result), {seriesName:'', seriesSum:'', totalSum:'', marking:false, shots:[{x:1, y:2, value:'foo'}, {x:2, y:1, value:'boo'}]}, 'should sanitize shots');
        assert.notEqual(ResultBuilder.sanitizeResult(result).shots[0], result.shots[0], 'sanitized shots should be copies');
    });

    test('getResult() works as expected', function () {
        var blank = {
            seriesName:'',
        seriesSum:'',
        totalSum:'',
        marking:false,
        shots:[]
        };

        assert.deepEqual(this.builder.getResult(), blank);
    });

    test('Sets seriesName as expected', function () {
        var seriesName = 'Ligg';
        var expected = {
            seriesName:seriesName,
        seriesSum:'',
        totalSum:'',
        marking:false,
        shots:[]
        };

        this.builder.setSeriesName(seriesName);
        assert.deepEqual(this.builder.getResult(), expected);
    });

    test('Sets seriesSum as expected', function () {
        var seriesSum = '50';
        var expected = {
            seriesName:'',
        seriesSum:seriesSum,
        totalSum:'',
        marking:false,
        shots:[]
        };

        this.builder.setSeriesSum(seriesSum);
        assert.deepEqual(this.builder.getResult(), expected);
    });

    test('Sets marking as expected', function () {
        var marking = true;
        var expected = {
            seriesName:'',
        seriesSum:'',
        totalSum:'',
        marking:marking,
        shots:[]
        };

        this.builder.setMarking(marking);
        assert.deepEqual(this.builder.getResult(), expected);
    });

    test('Sets seriesName as expected', function () {
        var totalSum = '250';
        var expected = {
            seriesName:'',
        seriesSum:'',
        totalSum:totalSum,
        marking:false,
        shots:[]
        };

        this.builder.setTotalSum(totalSum);
        assert.deepEqual(this.builder.getResult(), expected);
    });

    test('Adds shots as expected', function () {
        var shotA = {
            x:1,
        y:1,
        value:'0.0'
        };

        var shotB = {
            x:.5,
        y:.5,
        value:'4.0'
        };

        var shotC = {
            x:.1,
        y:0,
        value:'X.0'
        };

        this.builder.addShot(shotA);
        this.builder.addShot(shotB);
        this.builder.addShot(shotC);

        assert.deepEqual(this.builder.getResult().shots[0], shotA);
        assert.deepEqual(this.builder.getResult().shots[1], shotB);
        assert.deepEqual(this.builder.getResult().shots[2], shotC);
    });

    test('Adds shot data as expected', function () {
        var shotA = {
            x:1,
        y:1,
        value:'0.0'
        };

        var shotB = {
            x:.5,
        y:.5,
        value:'4.0'
        };

        var shotC = {
            x:.1,
        y:0,
        value:'X.0'
        };

        this.builder.addShotData(shotA.x, shotA.y, shotA.value);
        this.builder.addShotData(shotB.x, shotB.y, shotB.value);
        this.builder.addShotData(shotC.x, shotC.y, shotC.value);

        assert.deepEqual(this.builder.getResult().shots[0], shotA);
        assert.deepEqual(this.builder.getResult().shots[1], shotB);
        assert.deepEqual(this.builder.getResult().shots[2], shotC);
    });

    test('Sets shots as expected', function () {
        var shotA = {
            x:1,
        y:1,
        value:'0.0'
        };

        var shotB = {
            x:.5,
        y:.5,
        value:'4.0'
        };

        var shotC = {
            x:.1,
        y:0,
        value:'X.0'
        };

        // test with array
        var shots = [shotA, shotB, shotC];

        this.builder.setShots(shots);

        assert.deepEqual(this.builder.getResult().shots[0], shotA);
        assert.deepEqual(this.builder.getResult().shots[1], shotB);
        assert.deepEqual(this.builder.getResult().shots[2], shotC);

        // test with object
        var shots = {'a':shotA, 'b':shotB, 'c':shotC};

        this.builder.setShots(shots);

        assert.deepEqual(this.builder.getResult().shots[0], shotA);
        assert.deepEqual(this.builder.getResult().shots[1], shotB);
        assert.deepEqual(this.builder.getResult().shots[2], shotC);
    });

    test('Sets result as expected', function () {
        var shotA = {
            x:1,
        y:1,
        value:'0.0'
        };

        var shotB = {
            x:.5,
        y:.5,
        value:'4.0'
        };

        var resultA = this.builder
        .setSeriesName('Ligg')
        .setSeriesSum('50')
        .setTotalSum('250')
        .setMarking(true)
        .addShot(shotA)
        .addShot(shotB)
        .getResult();

        var resultB = new ResultBuilder()
            .setSeriesName('Kne')
            .setSeriesSum('49')
            .setTotalSum('249')
            .setMarking(false)
            .addShot(shotB)
            .addShot(shotA)
            .getResult();

        assert.deepEqual(this.builder.getResult(), resultA);
        this.builder.setResult(resultB);
        assert.deepEqual(this.builder.getResult(), resultB);
    });

    test('Resets as expected', function () {
        var shotA = {
            x:1,
        y:1,
        value:'0.0'
        };

        var shotB = {
            x:.5,
        y:.5,
        value:'4.0'
        };

        var blank = {
            seriesName:'',
        seriesSum:'',
        totalSum:'',
        marking:false,
        shots:[]
        };

        var resultA = this.builder
            .setSeriesName('Ligg')
            .setSeriesSum('50')
            .setTotalSum('250')
            .setMarking(true)
            .addShot(shotA)
            .addShot(shotB)
            .getResult();

        var resultB = new ResultBuilder()
            .setSeriesName('Ligg')
            .setSeriesSum('50')
            .setTotalSum('250')
            .setMarking(true)
            .addShot(shotA)
            .addShot(shotB)
            .getResult();

        assert.deepEqual(this.builder.getResult(), resultA);
        assert.deepEqual(resultA, resultB);
        this.builder.reset();
        assert.deepEqual(this.builder.getResult(), blank);

        assert.deepEqual(resultA, resultB);
    });

    test('Resets shots as expected', function () {
        var shotA = {
            x:1,
        y:1,
        value:'0.0'
        };

        var shotB = {
            x:.5,
        y:.5,
        value:'4.0'
        };

        var blank = {
            seriesName:'',
        seriesSum:'',
        totalSum:'',
        marking:false,
        shots:[]
        };

        var shotsA = this.builder
            .setSeriesName('Ligg')
            .setSeriesSum('50')
            .setTotalSum('250')
            .setMarking(true)
            .addShot(shotA)
            .addShot(shotB)
            .getResult().shots;

        var shotsB = new ResultBuilder()
            .setSeriesName('Ligg')
            .setSeriesSum('50')
            .setTotalSum('250')
            .setMarking(true)
            .addShot(shotA)
            .addShot(shotB)
            .getResult().shots;

        assert.deepEqual(this.builder.getResult().shots, shotsA);
        assert.deepEqual(shotsA, shotsB);
        this.builder.resetShots();
        assert.deepEqual(this.builder.getResult().shots, blank.shots);

        assert.deepEqual(shotsA, shotsB);
    });
});

suite('CardBuilder', function() {
    setup(function () {
        this.builder = new CardBuilder();
    });

    test('Creates blank card object to spec', function () {
        var card = CardBuilder.createBlankCard();
        var blank = {
            lane:'',
            shooter:{
                name:'',
                club:'',
                className:'',
                category:''
            },
            result:{
                seriesName:'',
                seriesSum:'',
                totalSum:'',
                marking:false,
                shots:[]
            },
            config:{
                gaugeSize:.02,
                targetID:'NO_DFS_200M'
            }
        };

        assert.deepEqual(card, blank);
    });

    test('getCard() works as expected', function () {
        var blank = {
            lane:'',
            shooter:{
                name:'',
                club:'',
                className:'',
                category:''
            },
            result:{
                seriesName:'',
                seriesSum:'',
                totalSum:'',
                marking:false,
                shots:[]
            },
            config:{
                gaugeSize:.02,
                targetID:'NO_DFS_200M'
            }
        };

        assert.deepEqual(this.builder.getCard(), blank);
    });

    test('Sets lane as expected', function () {
        var lane = '1';
        var expected = {
            lane:lane,
            shooter:{
                name:'',
                club:'',
                className:'',
                category:''
            },
            result:{
                seriesName:'',
                seriesSum:'',
                totalSum:'',
                marking:false,
                shots:[]
            },
            config:{
                gaugeSize:.02,
                targetID:'NO_DFS_200M'
            }
        };

        this.builder.setLane(lane);
        assert.deepEqual(this.builder.getCard(), expected);
    });

    test('Setters work as expected', function () {
        var lane = '1';
        var name = 'Martin V. Larsen';
        var club = 'Rygge';
        var className = '4';
        var category = 'LF';
        var seriesName = 'Ligg';
        var seriesSum = '50';
        var totalSum = '250';
        var marking = false;
        var gaugeSize = .5;
        var targetID = 'DFS100m';

        var expected = {
            lane:lane,
            shooter:{
                name:name,
                club:club,
                className:className,
                category:category
            },
            result:{
                seriesName:seriesName,
                seriesSum:seriesSum,
                totalSum:totalSum,
                marking:marking,
                shots:[]
            },
            config:{
                gaugeSize:gaugeSize,
                targetID:targetID
            }
        };

        this.builder.setLane(lane)
            .setName(name)
            .setClub(club)
            .setClassName(className)
            .setCategory(category)
            .setSeriesName(seriesName)
            .setSeriesSum(seriesSum)
            .setTotalSum(totalSum)
            .setMarking(marking)
            .setGaugeSize(gaugeSize)
            .setTargetID(targetID);

        assert.deepEqual(this.builder.getCard(), expected);
        assert.deepEqual(this.builder.setCard(expected).getCard(), expected);
    });
});

suite('RangeBuilder', function() {
    setup(function () {
        this.builder = new RangeBuilder();
    });

    test('Creates blank range object to spec', function () {
        var range = RangeBuilder.createBlankRange();
        var blank = {
            host:'',
        name:'',
        relay:'',
        cards:[]
        };

        assert.deepEqual(range, blank);
    });

    test('getRange() works as expected', function () {
        var blank = {
            host:'',
        name:'',
        relay:'',
        cards:[]
        };

        assert.deepEqual(this.builder.getRange(), blank);
    });

    test('Sets host as expected', function () {
        var host = 'Rygge SKL';
        var expected = {
            host:host,
        name:'',
        relay:'',
        cards:[]
        };

        this.builder.setHost(host);
        assert.deepEqual(this.builder.getRange(), expected);
    });

    test('Sets name as expected', function () {
        var name = '100m';
        var expected = {
            host:'',
        name:name,
        relay:'',
        cards:[]
        };

        this.builder.setName(name);
        assert.deepEqual(this.builder.getRange(), expected);
    });

    test('Sets relay as expected', function () {
        var relay = '1';
        var expected = {
            host:'',
        name:'',
        relay:relay,
        cards:[]
        };

        this.builder.setRelay(relay);
        assert.deepEqual(this.builder.getRange(), expected);
    });

    test('Adds cards as expected', function () {
        var card1 = {
            lane:'1',
        shooter:{
            name:'foo',
        club:'bar',
        className:'roof',
        category:'kkk'
        },
        result:
    {
        seriesName:'Ligg',
        seriesSum: '0',
        totalSum: '100',
        marking: true,
        shots: []
    },
        config:
    {
        gaugeSize:10,
        targetID:'100m'
    }
        };

        var card2 = {
            lane:'2',
            shooter:{
                name:'loo',
                club:'car',
                className:'root',
                category:'fff'
            },
            result:
            {
                seriesName:'Kne',
                seriesSum: '50',
                totalSum: '200',
                marking: false,
                shots: []
            },
            config:
            {
                gaugeSize:18,
                targetID:'300m'
            }
        };

        var card3 = {
            lane:'1',
            shooter:{
                name:'foo',
                club:'bar',
                className:'rook',
                category:'kkk'
            },
            result:
            {
                seriesName:'Stå',
                seriesSum: '0',
                totalSum: '100',
                marking: true,
                shots: []
            },
            config:
            {
                gaugeSize:10,
                targetID:'100m'
            }
        };

        assert.deepEqual(this.builder.getRange().cards, []);

        this.builder.addCard(card1);
        this.builder.addCard(card2);
        this.builder.addCard(card3);

        var range = this.builder.getRange();
        assert.deepEqual(range.cards[0], card1);
        assert.deepEqual(range.cards[1], card2);
        assert.deepEqual(range.cards[2], card3);
    });

    test('Calling setCards() with empty array removes all cards', function () {
        var card1 = {
            lane:'1',
        name:'foo',
        club:'bar'
        };

        var card2 = {
            lane:'2',
        name:'bar',
        club:'foo'
        };

        var card3 = {
            lane:'3',
        name:'foo',
        club:'baz'
        };

        this.builder.addCard(card1);
        this.builder.addCard(card2);
        this.builder.addCard(card3);

        var range = this.builder.setCards([]).getRange();
        assert.deepEqual(range.cards, []);
    });

    test('setCards() adds cards as expected', function () {
        var card1 = {
            lane:'1',
        shooter:{
            name:'foo',
        club:'bar',
        className:'roof',
        category:'kkk'
        },
        result:
    {
        seriesName:'Ligg',
        seriesSum: '0',
        totalSum: '100',
        marking: true,
        shots: []
    },
        config:
    {
        gaugeSize:10,
        targetID:'100m'
    }
        };

        var card2 = {
            lane:'2',
            shooter:{
                name:'loo',
                club:'car',
                className:'root',
                category:'fff'
            },
            result:
            {
                seriesName:'Kne',
                seriesSum: '50',
                totalSum: '200',
                marking: false,
                shots: []
            },
            config:
            {
                gaugeSize:18,
                targetID:'300m'
            }
        };

        var card3 = {
            lane:'1',
            shooter:{
                name:'foo',
                club:'bar',
                className:'rook',
                category:'kkk'
            },
            result:
            {
                seriesName:'Stå',
                seriesSum: '0',
                totalSum: '100',
                marking: true,
                shots: []
            },
            config:
            {
                gaugeSize:10,
                targetID:'100m'
            }
        };

        var range = this.builder.setCards([card1, card2, card3]).getRange();
        assert.deepEqual(range.cards[0], card1);
        assert.deepEqual(range.cards[1], card2);
        assert.deepEqual(range.cards[2], card3);
    });

    test('setCards() owerwrites existing and adds new cards as expected', function () {
        var card1 = {
            lane:'1',
        shooter:{
            name:'foo',
        club:'bar',
        className:'roof',
        category:'kkk'
        },
        result:
    {
        seriesName:'Ligg',
        seriesSum: '0',
        totalSum: '100',
        marking: true,
        shots: []
    },
        config:
    {
        gaugeSize:10,
        targetID:'100m'
    }
        };

        var card2 = {
            lane:'2',
            shooter:{
                name:'loo',
                club:'car',
                className:'root',
                category:'fff'
            },
            result:
            {
                seriesName:'Kne',
                seriesSum: '50',
                totalSum: '200',
                marking: false,
                shots: []
            },
            config:
            {
                gaugeSize:18,
                targetID:'300m'
            }
        };

        var card3 = {
            lane:'1',
            shooter:{
                name:'foo',
                club:'bar',
                className:'rook',
                category:'kkk'
            },
            result:
            {
                seriesName:'Stå',
                seriesSum: '0',
                totalSum: '100',
                marking: true,
                shots: []
            },
            config:
            {
                gaugeSize:10,
                targetID:'100m'
            }
        };

        var card4 = {
            lane:'4',
            shooter:{
                name:'jko',
                club:'plr',
                className:'rakf',
                category:'kfk'
            },
            result:
            {
                seriesName:'fkgg',
                seriesSum: '2',
                totalSum: '1f0',
                marking: true,
                shots: []
            },
            config:
            {
                gaugeSize:119,
                targetID:'092m'
            }
        };

        var card5 = {
            lane:'5',
            shooter:{
                name:'lfo',
                club:'caf',
                className:'rfot',
                category:'ffd'
            },
            result:
            {
                seriesName:'dne',
                seriesSum: '80',
                totalSum: '290',
                marking: false,
                shots: []
            },
            config:
            {
                gaugeSize:15,
                targetID:'310m'
            }
        };

        var card6 = {
            lane:'6',
            shooter:{
                name:'noo',
                club:'bbr',
                className:'rkok',
                category:'kkh'
            },
            result:
            {
                seriesName:'itå',
                seriesSum: '8',
                totalSum: '14444',
                marking: false,
                shots: []
            },
            config:
            {
                gaugeSize:12,
                targetID:'130m'
            }
        };

        this.builder.setCards([card1, card2, card3]).getRange();
        var range = this.builder.setCards([card4, card5, card6]).getRange();

        assert.deepEqual(range.cards[0], card4);
        assert.deepEqual(range.cards[1], card5);
        assert.deepEqual(range.cards[2], card6);
    });

    test('resetCards() clears cards', function () {
        var card1 = {
            lane:'1',
        name:'foo',
        club:'bar'
        };

        var card2 = {
            lane:'2',
        name:'bar',
        club:'foo'
        };

        var card3 = {
            lane:'3',
        name:'foo',
        club:'baz'
        };

        this.builder.setCards([card1, card2, card3]).getRange();
        this.builder.resetCards();

        assert.deepEqual(this.builder.getRange().cards, []);
    });

    test('Setters work as expected', function () {
        var expected = {
            host:'Rygge SKL',
        name:'100m',
        relay:'1',
        cards:[
    {
        lane:'6',
        shooter:{
            name:'noo',
        club:'bbr',
        className:'rkok',
        category:'kkh'
        },
        result:
    {
        seriesName:'itå',
        seriesSum: '8',
        totalSum: '14444',
        marking: false,
        shots: []
    },
    config:
    {
        gaugeSize:12,
        targetID:'130m'
    }
    },
    {
        lane:'6',
        shooter:{
            name:'noo',
            club:'bbr',
            className:'rkok',
            category:'kkh'
        },
        result:
        {
            seriesName:'itå',
            seriesSum: '8',
            totalSum: '14444',
            marking: true,
            shots: []
        },
        config:
        {
            gaugeSize:12,
            targetID:'130m'
        }
    },
    {
        lane:'6',
        shooter:{
            name:'noo',
            club:'bbr',
            className:'rkok',
            category:'kkh'
        },
        result:
        {
            seriesName:'itå',
            seriesSum: '8',
            totalSum: '14444',
            marking: true,
            shots: []
        },
        config:
        {
            gaugeSize:12,
            targetID:'130m'
        }
    }]};

    var range = this.builder.setName(expected.name)
        .setHost(expected.host)
        .setRelay(expected.relay)
        .setCards(expected.cards)
        .getRange();
    assert.deepEqual(range, expected);
    });
});
