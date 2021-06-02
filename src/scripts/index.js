window.addEventListener('load', ()=>{
    
    let map = L.map('mapid').setView([-34.921, -57.953], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibG91cmRlc2lyIiwiYSI6ImNrcGVwcHowdjAwMmMycG42bWQ4cncyMnQifQ.6jBpJ3R3vsAw-_T1zfeaIw'
    }).addTo(map);

    //Boton
    const submit = document.getElementById('submit');
   
    //Variables Input
    let name = document.getElementById('name');
    let dir = document.getElementById('dir');
    let phone = document.getElementById('phone');
    let lat = document.getElementById('lat');
    let long = document.getElementById('long');
    let select = document.getElementById('category');

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

    let puntosIniciales = JSON.parse(localStorage.getItem('puntosDeInteres'));
    if(!puntosIniciales){
        puntosDeInteres=[];
    }else{
        puntosDeInteres=puntosIniciales;
    }
    
})
