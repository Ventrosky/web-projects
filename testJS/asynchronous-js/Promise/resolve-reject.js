const logToConsole = (somePromise) => {
    somePromise.then(value => console.log(value));
}

const somePromise = new Promise(
    (resolve, rejects) => resolve('Hello')
);

logToConsole(somePromise);

// create promises out of non promises

const value = "string"
const promisifiedValue = Promise.resolve(value);
logToConsole(promisifiedValue);

const rejectedPromise = Promise.reject(new Error("error"));