module.exports = {
    card:{
        CardBuilder:require('./src/card/CardBuilder'),
        ConfigBuilder:require('./src/card/ConfigBuilder'),
        ResultBuilder:require('./src/card/ResultBuilder'),
        ShooterBuilder:require('./src/card/ShooterBuilder'),
        ShotBuilder:require('./src/card/ShotBuilder')
    },
    target:{
        TargetBuilder:require('./src/target/TargetBuilder'),
        RingTargetBuilder:require('./src/target/RingTargetBuilder')
    }
};
