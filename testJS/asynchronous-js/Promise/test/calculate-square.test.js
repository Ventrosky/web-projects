const calculateSquare = require('../src/calculateSquare.js');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

//test suite
describe('calculateSquare', function(){
    this.timeout(4000); //handle timeout for all tests, to be higher the function to be executed
    it('should resolve with number 4 if passed number 2', function(){
        //this.timeout(4000); //handle timeout for single test
        //eventually for promise resolved or rejected
        // return signal async test completion
        return expect(calculateSquare(2)).to.eventually.be.equal(4); 
        // same as expect(calculateSquare(2)).to.eventually.be.equal(4).notify(done); 
    });
    // previous test is the same as 
    it('should resolve with number 4 if passed number 2', function(done){
        expect(calculateSquare(2)).to.eventually.be.equal(4).notify(done); 
    });
    it('should be fulfilled when passed number 2', function(){
        return expect(calculateSquare(2)).to.be.fulfilled;
    });
    it('should be rejected when passed a string', function(){
        return expect(calculateSquare('string')).to.be.rejected;
    });
    // multiple promise assertions in 1 test
    it('multiple promise assertions in 1 test', function(){
        return calculateSquare(2).then(result =>{
            expect(result).to.be.above(3);
            expect(result).to.be.equal(4); 
        })
    });
    it('should be rejected when passed a string', function(){
        return calculateSquare('string').catch(reason => {
            expect(reason).to.not.equal(null);
            expect(reason.message).to.equal('Argument of type number is expected');
        })
    });
})