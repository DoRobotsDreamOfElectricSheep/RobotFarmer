var should = require('should'),
    sinon = require('sinon');

describe('some unit test', function () {
    describe('#first test', function () {
        it('should pass fake unit test', function () {
            //Arrange
            var urlWithWhiteSpace = " www.foo.com ";
            
            //Act
            var result = urlWithWhiteSpace.trim();
            
            //Assert
            result.url.should.eql(urlWithWhiteSpace.trim());
        });
    });
});