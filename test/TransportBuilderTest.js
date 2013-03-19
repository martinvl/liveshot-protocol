var assert = require('chai').assert;

var CardBuilder = require('../src/CardBuilder');
var ConfigBuilder = require('../src/ConfigBuilder');
var ResultBuilder = require('../src/ResultBuilder');
var ShooterBuilder = require('../src/ShooterBuilder');
var ShotBuilder = require('../src/ShotBuilder');

suite('CardBuilder', function() {
    setup(function () {
        this.builder = new CardBuilder();
    });

    test('Creates blank card object to spec', function () {
        var card = CardBuilder.createBlankCard();
        var blank = {
            range:'',
            relay:'',
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
                shots:[]
            },
            config:{
                gaugeSize:1,
                targetID:''
            }
        };

        assert.deepEqual(card, blank);
    });

    test('getConfig() works as expected', function () {
        var blank = {
            range:'',
            relay:'',
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
                shots:[]
            },
            config:{
                gaugeSize:1,
                targetID:''
            }
        };

        assert.deepEqual(this.builder.getCard(), blank);
    });

    test('Sets range as expected', function () {
        var range = '100m';
        var expected = {
            range:range,
            relay:'',
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
                shots:[]
            },
            config:{
                gaugeSize:1,
                targetID:''
            }
        };

        this.builder.setRange(range);
        assert.deepEqual(this.builder.getCard(), expected);
    });

    test('Sets relay as expected', function () {
        var relay = '1';
        var expected = {
            range:'',
            relay:relay,
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
                shots:[]
            },
            config:{
                gaugeSize:1,
                targetID:''
            }
        };

        this.builder.setRelay(relay);
        assert.deepEqual(this.builder.getCard(), expected);
    });

    test('Sets lane as expected', function () {
        var lane = '1';
        var expected = {
            range:'',
            relay:'',
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
                shots:[]
            },
            config:{
                gaugeSize:1,
                targetID:''
            }
        };

        this.builder.setLane(lane);
        assert.deepEqual(this.builder.getCard(), expected);
    });

    test('Setters work as expected', function () {
        var range = '100m';
        var relay = '1';
        var lane = '1';
        var name = 'Martin V. Larsen';
        var club = 'Rygge';
        var className = '4';
        var category = 'LF';
        var seriesName = 'Ligg';
        var seriesSum = '50';
        var totalSum = '250';
        var gaugeSize = .5;
        var targetID = 'DFS100m';

        var expected = {
            range:range,
            relay:relay,
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
                shots:[]
            },
            config:{
                gaugeSize:gaugeSize,
                targetID:targetID
            }
        };

        this.builder.setRange(range)
            .setRelay(relay)
            .setLane(lane)
            .setName(name)
            .setClub(club)
            .setClassName(className)
            .setCategory(category)
            .setSeriesName(seriesName)
            .setSeriesSum(seriesSum)
            .setTotalSum(totalSum)
            .setGaugeSize(gaugeSize)
            .setTargetID(targetID);

        assert.deepEqual(this.builder.getCard(), expected);
    });
});

suite('ConfigBuilder', function() {
    setup(function () {
        this.builder = new ConfigBuilder();
    });

    test('Creates blank config object to spec', function () {
        var config = ConfigBuilder.createBlankConfig();

        assert.deepEqual(config, {gaugeSize:1, targetID:''});
    });

    test('getConfig() works as expected', function () {
        assert.deepEqual(this.builder.getConfig(), {gaugeSize:1, targetID:''});
    });

    test('Sets gaugeSize as expected', function () {
        var gaugeSize = .5;

        this.builder.setGaugeSize(gaugeSize);
        assert.deepEqual(this.builder.getConfig(), {gaugeSize:gaugeSize, targetID:''});
    });

    test('Sets targetID as expected', function () {
        var targetID = '100m';

        this.builder.setTargetID(targetID);
        assert.deepEqual(this.builder.getConfig(), {gaugeSize:1, targetID:targetID});
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
        assert.deepEqual(this.builder.getConfig(), {gaugeSize:1, targetID:''});

        // check that the original config has not been changed
        assert.deepEqual(config, {gaugeSize:gaugeSize, targetID:targetID});
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
            shots:[]
        };

        assert.deepEqual(result, blank);
    });

    test('getResult() works as expected', function () {
        var blank = {
            seriesName:'',
            seriesSum:'',
            totalSum:'',
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
            shots:[]
        };

        this.builder.setSeriesSum(seriesSum);
        assert.deepEqual(this.builder.getResult(), expected);
    });

    test('Sets seriesName as expected', function () {
        var totalSum = '250';
        var expected = {
            seriesName:'',
            seriesSum:'',
            totalSum:totalSum,
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
            .addShot(shotA)
            .addShot(shotB)
            .getResult();

        var resultB = new ResultBuilder()
            .setSeriesName('Kne')
            .setSeriesSum('49')
            .setTotalSum('249')
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
            shots:[]
        };

        var resultA = this.builder
            .setSeriesName('Ligg')
            .setSeriesSum('50')
            .setTotalSum('250')
            .addShot(shotA)
            .addShot(shotB)
            .getResult();

        var resultB = new ResultBuilder()
            .setSeriesName('Ligg')
            .setSeriesSum('50')
            .setTotalSum('250')
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
            shots:[]
        };

        var shotsA = this.builder
            .setSeriesName('Ligg')
            .setSeriesSum('50')
            .setTotalSum('250')
            .addShot(shotA)
            .addShot(shotB)
            .getResult().shots;

        var shotsB = new ResultBuilder()
            .setSeriesName('Ligg')
            .setSeriesSum('50')
            .setTotalSum('250')
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

suite('ShotBuilder', function() {
    setup(function () {
        this.builder = new ShotBuilder();
    });

    test('Creates blank shot object to spec', function () {
        var shot = ShotBuilder.createBlankShot();

        assert.deepEqual(shot, {x:0, y:0, value:''});
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
});

suite('ShooterBuilder', function() {
    setup(function () {
        this.builder = new ShooterBuilder();
    });

    test('Creates blank shooter object to spec', function () {
        var shooter = ShooterBuilder.createBlankShooter();

        assert.deepEqual(shooter, {name:'', club:'', className:'', category:''});
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
