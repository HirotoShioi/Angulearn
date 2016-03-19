(function(){
  var app =  angular.module('store',['ngResource']);

  //カード情報を取得するための関数を設定
  app.factory('Cards', ['$resource', function($resource) {
  return $resource('https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/:id', null,
      {
          'get': {
            method:'GET',
            isArray:true,
            headers:{'X-Mashape-Key':'9u6Neyza42mshUkO8rZDYYOuj4HMp1MhUG2jsnIL8dKBxvelm2'}
           }
      });
  }]);

//各所の出力についてのロジック
  app.controller('StoreController',['Cards',function(Cards){
    this.cards = [];
    this.cards.push(Cards.get({id:'leeroy'}));
    this.cards.push(Cards.get({id:'sylvanas'}));
    this.cards.push(Cards.get({id:'sludge%20belcher'}));
  }]);
//Tab
  app.controller('TabController',function(){
    this.tab = 1;
    this.isSet = function(checkTab){
      return this.tab === checkTab;
    };
    console.log(this.isSet(3));

    this.setTab = function(setTab){
      this.tab = setTab;
    }
  });
//レビュー
  app.controller('ReviewController',function(){
    this.reviews = [];
    this.review = {};

    this.addReview = function(){
      this.reviews.push(this.review);
      this.review ={};
    };
  });
  //グラフ
  app.controller('StatController',function(){

        var leeroy = ["leeroy"];
        var sylvanas = ["sylvanas"];
        var belcher = ["belcher"];
        var date = ['x'];
        for(j = 0; j<10;j++){
          var day = (new Date().getDate())+j;
          var leeroyrate = Math.floor(Math.random()*20)+40;
          var sylvanasrate = Math.floor(Math.random()*20)+40;
          var belchers = Math.floor(Math.random()*20)+40;
          date.push(day);
          leeroy.push(leeroyrate);
          sylvanas.push(sylvanasrate);
          belcher.push(belchers);
        }
        console.log(date);
        this.chart = c3.generate({
        bindto: '.chart',
        data: {
          x:'x',
          columns:[date,leeroy,sylvanas,belcher],
          type:'bar',
        },
        axis:{
          y:{
            max:80,
            min:30
          }
        }
        });
  });

})()
