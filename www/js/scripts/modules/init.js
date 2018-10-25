requirejs.config({
    paths: {
        getData:'scripts/modules/getData',
        storedData:'scripts/modules/storedData'
    },
    waitSeconds: 0,
});
define(["getData","storedData"],function(getData,storedData){
    return{
        getData:getData,
        storedData:storedData
    }
});
