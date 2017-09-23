describe('Average', function () {
    var average;

    beforeEach(module('videoPortalApp'));

    beforeEach(inject(function (Average) {
        average = Average;
    }));

    it('Average should return the correct average', function () {
        var ratings = [2, 5];
        var expectedAverage = 3.5;

        var returnedAverage = average(ratings);

        expect(returnedAverage).toBe(expectedAverage);
    });
});