angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MonumentsCtrl', function($scope, $ionicModal, Monuments) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var promise = Monuments.promise();
  promise.success(function(data){
    $scope.chats = Monuments.all();
  });

  $ionicModal.fromTemplateUrl('templates/modal-shuffle.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

})
.controller('MonumentDetailCtrl', function($scope, $stateParams, $ionicModal, Monuments) {
  var promise = Monuments.promise();
  promise.success(function(data){
    $scope.chat = Monuments.get($stateParams.chatId);
    console.log( $scope.chat );
  });

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
})

.controller('EventsCtrl', function($scope, $ionicModal, Events) {
  $scope.chats = Events.all();

  $ionicModal.fromTemplateUrl('templates/modal-return.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

})
.controller('EventDetailCtrl', function($scope, $stateParams, Events) {
  $scope.chat = Events.get($stateParams.chatId);
})
