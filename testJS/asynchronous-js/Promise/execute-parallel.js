
function askDealer1(){
    return new Promise((resolve, reject) =>{
        setTimeout( ()=> resolve(8000), 2000);
    });
}
function askDealer2(){
    return new Promise((resolve, reject) =>{
        setTimeout( ()=> resolve(12000), 4000);
    });
}
function askDealer3(){
    return new Promise((resolve, reject) =>{
        setTimeout( ()=> resolve(10000), 3000);
    });
}

Promise.all([askDealer1(),askDealer2(),askDealer3()])
    .then(prices => {
        console.log(prices);
    });


// rejections
function askDealer4(){
    return new Promise((resolve, reject) =>{
        setTimeout( ()=> reject('not suitable'), 1000);
    });
}
Promise.all([askDealer1(),askDealer4(),askDealer3()])
    .then(prices => {
        console.log(prices);
    })
    .catch(error => {
        console.log(error);
    });

Promise.all([
    askDealer1().catch(error => error),
    askDealer4().catch(error => error),
    askDealer3().catch(error => error),
    //Promise.reject('rejected') // will reject immediatly
    ])
    .then(prices => {
        console.log(prices);
    })
    .catch(error => {
        console.log(error);
    });

// get the first one
Promise.race([askDealer1(),askDealer2(),askDealer3()])
    .then(value => {
        console.log(value);
    });

Promise.race([askDealer1(),askDealer4(),askDealer3()])
    .then(value => {
        console.log(value);
    })
    .catch(reason => {
        console.log(`Reason: ${reason}`);
    });    

const askShop = ()=>{
    return Promise.resolve('always resolve first.')
} // even if last will be cokmpleted first

Promise.race([askDealer1(),askDealer4(),askDealer3(), askShop()])
    .then(value => {
        console.log(value);
    }); 