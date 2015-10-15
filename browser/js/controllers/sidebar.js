//sidebar.js
app.controller('SidebarCtrl', function($scope, $rootScope){

	$scope.viewAlbums = function(type){
		$rootScope.$broadcast('viewSwap', {type: type})
	}


})