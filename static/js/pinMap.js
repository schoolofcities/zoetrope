let map;
let marker;
let geocoder;
let geocode_result;
let responseDiv;
let response;

async function initMap() {
  // import Google Maps "maps" and "streetView" libraries
  const { Map } = await google.maps.importLibrary("maps");
  const { StreetViewCoverageLayer } = await google.maps.importLibrary("streetView")

  // set latitude and longitude of map centre
  var centerLat = 43.683976, centerLng = -79.364945;

  // define map attributes
  map = new Map(document.getElementById("map"), {
    zoom: 10, 
    center: { lat: centerLat, lng: centerLng },
    mapTypeId: google.maps.MapTypeId.HYBRID,
    gestureHandling: "greedy",
    fullscreenControl: false,
  });

  // display streetview layer on map
  var streetViewLayer = new google.maps.StreetViewCoverageLayer();
  streetViewLayer.setMap(map);

  // if API fails
  document.getElementById("api_failure").innerHTML = "";


  //
  // from google maps documentation:

  // create geocoder
  geocoder = new google.maps.Geocoder();

  // 
  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.placeholder = "Enter a location";

  const submitButton = document.createElement("input");
  submitButton.type = "button";
  submitButton.value = "Geocode";
  submitButton.classList.add("button", "button-primary");

  const clearButton = document.createElement("input");
  clearButton.type = "button";
  clearButton.value = "Clear";
  clearButton.classList.add("button", "button-secondary");

  // build response structure
  response = document.createElement("pre");
  response.id = "response";
  response.innerText = "";
  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);

  // define where map controls and response are displayed
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(clearButton);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(submitButton);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(inputText);
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(responseDiv);

  // create marker
  marker = new google.maps.Marker({
    map,
  });

  // create event listeners for buttons and clicking the map
  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
    console.log("after geocode: " + geocode_result);
    document.getElementById("select-location").value = geocode_result;
    console.log("input value: " + document.getElementById("select-location").value);
  });
  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value }),
  );
  clearButton.addEventListener("click", () => {
    clear();
  });

  // clear the map
  clear();
}

// function to clear the map
function clear() {
  marker.setMap(null);
  responseDiv.style.display = "none";
}

// function for geocoding and getting results
function geocode(request) {
  // clear first
  clear();

  // geocode
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      // map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      responseDiv.style.display = "block";

      const first_result_obj = results[0];
      const address = first_result_obj.formatted_address
      const coord = first_result_obj.geometry.location.toJSON()
      const lat = coord.lat
      const lng = coord.lng
      let result_list = [address, lat, lng]
      console.log("result_list: " + result_list);
      geocode_result = result_list;
      console.log("geocode_result in func: " + geocode_result);

      // set innerText to string of results
      response.innerText = "\n" + address + "\n" + lat + ", " + lng;
      
      // console.log(result_list);
      return result_list;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });

    console.log("geocode_result in func 2: " + geocode_result);
}
  
initMap();