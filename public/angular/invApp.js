angular.module('invApp',[]);

angular.module('invApp').config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});


var invesData = function($http){
    return $http.get('/api/borrowers')
}

var borrowerListCtrl = function ($scope,invesData) {
    $scope.message = 'Searching for borrowers';
	invesData
    .success(function(data) {
        $scope.message = data.length > 0 ? "":"No borrowers found";
        $scope.data = {
            borrowers:data
        }    
    })
    .error(function(e) {
        $scope.message = 'Sorry something gone wrong';
        console.log(e);
    });
};

angular.module('invApp')
.controller('BorrowerListController',borrowerListCtrl)
.service('invesData',invesData);

