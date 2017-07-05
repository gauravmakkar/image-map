'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }]).controller('View1Ctrl', ['$scope', function ($scope) {
        $scope.cordinates = []
        /**
         * The method will pick the cordinates from the image and
         * a dot will be displayed in the UI.
         * @param event
         */
        $scope.createCordinates = function (event) {
            if ($scope.active) {
                return
            }
            var clientX = event.clientX
            var clientY = event.clientY
            var exisiting_cordinates = $scope.cordinates.filter(function (crd) {
                if (crd.y === clientY && crd.x === clientX) {
                    return true
                }
            })
            if (exisiting_cordinates.length == 0) {
                $scope.active = {x: clientX, y: clientY, index: $scope.cordinates.length}
                $scope.cordinates.push($scope.active)
            }
        }

        /**
         * The method will set the cordinates of dot
         * created after clicking the image.
         * @param cordinate
         * @returns {{position: string, left: string, top: string, padding: string, backgroundColor: string, borderRadius: string, cursor: string}}
         */
        $scope.setCordinate = function (cordinate) {
            return {
                position: 'absolute',
                left: cordinate.x - 4 + 'px',
                top: cordinate.y - 4 + 'px',
                padding: '4px',
                backgroundColor: 'black',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0px 0px 10px yellow'
            }
        }

        /**
         * The method will open the form
         * to create/view the note specific to
         * the cordinates.
         * @param cordinate
         */
        $scope.openForm = function (cordinate) {
            $scope.cordinates.map(function (crd, index) {
                if (cordinate.x === crd.x && cordinate.y === crd.y) {
                    $scope.active = crd
                } else {
                    crd.active = false
                }
                return crd
            })
        }

        $scope.setFormCordinates = function () {
            return {
                position: 'absolute',
                backgroundColor: 'lightgrey',
                left: $scope.active.x + 4 + 'px',
                top: $scope.active.y + 4 + 'px',
                border: '2px solid darkgrey',
                textAlign: 'left'
            }
        }

        $scope.deleteActive = function (index) {
            if (!$scope.active.created) {
                $scope.cordinates.splice(index, 1)
            }
            delete $scope.active

        }

        $scope.createNote = function (index) {
            $scope.active.created = true
            $scope.cordinates[index] = $scope.active
            delete $scope.active
        }

    }]).directive("worldMap", function () {
    return {
        templateUrl: "view1/imageMap.html"
    }
});