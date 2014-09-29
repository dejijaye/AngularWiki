var app = angular.module("nuttyWiki", ['ngSanitize']).config( function($sceProvider){
	$sceProvider.enabled(false);
});

app.controller('searchController', ['$scope', '$http', function($scope, $http)
{
	config = {
		params: {
			action: "parse",
			format: "json",
			prop: "text",
			section: 0,
			redirects: '',
			callback: "JSON_CALLBACK"
		}
	};

	$scope.getResults = function(){
		var article = "SEARCH RESULT";
		var entry = $scope.entry;
		console.log(entry);
		var buildUrl = "http://en.wikipedia.org/w/api.php?"
		config.params.page = entry;
		// config.params.url = buildUrl;
		// console.log(config.params.query);
		console.log(buildUrl);
		
		$http({
			method: 'jsonp',
			url: buildUrl,
			params: config.params
		}).success(function(response){
			console.log(response);
			$scope.article = response.parse.text["*"];
		}).error(function(response){

		});
		$scope.getBooks();
	};

	$scope.getBooks = function(){
		config ={
			params: {
				url: "https://www.googleapis.com/books/v1/volumes",
				q: '',
				orderBy: "newest"
			}
		};
		var books = [];
		config.params.q = $scope.entry;
		$http({
			method: 'GET',
			dataType: 'jsonp',
			url: config.params.url,
			params: config.params
		}).success(function(response){
			console.log(response);
			$scope.books = response.items;
		}).error(function(response){

		});
	};


}
]);