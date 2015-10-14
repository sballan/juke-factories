app.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

	var audio = PlayerFactory.getAudio()
	var songs;

	audio.addEventListener('timeupdate', function () {
		$scope.$apply(function() {
			PlayerFactory.setProgress(100 * audio.currentTime / audio.duration)
		})
	});

	audio.addEventListener('ended', function () {
		$scope.$apply(function() {
			$scope.forward();
		})
	});

	$scope.start = function(song) {
		PlayerFactory.start(song);
	}

	$scope.isPlaying = function() {
		return PlayerFactory.isPlaying
	}

	$scope.toggle = function () {
		if (PlayerFactory.isPlaying) PlayerFactory.pause();

		else PlayerFactory.play();
	};

	$scope.forward = function () {
		PlayerFactory.next()
	};

	$scope.back = function () {
		PlayerFactory.previous();
	};

	$scope.currentSong = function() {
		return PlayerFactory.getCurrentSong()
	}

	$scope.progress = function() {
		return PlayerFactory.getProgress();
	}

});