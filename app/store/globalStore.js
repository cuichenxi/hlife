let globalInfo = {

};

export default globalStore = {
    initData(){

    },
    get() {
        return globalInfo;
    },
    set(data = {}) {
        globalInfo = Object.assign(globalInfo, data);
        console.log('globalInfo:' + JSON.stringify(globalInfo));
    },

    remove(key = {}) {
        globalInfo = Object.assign(globalInfo, {key: null});
        console.log('globalInfo:' + JSON.stringify(globalInfo));
    },

    clear() {
        globalInfo = {};
    },
}

