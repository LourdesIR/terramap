## TerraMap

Se utilizo LEAFLETJS - https://leafletjs.com/ para el mapa y Bootstrap como libreria de apoyo en la maquetación.

** Falta validaciones de los input y acceso por Json **

### Formulario de creacion de puntos de interes

Form básico, con los requerimientos de la prueba.
Donde los valores son trabajados en index.js

```
 <form method="POST" action="src/form.js" class="col-12 col-md-6 col-lg-5" id="form">
                <div class="form-group">
                  <label for="name">Nombre</label>
                  <input type="text" class="form-control" id="name"  placeholder="AEROTERRA SA" value="" maxlength="20" required>
                  <p id="alertName"></p>
                </div>
                <div class="form-group">
                    <label for="dir">Dirección</label>
                    <input type="text" class="form-control" name="dir" id="dir" placeholder="Av. Eduardo Madero 1020, CABA" maxlength="40" value="" required>
                    <p id="alertDir"></p>
                  </div>
                  <div class="form-group">
                    <label for="phone">Teléfono</label>
                    <input type="number" class="form-control" id="phone" minlength="10" maxlength="13" placeholder="541152720900" value="" >
                  </div>

                <div class="form-group" >
                  <label for="category">Categoria</label>
                  <select class="form-control" name="category" id="category" >
                    <option value="comercial">Comercial</option>
                    <option value="residencial">Residencial</option>
                    <option value="mixta">Mixta</option>
                  </select>
                </div>
                <label class="m-auto">Coordenadas:</label><br>
                <div class="form-group row">
                    <div class="col-6">
                    <label for="lat">Latitud</label>
                    <input type="number" class="form-control" name="lat" id="lat" placeholder="-34.921" value="" min="-180" max="180" required>
                    <p id="alertLat"></p>
                  </div>
                    <div class="col-6">
                    <label for="long">Longitud</label>
                    <input type="number" class="form-control" name="long" id="long" placeholder="-57.953" value="" min="-90" max="90" required>
                    <p id="alertLong"></p>
                  </div>
                </div>
                <div class="divButton">
                  <button type="button" class="btn btn-success" value="submit" id="submit">Crear</button>
                </div>
                </form>

´´´

### Inclusion del mapa en index.html

```
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin=""/>

<div class="col-12 col-md-6 col-lg-7">
    <div id="mapid"></div>
</div>


<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>

´´´

### Trabajo sobre el mapa en Index.js

Creacion del mapa y punto focal, accessToken obtenida de mapbox

```
    let map = L.map('mapid').setView([-34.921, -57.953], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibG91cmRlc2lyIiwiYSI6ImNrcGVwcHowdjAwMmMycG42bWQ4cncyMnQifQ.6jBpJ3R3vsAw-_T1zfeaIw'
    }).addTo(map);

´´´

Variables del DOM

```
    //Boton
    const submit = document.getElementById('submit');

    //Variables Input
    let name = document.getElementById('name');
    let dir = document.getElementById('dir');
    let phone = document.getElementById('phone');
    let lat = document.getElementById('lat');
    let long = document.getElementById('long');
    let select = document.getElementById('category');
´´´

Creacion de los puntos de interes al escuchar el click y acumulacion de puntos.
**algunas validaciones antes de ingresar datos**

```
    let puntosDeInteres = [];

    submit.addEventListener('click', ()=>{

        let namev = name.value;
        let dirv = dir.value;
        let phonev = phone.value;
        let latv = lat.value;
        let longv = long.value;
        let selectv = select.value;

        //validacion de entradas
        let isValid=true;
        if(namev<=3){
            document.getElementById('alertName').innerHTML= "Ingresa un nombre mayor a 3 caracteres";
            isValid=false;
        }

        if(dirv<=5){
            document.getElementById('alertDir').innerHTML= "Ingresa una dirección mayor a 5 caracteres";
            isValid=false;
        }


        if(isValid){
             //Incluir nuevo punto en el array
        puntosDeInteres.unshift({namev,dirv,phonev,latv,longv,selectv})

´´´
Acumulacion de nuevos puntos.

```
        // //Todos los puntos en el mapa.
        puntosDeInteres.forEach(el => {

        //Marcacion.
        let marker= L.marker([el.latv, el.longv]).addTo(map);
        //popup con descripción
        marker.bindPopup(`<b>Descripcion: </b>${el.namev}<br><b>Direccion: </b>${el.dirv}<br><b>Teléfono: </b>${el.phonev}<br><b>(X, Y): </b>${el.latv}, ${el.longv}<br> <b>Categoria: </b>${el.selectv}`).openPopup();
        //Posicionar en la nueva ubicacion.
        map = L.map('mapid').setView([el.latv, el.longv], 13);
        })
        }

    })

    //variable guardada en base de datos local

    let puntosIniciales = JSON.parse(localStorage.getItem('puntosDeInteres'));
    if(!puntosIniciales){
        puntosDeInteres=[];
    }else{
        puntosDeInteres=puntosIniciales;
    }

})
´´´
