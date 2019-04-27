const print = (number) => console.log(number);

const numbers = [1,2,3,4];
numbers.forEach(print);


function f(callback){
    //setTimeout is asynchronous
    setTimeout(()=> callback(),0); 
}
f(()=> console.log('this is asynchronous'));
function g(callback){
    callback(); //synchronous
}
g(()=> console.log('this is synchronous'));
console.log('hello world!');
//set timeout puts callback in the message quee, ence gets printed after "Hello World!"


const calculateSquare = (number, callback) => {
    setTimeout( () => {
        if(typeof number !== 'number'){
            // error first callbacks
            callback(new Error('Argument of type number is expected'));
            return;
        }
        const result = number * number;
        callback(null, result);
    }, 1000);
}
const errorFirstCallback = (error, result) => {
    if (error !== null){
        console.log('Caught Error: ' + String(error));
        return;
    } // error first callbacks pattern
    console.log(result);
}

calculateSquare('bad arg', errorFirstCallback);
calculateSquare(2, errorFirstCallback);


//callback hell -> to get a delay of 1 second between prints
calculateSquare(2, (error, result)=>{
    console.log(result);
    calculateSquare(3, (error, result)=>{
        console.log(result);
        calculateSquare(4, (error, result)=>{
            console.log(result);
            calculateSquare(5, (error, result)=>{
                console.log(result);
                calculateSquare(6, (error, result)=>{
                    console.log(result);
                });
            });
        });
    });
});


//callbacks lack readability
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://dog.ceo/api/breeds/list/all');
xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE){
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        const breeds = Object.keys(response.message);
        const fistBreed = breeds[0];
        const xhr2 = new XMLHttpRequest();
        xhr2.open('GET', 'http://dog.ceo/api/breed/'+fistBreed+'/images/random');
        xhr2.onreadystatechange = () => {
            if (xhr2.readyState === XMLHttpRequest.DONE){
                const response2 = JSON.parse(xhr2.responseText);
                console.log(response2);
            }
        }
    }
}
xhr.send(null);
