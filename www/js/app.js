var app = angular.module('soundboard', ['ionic']);

app.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});

app.controller('SoundBoardCtrl', function ($scope, $window) {
  var plays = [],
    i = 0;
	$scope.media = null;

	$scope.model = {
		showMove: false,
		sounds: [
			{
				'title': 'And His Name is...',
				'desc': 'JOHN CENA',
				'file': '/sounds/cena.mp3'
			},
			{
				'title': 'Cock & Fire',
				'desc': 'Gun cock + Shotgun',
				'file': '/sounds/cock-and-fire.mp3'
			},
      {
        'title': 'Ha ha!',
        'desc': '',
        'file': '/sounds/nelson.mp3'
      },
			{
				'title': 'Horn',
				'desc': 'Rap battle airhorn',
				'file': '/sounds/horn.mp3'
			},
			{
				'title': 'The Price Is Wrong',
				'desc': '',
				'file': '/sounds/price-is-right.mp3'
			},
			{
				'title': 'Shotgun',
				'desc': 'just the shotgun',
				'file': '/sounds/shotgun.mp3'
			},
			{
				'title': 'Sad Trombone :(',
				'desc': 'womp womp',
				'file': '/sounds/trombone.mp3'
			},
      {
        'title': 'Who\'s That Pokemon?!',
        'desc': 'It\'s Pikachu!',
        'file': '/sounds/pokemon.mp3'
      },
      {
        'title': 'Zelda Item Catch',
        'desc': '#winning',
        'file': '/sounds/zelda.mp3'
      }
		]
	};

	$scope.deleteSound = function ($index) {
		$scope.model.sounds.splice($index, 1);
	};

	$scope.moveSound = function (sound, fromIndex, toIndex) {
		$scope.model.sounds.splice(fromIndex, 1);
		$scope.model.sounds.splice(toIndex, 0 , sound);
	};

  $scope.stopAudio = function () {
    if ($scope.media) {
      for (i = 0; i < plays.length; i++) {
        plays[i].stop();
      }
      $scope.media.stop();
    }
  };

	$scope.play = function (sound) {
		if ($window.cordova) {
			// ionic.Platform.ready(function () {
				var src = sound.file;
				if (ionic.Platform.is('android')) {
					src = '/android_asset/www' + src;
				}
				$scope.media = new $window.Media(src, function (success) {
          plays.shift();
        });
        plays.push($scope.media);
				$scope.media.play();
			// });
		} else {
			$scope.media = new Audio();
			$scope.media.src = sound.file;
			$scope.media.load();
			$scope.media.play();
		}
	};
});

