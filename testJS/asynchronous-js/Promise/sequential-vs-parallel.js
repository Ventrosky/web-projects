function myPrint1(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Print 1 done');
            resolve(1);
        }, 1000);
    });
}

function myPrint2(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Print 2 done');
            resolve(2);
        }, 1000);
    });
}

async function oneByOne(){
    const number1 = await myPrint1();
    const number2 = await myPrint2();
    console.log(number1, number2);
}

async function inParallel(){
    const promise1 = myPrint1();
    const promise2 = myPrint2();
    console.log(await promise1, await promise2);
}

inParallel();