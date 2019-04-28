// Async always returns a promise
async function f(){
    return 'Hello World';
}
async function g(){
    return new Promise((resolve, reject) => {
        setTimeout( ()=> resolve(true), 10000);
    });
}
const var1 = g(); // pending for 10 seconds, then resolved
// async ensures return of Promise
async function h(){
    return Promise.reject(404);
} 

//Await waits for rpomise to be resolved or rejected
function getNumber(){
    return new Promise((resolve, reject)=> {
        setTimeout( ()=> resolve(12), 2000);
    });
}
async function fu(){
    const myNumber = await getNumber(); 
    console.log(myNumber); // resume execution when promise resolve
    // only this specific fu stops
}
fu()
// same as using Promise.then
async function fuu(){
    getNumber()
        .then(myNumber => console.log(myNumber));
}
fuu();

const fetch = require('node-fetch');

function getRandomDogImg(){
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(value => console.log(value));
}
// same as
async function getRngDogImg2(){
    let response = await fetch('https://dog.ceo/api/breeds/image/random');
    let value = await  response.json();
    console.log(value);
}
getRandomDogImg();
getRngDogImg2();


//handle errors
async function badFuu(){
    try {
        const response = await fetch('https://badhost.boh/wrong/url');
    } catch (e){
        console.log(e);
    }
}
// or 
async function badFuu2(){
    const response = await fetch('https://badhost.boh/wrong/url');
}
badFuu2().catch(e => console.log(e));