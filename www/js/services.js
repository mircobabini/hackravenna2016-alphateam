angular.module('starter.services', [])

.factory('Monuments', function( $http ) {

  // Some fake testing data
  var monuments = [];

  return {
    all: function(){
      return monuments;
    },
    promise: function() {
      var promise = $http.get('lib/opendata/monumenti.json')
      return promise.success(function(response){
          var collected = [];
          var uncollected = [];

          var schede = response.Schede.Scheda;
          for( var index in schede ){
            if( schede[index]._Id.substr( 0, 2 ) != 'it' ) continue;

            switch( schede[index]._Id ){
              case 'it25705':
              case 'it25808':
              case 'it25810':
              case 'it25812':
              case 'it26941':
              case 'it27324':
              case 'it27325':
                break;

              default:
                continue;
            }

            console.log( schede[index] );
            var onoff = index%4 ? 'off' : 'on';
            var monument = {
              id: schede[index]._Id,
              name: schede[index].Titolo,
              lastText: decodeURIComponent(escape(schede[index].Descrizione)),
              face: 'img/icon-monuments/'+schede[index]._Id+'-'+onoff+'.png',
              url: schede[index].UrlScheda.__cdata,
            };

            if( onoff === 'on' ){
              collected.push( monument );
            }else{
              uncollected.push( monument );
            }
          }

          monuments = collected.concat( uncollected );
          console.log( monuments );
        });
    },
    remove: function(chat) {
      monuments.splice(monuments.indexOf(chat), 1);
    },
    get: function(monument_id) {
      for (var i = 0; i < monuments.length; i++) {
        if (monuments[i].id === monument_id) {
          return monuments[i];
        }
      }
      return null;
    }
  };
})

.factory('Events', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var events = [{
    id: 0,
    name: '#HackRavenna',
    lastText: '08/10/2016',
    face: 'img/hr-icon-calendar-color.png'
  }, {
    id: 1,
    name: 'Silent Party @ Palazzo Rasponi',
    lastText: '08/10/2016',
    face: 'img/hr-icon-calendar-color.png'
  }, {
    id: 2,
    name: 'Notte d\'Oro',
    lastText: '08/10/2016',
    face: 'img/hr-icon-calendar-color.png'
  }];

  return {
    all: function() {
      return events;
    },
    remove: function(event) {
      events.splice(events.indexOf(event), 1);
    },
    get: function(event_id) {
      for (var i = 0; i < events.length; i++) {
        if (events[i].id === parseInt(event_id)) {
          return events[i];
        }
      }
      return null;
    }
  };
});
