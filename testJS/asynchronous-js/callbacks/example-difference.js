function print1(){
    const number1 = 1;
    console.log(number1);
}

function print2(){
    //synchrounous
    function getNumber2(){
        return 2 
    } 
    //blocking  call
    const number2 = getNumber2();
    console.log(number2);
}

function print3(){
    const fs = require('fs');
    const callback =  (err, number3) => {
        console.log(number3);
    }
    //asynchrounous 'reading file'
    fs.readFile('./number3.txt', 'utf-8', callback) // non-blocking call
}

function print4(){
    const number4 = 4;
    console.log(number4);
}

print1();
print2();
print3(); //exits without waiting
print4();

/* OUT
> 1
> 2
> 4
> 3 // call stack empties - fetch message queue - callback executed
*/
