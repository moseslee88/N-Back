angular.module('gameModule')
.component('motest', {
	templateUrl : 'app/gameModule/motest.component.html',
	controller : function($location, $timeout, $rootScope, randomNumService) {
		var vm = this;
		
		vm.ArrofNumbers = [];
		vm.getPracticeNums = [2, 4, 6, 8, 10, 12, 14, 1];
		
		 $timeout(callAtTimeout, 3000);
		 
		 vm.getDisplayNums = function() {
				vm.randomNums = Math.floor(Math.sqrt(vm.points / 100) * 100 * $rootScope.gameDifficulty * Math.sqrt($rootScope.gameDifficulty));
				console.log("points: " + vm.randomNums);
			}



	function callAtTimeout() {
	    console.log("Timeout occurred - just a time test");
	}
	

	//shows an array of Randomly-generated Letters based on given total numbers 
	var randomNums = [];
	var random4Nums = [];
	var random6Nums = [];
	var random8Nums = [];
	var random10Nums = [];
	var random12Nums = [];
	var random14Nums = [];
	var random16Nums = [];
	randomNums = randomNumService.getLetters(2);
	vm.showNumbers  = randomNums;
	random4Nums = randomNumService.getLetters(4);
	vm.show4Numbers = random4Nums;
	random6Nums = randomNumService.getLetters(6);
	vm.show6Numbers = random6Nums;
	random8Nums = randomNumService.getLetters(8);
	vm.show8Numbers = random8Nums;
	random10Nums = randomNumService.getLetters(10);
	vm.show10Numbers = random10Nums;
	random12Nums = randomNumService.getLetters(12);
	vm.show12Numbers = random12Nums;
	random14Nums = randomNumService.getLetters(14);
	vm.show14Numbers = random14Nums;
	random24Nums = randomNumService.getLetters(24);    //level 8 is really really hard
	vm.show24Numbers = random24Nums;
	//vm.showNumbersNoQuotes = "2 4 77";
	
		
		
	},
	controllerAs  : 'vm'
})