const calculateSquare = (number, callback) => {
    const promise = new Promise((resolve, reject)=>{
        setTimeout( () => {
            if (typeof number !== 'number'){
                return reject(new Error('Argument of type number is expected'))
            }
            const result = number * number;
            resolve(result);
        }, 3000);
    });
    return promise;
}

module.exports = calculateSquare;