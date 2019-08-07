const cache = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        var val = localStorage.getItem(key);
        var dataobj = JSON.parse(val);
        return dataobj
    },
    clear(){
        localStorage.removeItem(key);
    }
}
export default cache;
