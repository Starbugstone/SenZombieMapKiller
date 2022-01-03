const $latlon=document.getElementById("latlon").querySelectorAll("input");
const $lat_lon=document.getElementById("lat_lon").querySelectorAll("input");
const $globalinputs=document.getElementById("input_coords").querySelectorAll("input");

$globalinputs.forEach($input => {
    $input.addEventListener("change", (event) => {disableInputs($latlon, $lat_lon)});
});

document.getElementById("generate").addEventListener("click", (event) => {
    let latlon=false;
    let lat_lon=false;
    let coords=[];

    if($latlon[0].value !== ''){
        checkIfInputsValid($latlon)
        latlon=true;
    }else{
        checkIfInputsValid($lat_lon)
        lat_lon=true;
    }

    if(latlon){
        coords = generateLatLon($latlon);
    }else if(lat_lon){
        coords = generateLat_Lon($lat_lon);
    }else{
        errorMessage("prog error, get back to me as we should not be here");
    }

    if(coords.length !== 4){
        errorMessage("error in coords input, should be 4")
    }

    generateMapCoordsAndDisplay(coords[0], coords[1], coords[2], coords[3], "resultText");

});

document.getElementById("download").addEventListener("click", (event) => {
    let latlon=false;
    let lat_lon=false;
    let coords=[];

    if($latlon[0].value !== ''){
        checkIfInputsValid($latlon)
        latlon=true;
    }else{
        checkIfInputsValid($lat_lon)
        lat_lon=true;
    }

    if(latlon){
        coords = generateLatLon($latlon);
    }else if(lat_lon){
        coords = generateLat_Lon($lat_lon);
    }else{
        errorMessage("prog error, get back to me as we should not be here");
    }

    if(coords.length !== 4){
        errorMessage("error in coords input, should be 4")
    }

    generateMapCoordsAndDownload(coords[0], coords[1], coords[2], coords[3], "resultText");

});