var xhhtp = new XMLHttpRequest();
var url;

geocodificadorModulo = (function () {
  var geocodificador // Geocodificador que dada una dirección devuelve una coordenada
  
    // Permite obtener las coordenadas y las usa con la función llamada por parámtero
  function usaDireccion (direccion, funcionALlamar) {
        /* Completar la función usaDireccion(dirección,funcionALlamar)
     para que se obtengan las coordenadas a partir de la dirección pasada por parámetro
     y que llame a la función pasada por parámetro con los siguientes parámetros
     dirección: la dirección pasada por parámetro
     coordenada: la ubicación de tipo google.maps.LatLng */

     console.log("Direccion: " + direccion);

     geocodificador.geocode({'address': direccion}, function(results, status) {
       console.log('status: ' + status);
       console.log('results: ' + results[0].geometry.location);
       console.log('location: ' + results[0].geometry.location[0]);

      if (status === 'OK') {
        funcionALlamar(direccion, getLatLng(results[0].geometry.location));
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  function getLatLng(location) {
    return new google.maps.LatLng({});
  }

    // Inicializo el geocoder que obtiene las corrdenadas a partir de una dirección
    // La variable dirección es igual al texto ingresado por el usuario
    // Llama a la función usaDirecciin para agregarla a los listados y mostrarlo en el mapa
  function inicializar () {
    var that = this
    geocodificador = new google.maps.Geocoder()

        // cuando se presiona la tecla enter en el campo direccion, se agrega la dirección y se muestra en el mapa
    document.querySelector('#direccion').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode
      if (key === 13) { // 13 is enter
                // code for enter
        var direccion = document.getElementById('direccion').value
        that.usaDireccion(direccion, direccionesModulo.agregarDireccionYMostrarEnMapa)
      }
    })
  }

  return {
    usaDireccion,
    inicializar
  }
})()

var getUrl = function() {
  return 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway+Mountain+View';
}

var apiConnect = function(xhhtp, url) {
  xhhtp.open('GET', url, true);
  xhhtp.send();
}

xhhtp.onreadystatechange = function() {
  console.log(this.readyState + " - " + this.status);
}
