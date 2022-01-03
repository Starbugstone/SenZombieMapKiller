function errorMessage(errormessage){
    alert(errormessage)
    throw errormessage;
}

function exportText(){
    let userInput = document.getElementById("myText").value;
			
    let blob = new Blob([userInput], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "dynamic.txt");
}

function disableInputs($group1, $group2){
    let empty=true;
    $group1.forEach(element1 => {
        if(element1.value !== ''){
            disableGroup($group2);
            enableGroup($group1);
            empty=false;
        }
    });

    $group2.forEach(element2 => {
        if(element2.value !== ''){
            disableGroup($group1);
            enableGroup($group2);
            empty=false;
        }
    });

    if(empty){
        enableGroup($group1);
        enableGroup($group2);
    }

}

function disableGroup($group){
    $group.forEach(element => {
        element.disabled=true
    });
}

function enableGroup($group){
    $group.forEach(element => {
        element.disabled=false
    });
}

function checkIfInputsValid($group){
    $group.forEach(element => {
        if(element.value === ''){
            errorMessage("Error in coords input");
        }
    });
}

function generateLatLon(group){
    coords=[];
    group.forEach(element => {
        let val=parseInt(element.value.trim());
        if(Number.isInteger(val) == false){
            errorMessage("Text in number element");
        }
        coords.push(val);
    });
    return coords;
}

function generateLat_Lon(group){
    coords=[];
    group.forEach(element => {
        let lat_lonTemp = element.value.trim().split("_")
        let val0 = parseInt(lat_lonTemp[0]);
        let val1 = parseInt(lat_lonTemp[1]);

        if(Number.isInteger(val0) === false){
            errorMessage("Text in number element or bad formatted input");
        }
        if(Number.isInteger(val1) === false){
            errorMessage("Text in number element or bad formatted input");
        }
        coords.push(val0);
        coords.push(val1);
    });
    return coords;
}

function generateMapCoords(lat1, lon1, lat2, lon2){
    lat1 = parseInt(lat1);
    lat2 = parseInt(lat2);
    lon1 = parseInt(lon1);
    lon2 = parseInt(lon2);
    let actualLat = lat1;
    let actualLon = lon1;
    let result = [];

    if(lat1 >= lat2 || lon1 >= lon2){
        errorMessage("Error in lat and lon coords, not a square");
    }

    while(actualLat <= lat2){
        while(actualLon <= lon2){
            result.push('map_'+ actualLat + '_' + actualLon);
            actualLon++
            
        }
        actualLon = lon1;

        actualLat++
    }
    return result;
}

function displayMapCoords(coords, id){
    textarea = document.getElementById(id);
    textarea.innerHTML = '';
    //TODO error handel
    coords.forEach(element => {
        textarea.innerHTML += element +'&#13;&#10;';
    });
}

function downloadMapCoords(id){	
    textarea = document.getElementById(id);
    let coords = textarea.innerHTML
    let blob = new Blob([coords], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "map.txt");
}


function generateMapCoordsAndDisplay(lat1, lon1, lat2, lon2, id){
    let coords = generateMapCoords(lat1, lon1, lat2, lon2);
    displayMapCoords(coords, id);
}

function generateMapCoordsAndDownload(lat1, lon1, lat2, lon2, id){
    let coords = generateMapCoords(lat1, lon1, lat2, lon2);
    generateMapCoordsAndDisplay(lat1, lon1, lat2, lon2, id)
    downloadMapCoords(id);
}