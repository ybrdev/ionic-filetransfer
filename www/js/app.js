// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.controller("FileController", function($scope, $ionicLoading) {
	$scope.download = function() {
		$ionicLoading.show({
			template: 'Loading...'
		});
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
			fs.root.getDirectory(
				"ExampleProject",
				{
					create: true
				},
				function(dirEntry) {
					dirEntry.getFile(
						"test.png", 
						{
							create: true, 
							exclusive: false
						}, 
						function gotFileEntry(fe) {
							var p = fe.toURL();
							fe.remove();
							ft = new FileTransfer();
							ft.download(
								encodeURI("http://ionicframework.com/img/ionic-logo-blog.png"),
								p,
								function(entry) {
									$ionicLoading.hide();
									$scope.imgFile = entry.toURL();
								},
								function(error) {
									$ionicLoading.hide();
									alert("Download Error Source -> " + error.source);
								},
								false,
								null
							);
						}, 
						function() {
							$ionicLoading.hide();
							console.log("Get file failed");
						}
					);
				}
			);
		},
		function() {
			$ionicLoading.hide();
			console.log("Request for filesystem failed");
		});
    }
    $scope.load = function() {
		$ionicLoading.show({
			template: 'Loading...'
		});
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
			fs.root.getDirectory(
				"ExampleProject",
				{
					create: false
				},
				function(dirEntry) {
					dirEntry.getFile(
						"test.png", 
						{
							create: false, 
							exclusive: false
						}, 
						function gotFileEntry(fe) {
							$ionicLoading.hide();
							$scope.imgFile = fe.toURL();
						}, 
						function(error) {
							$ionicLoading.hide();
							console.log("Error getting file");
						}
					);
				}
			);
		},
		function() {
			$ionicLoading.hide();
			console.log("Error requesting filesystem");
		});
	}
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
