const locationJobDetailsID = document.getElementById("locationJobDetails");
const salaryJobDetailsID = document.getElementById("salaryJobDetails");
const sectorJobDetailsID = document.getElementById("sectorJobDetails");
const contractTypeJobDetailsID = document.getElementById(
  "contractTypeJobDetails"
);
const hoursJobDetailsID = document.getElementById("hoursJobDetails");
const jobsContainerID = document.getElementById("jobsContainer");

let jobDetails = localStorage.getItem("jobDetails");
retrievedJobDetails = JSON.parse(jobDetails);
console.log(retrievedJobDetails);

const text = locationJobDetailsID.innerHTML +
  `${retrievedJobDetails.location.area[3]}, ${retrievedJobDetails.location.area[2]}`;
locationJobDetailsID.innerText = text;

const salary =
  salaryJobDetailsID.innerHTML + `£${retrievedJobDetails.salary_max}`;
salaryJobDetailsID.innerText = salary;

const sector =
  sectorJobDetailsID.innerHTML + `${retrievedJobDetails.category.label}`;
sectorJobDetailsID.innerText = sector;

let type = contractTypeJobDetailsID.innerHTML;

if (retrievedJobDetails.contract_type === "permanent") {
  type = contractTypeJobDetailsID.innerHTML + `Permanent`;
}
if (retrievedJobDetails.contract_type === "contract") {
  type = contractTypeJobDetailsID.innerHTML + `Contract`;
}

contractTypeJobDetailsID.innerText = type;

let time = hoursJobDetailsID.innerHTML;

if (retrievedJobDetails.contract_time === "full_time") {
  time = hoursJobDetailsID.innerHTML + `Full Time`;
}
if (retrievedJobDetails.contract_time === "part_time") {
  time = hoursJobDetailsID.innerHTML + `Part Time`;
}

hoursJobDetailsID.innerText = time;

const containerDiv = document.createElement("div");
containerDiv.classList.add("card");
containerDiv.classList.add("p-3");
containerDiv.classList.add("my-3");
containerDiv.classList.add("borderRed2");

const descriptionElement = document.createElement("p");
descriptionElement.textContent = retrievedJobDetails.description;

const btnViewDetails = document.createElement("button");
    btnViewDetails.textContent = "Back to jobs";
    btnViewDetails.classList.add("mt-2");
    btnViewDetails.classList.add("btn");
    btnViewDetails.classList.add("btnRed");
    btnViewDetails.style.width = "160px";

    btnViewDetails.addEventListener("click", () => {
      goToJobs()
    });

    const btnApply = document.createElement("button");
    btnApply.textContent = "Apply";
    btnApply.classList.add("mt-2");
    btnApply.classList.add("btn");
    btnApply.classList.add("btnRed");
    btnApply.style.width = "160px";

    btnApply.addEventListener("click", () => {
      goToJobsApplyPage();
    });

  

    
containerDiv.appendChild(descriptionElement);

containerDiv.appendChild(btnViewDetails);

containerDiv.appendChild(btnApply);

jobsContainerID.appendChild(containerDiv);

// Initialize and add the map

let lat = retrievedJobDetails.latitude;
let lng = retrievedJobDetails.longitude;
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: lat, lng: lng };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 13,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: retrievedJobDetails.location.area[3],
  });

  //jobsContainerID.appendChild(map);
}


    initMap();

    const goToJobs = () => {
      localStorage.setItem("btnclicked", "detailsbutton");
      window.location.href = "Jobs.html";

    };

    const goToJobsApplyPage = () => {
      localStorage.setItem("jobDescription", retrievedJobDetails.title);
      window.location.href = "Apply.html";
    
    }

