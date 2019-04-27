/* Promise can be in 1 of 3 states
    - pending ->
        fulfilled (final state) or
        rejected  (final state)
*/
const myPromise = new Promise( function(resolve, reject){
    resolve('value'); // final state
    reject('reason'); // won't change state
});

console.log(myPromise);

/* 'then' method args
    - onFulfilled
    - onRejected
*/

const hiPromise = new Promise( function(resolve, reject){
    resolve('Hello world!'); 
});
hiPromise.then(function (value){
    console.log(value)
});

const logPromise = new Promise( function(resolve, reject){
    resolve('Hello world!'); 
});
logPromise.then(function (value){
    console.log('logged inside onFulfilled');
});
console.log('logged after logPromise.then');