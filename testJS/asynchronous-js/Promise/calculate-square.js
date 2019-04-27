const calculateSquare = (number, callback) => {
    const promise = new Promise((resolve, reject)=>{
        setTimeout( () => {
            if (typeof number !== 'number'){
                return reject(new Error('Argument of type number is expected'))
            }
            const result = number * number;
            resolve(result);
        }, 1000);
    });
    return promise;
}
/*
calculateSquare(2)
    .then(value => {
            console.log("Succes: " + value);
        }, reason => {
            console.log("Error: " + reason);
        }
    );
//chained promises
calculateSquare(2)
    .then(value => {
        console.log("Succes: " + value);
        //throw new Error('error');
        return calculateSquare('string');
    })
    .then(value2 => {
        console.log("Succes: " + value2);
    }, reason => {
        console.log("Error: " + reason);
    });


// avoid callback hell, print with delay
calculateSquare(2)
    .then(value => {
        console.log("Succes: " + value);
        return calculateSquare(3);
    })
    .then(value => {
        console.log("Succes: " + value);
        return calculateSquare(4);
    })
    .then(value => {
        console.log("Succes: " + value);
        return calculateSquare(5);
    });
*/

//handle rejections
calculateSquare(2)
    .then(value => {
        console.log("Succes: " + value);
        return calculateSquare(2);
    })
    .then(value => {
        //throw new Error('error');
        return new Promise((resolve, reject) => {
            return reject(new Error('Something went wrong'));
        })
        console.log(value);
    })
    .catch(reason => {//same as .then(undefined, reason => {
        console.log("catched Error: " + reason);
    });


module.exports = calculateSquare;