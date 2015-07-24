var a = 'a'+Math.random();
var b = 'b'+Math.random();
var c = 'c'+Math.random();

window.localStorage.clear();
window.sessionStorage.clear();

var LS = new SG.LocalStorage();
LS.set(a,b);
console.assert(LS.get(a,c)===b);
console.log(LS.ds);

var SS = new SG.LocalStorage({
    dataStore:window.sessionStorage,
});
SS.set(a,b);
console.assert(SS.get(a,c)===b);
console.log(LS.ds);

var JS = new SG.LocalStorage({
    prefix:'JS:',
});
JS.set(a,b);
console.assert(JS.get(a,c)===b);
console.log(JS.ds);

var AS = new SG.LocalStorage({
    prefix:'AS:',
    dataStore:new SG.DataStore(),
});
AS.set(a,b);
console.assert(AS.get(a,c)===b);
console.log(AS.ds);
