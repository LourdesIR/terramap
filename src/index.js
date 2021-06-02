window.addEventListener('load', ()=>{
    
    const map = L.map('mapid').setView([-34.921, -57.953], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibG91cmRlc2lyIiwiYSI6ImNrcGVwcHowdjAwMmMycG42bWQ4cncyMnQifQ.6jBpJ3R3vsAw-_T1zfeaIw'
    }).addTo(map);


    const submit = document.getElementById('submit');
   
    let name = document.getElementById('name');
    let dir = document.getElementById('dir');
    let phone = document.getElementById('phone');
    let lat = document.getElementById('lat');
    let long = document.getElementById('long');
    let select = document.getElementById('category');
    
    let datosPunto = [];
    let puntosDeInteres = [];

    submit.addEventListener('click', ()=>{
        
        name = name.value;
        dir = dir.value;
        phone = phone.value;
        lat = lat.value;
        long = long.value;
        select = select.value;

      
        datosPunto.push({name,dir,phone,lat,long,select})
        console.log(datosPunto); 

        puntosDeInteres.unshift(datosPunto);
        console.log(puntosDeInteres); 

        datosPunto = [];

         //Marcacion
            let marker= L.marker([lat, long]).addTo(map);
          //popup
            marker.bindPopup(`<b>Descripcion: </b>${name}<br><b>Direccion: </b>${dir}<br><b>Teléfono: </b>${phone}<br><b>(Lat , Long): </b>${lat}, ${lat}<br> <b>Categoria: </b>${select}`).openPopup();
    
        
    })
    
   
})
