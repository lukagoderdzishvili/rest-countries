var myApp = angular.module('myApp',[]);


myApp.directive("limitTo", [function() {
  return {
      restrict: "A",
      link: function(scope: any, elem: any, attrs: any) {
          var limit = parseInt(attrs.limitTo);
          angular.element(elem).on("keypress", function(e) {
              if (elem.value.length == limit) e.preventDefault();
          });
      }
  }
}]);


myApp.controller('myController', ['$scope', function($scope) {

  const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }

  window.addEventListener('resize', appHeight);
  appHeight();


  angular.extend($scope, {

    continentList: [
      {
        name: 'Africa',
        link: 'https://restcountries.com/v3.1/region/africa'
      },
      {
          name: 'America',
          link: 'https://restcountries.com/v3.1/region/america'
      },
      {
          name: 'Asia',
          link: 'https://restcountries.com/v3.1/region/asia'
      },
      {
          name: 'Europe',
          link: 'https://restcountries.com/v3.1/region/europe'
      
      },
      {
          name: 'Oceania',
          link: 'https://restcountries.com/v3.1/region/oceania'
      }
    ],
    
    lightMode: false,

    ngInit: () => {
      fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => {$scope.countries = data; console.log($scope.countries); $scope.$applyAsync();});

      filterIsOpen: false;
    },

    requestData: (index: number): void => {
      fetch($scope.continentList[index].link)
      .then(res => res.json())
      .then(data => {$scope.countries = data; console.log($scope.countries); $scope.$applyAsync();});

      $scope.filterIsOpen = false;
    },

    detailCountry: false,
    openDetail: (item: any) => {
      $scope.viewCountry = item;
      $scope.detailCountry = true;
      $scope.viewCountry.nativeLang = Object.entries(item.name.nativeName)[0][1];

      $scope.viewCountry.customLanguages = Object.values(item.languages);
      $scope.viewCountry.customLanguages.forEach((element: string, index: number)  => {
       index > 0 ? $scope.viewCountry.customLanguages[index] =  ',  ' + element : element;
      });
      $scope.viewCountry.customCurrencies = Object.entries(item.currencies);
      console.log($scope.viewCountry.nativeLang, 111);
      $scope.$applyAsync();
    }

  });
}]);

