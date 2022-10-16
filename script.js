(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let apm = h > 12 ? 'PM' : 'AM';

            if (h > 12) {
                h = Math.floor(h/2);
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }


            c.innerHTML = h + ":" + m + ":" + s + apm;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();

        checkValidForm();

        let tarneHind = 0;
        
        let linnJaHind = {"tln": 0.00, "trt": 2.50, "prn": 3.00, "nrv": 2.50};

        let linn = document.getElementById("linn");
        
        let kontaktivaba = document.getElementById("v2");

        let kingitus = document.getElementById("v1");

        if (kontaktivaba.checked) {
            tarneHind += 1;
        }

        if (kingitus.checked) {
            tarneHind += 5;
        }

        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {
            tarneHind += linnJaHind[linn.value]
            e.innerHTML = tarneHind + " &euro;";

        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
    let checkValidForm = () => {
        
        let fnameForm = document.getElementById('fname');
        if (fnameForm.value == undefined || fnameForm.value == '') {
            alert("Sisestage enda eesnimi");
            fnameForm.focus();
            return;
        }

        let lnameForm = document.getElementById('lname');
        if (lnameForm.value == undefined || lnameForm.value == '') {
            alert("Sisestage enda perenimi");
            lnameForm.focus();
            return;
        }
        //https://stackoverflow.com/questions/5778020/check-whether-an-input-string-contains-a-number-in-javascript
        if (/\d/.test(fnameForm.value) || /\d/.test(lnameForm.value) ) {
            alert('Nime lahtris ei tohi olla numbreid');
            return;
        }
        if (document.getElementById('radio1').checked = false || document.getElementById('radio2').checked == false) {
            alert("Äkki soovite liituda meie hea uudiskirjaga?");
            return;
        }
    }
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
        58.30000,
        26.80000
    );
    let utPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let otherPoint = new Microsoft.Maps.Location(
        58.25000,
        26.82500
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(utPoint, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });

    var infobox = new Microsoft.Maps.Infobox(utPoint, {
            visible: false,
            title: 'Hea koht',
            description: 'UT'
        });    

    infobox.setMap(map);
        
    let otherpin = new Microsoft.Maps.Pushpin(otherPoint, {
        title: 'V6sa',
        //text: 'ei saa aru kas on öö või päev'
    })
    
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(otherpin, 'click', pushpinClicked);


     function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }

    map.entities.push(pushpin);
    map.entities.push(otherpin);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

