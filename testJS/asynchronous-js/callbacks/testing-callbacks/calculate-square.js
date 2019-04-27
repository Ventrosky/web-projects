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

module.exports = calculateSquare;