requirejs.config({
    paths: {
        getData:'scripts/modules/getData',
        storedData:'scripts/modules/storedData',
        socialSharing:'scripts/modules/socialSharing'
    },
    waitSeconds: 0,
});
define(["getData","storedData","socialSharing"],function(getData,storedData,socialSharing){
    return{
        getData:getData,
        storedData:storedData
    }
});
