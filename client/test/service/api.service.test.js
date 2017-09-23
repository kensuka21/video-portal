describe('ApiService', function () {
    var httpBackend, apiService, localStorage;
    beforeEach(module('videoPortalApp'));

    beforeEach(function () {
       module(function ($provide) {
           $provide.value('$localStorage', {
               authInfo: {
                   sessionId: 'session'
               }
           });
       })
    });

    beforeEach(inject(function ($httpBackend, ApiService, $localStorage) {
        httpBackend = $httpBackend;
        apiService = ApiService;
        localStorage = $localStorage;
    }));

    it('When executing the get method should make the ajax request with sessionId', function () {
        // localStorage.authInfo = { sessionId: 'sessionId' };
        var returnedData;
        var url = 'http://localhost/videos';
        var expectedData = {status: 'success', data: [{title: '1st request'}]};


        apiService.get(url)
            .then(function (response) {
                returnedData = response.data;
            });

        httpBackend.whenGET(url + '?sessionId='  + localStorage.authInfo.sessionId).respond(200, expectedData);

        httpBackend.flush();


        expect(returnedData).toEqual(expectedData);
    });

    it('When executing the post method should make the ajax request with sessionId', function () {
        var returnedData;
        var url = 'http://localhost/videos';
        var obj = {title: '1st request'};
        var expectedData = [{title: '1st request'}];


        apiService.post(url, obj)
            .then(function (response) {
                returnedData = response.data;
            });

        httpBackend.whenPOST(url + '?sessionId=' + localStorage.authInfo.sessionId).respond(200, expectedData);

        httpBackend.flush();

        expect(returnedData).toEqual(expectedData);
    });
});