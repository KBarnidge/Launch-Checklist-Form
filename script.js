function randomizeDestination() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json){
         let destination = json[Math.floor(Math.random() *json.length)];
         const div = document.getElementById("missionTarget");
            div.innerHTML = `
               <ol>
                  <li>Name: ${destination.name}</li>
                  <li>Diameter: ${destination.diameter}</li>
                  <li>Star: ${destination.star}</li>
                  <li>Distance from Earth: ${destination.distance}</li>
                  <li>Number of Moons: ${destination.moons}</li>
               </ol>
               <img src='${destination.image}'>
            `;
      
      });   
   });
}

function updateLaunchStatus() {
   let fuelLevelInput = document.querySelector("input[name=fuelLevel]").value;
   let cargoMassInput = document.querySelector("input[name=cargoMass]").value;

   let launchStatus = document.getElementById("launchStatus");
   let faultyItems = document.getElementById("faultyItems");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");

      if (fuelLevelInput > 10000 && cargoMassInput < 10000) {
         launchStatus.innerHTML = "Shuttle is ready to launch!";
         launchStatus.style.color = "green";
         faultyItems.style.visibility = "hidden";
      } else {
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         faultyItems.style.visibility = "visible";
         if (fuelLevelInput < 10000) {
            fuelStatus.innerHTML = "Not enough fuel";
         }     
            if (cargoMassInput > 10000) {
               cargoStatus.innerHTML = "Too much cargo weight";
            }
      }
}
function initialAlert(message) {
   alert(message);
   event.preventDefault();
}

function validateEntry () {
   let pilotNameInput = document.querySelector("input[name=pilotName]");
    let copilotNameInput = document.querySelector("input[name=copilotName]");
    let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
    let cargoMassInput = document.querySelector("input[name=cargoMass]");
   

        if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput === "") {
            initialAlert("All fields are required!");   
        
        } else if (isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value) || !(isNaN(pilotNameInput.value)) || !(isNaN(copilotNameInput.value)) ) {
            initialAlert("Invalid data type, please review all entries.");
         } else {
               let pilotStatus = document.getElementById("pilotStatus");
               let copilotStatus = document.getElementById("copilotStatus");  
               pilotStatus.innerHTML = (`Pilot ${pilotNameInput.value} ready`)
               copilotStatus.innerHTML = (`CoPilot ${copilotNameInput.value} ready`)
               updateLaunchStatus();
               
        }
}

window.addEventListener("load", function() {
   randomizeDestination();
let button = document.getElementById("formSubmit");
button.addEventListener("click", function (event) {
   validateEntry();
});
});
