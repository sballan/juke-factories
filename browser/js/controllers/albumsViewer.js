//albumViewer.js
app.controller('AlbumsViewer', function($scope, $http, $rootScope) {

	$scope.show = true;
	$http.get('/api/albums/')
	.then(function (response) {

		var albums = response.data;
		//IMAGES
		albums.forEach(function(album){
			album.imageUrl = '/api/albums/' + album._id + '.image'
		})
			$scope.albums = albums;
	})


	$rootScope.$on('viewSwap', function(evt, data) {
		switch(data.type) {
			case 'showAlbumList':
				$scope.show = false;
				break;
			case 'showAlbumsView':
				$scope.show = true;
				break;
			default:
				break;
		}
	})

	$scope.pickAlbum = function(type, albumId){
		$scope.show = false;
		$rootScope.$broadcast('viewSwap', {type: type, albumId: albumId});
	}

	/*
		This may be a better way to do the viewSwap:

		$rootScope.$on('viewSwap', function (evt, viewName) {
    $scope.showMe = (viewName == 'allAlbums');
});
// there'll also need to be something like below
// which we can use with ng-click in the html
$scope.viewOneAlbum = function () {
    $rootScope.$broadcast('viewSwap', 'oneAlbum');
};
...
	*/
})