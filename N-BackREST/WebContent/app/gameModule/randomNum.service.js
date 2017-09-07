//this is broken!

angular.module('gameModule')
	.factory('randomNumService', function($filter, $http, $rootScope) {
		var service = {};

		var digits = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
		
		//deprecated  V
		//input number of digits needed, will return array of digits
		service.getDigits = function(inputNum) {
			finalArr = [];
			for (var i = 0; i < inputNum; i++) {
				finalArr.push(digits[Math.floor(Math.random * digits.length)])
			}
			return finalArr;
		};
		
		//preferred  V
		//input max num (exclusive!) and total nums needed, will return array of random nums
		service.getNums = function(maxNum, totalNum){
			finalArr = [];
			for (var i = 0; i < totalNum; i++) {
				finalArr.push(Math.floor(Math.random()*maxNum));
			}
			return finalArr;
		}

		return service;
	})