const keywordsInputID = document.getElementById("keywordsInput");
const locationInputID = document.getElementById("locationInput");

const autocompleteResults = document.getElementById("autocomplete-results");
const jobsFoundID = document.getElementById("jobsFound");

const slider = document.getElementById("distance");

let contractType = ["permanent", "contract"];
let hoursType = ["Full Time", "Part Time"];
let hoursTypeArray = ["full_time", "part_time"];
let jobsData = [];
let sectorsArray = [];
let salaryArray = [];
let contractArray = [];
let hoursArray = [];
let counter = 0;
let counterHours = 0;
let fullJobsNamesArray = [];
let hoursConvertedName = [];

// Sample job types (you can replace this with your API call for job types)
const jobTypes = [
  "Software Engineer",
  "Web Developer",
  "Data Scientist",
  "UX/UI Designer",
  "Marketing Manager",
  "Project Manager",
  "Sales Representative",
  "Financial Analyst",
  "Human Resources Specialist",
  "Graphic Designer",
  "Customer Support Representative",
  "Content Writer",
  "Network Administrator",
  "System Administrator",
  "Product Manager",
  "Business Analyst",
  "Social Media Manager",
  "Electrical Engineer",
  "Mechanical Engineer",
  "Accountant",
  "Lawyer",
  "Teacher",
  "Nurse",
  "Doctor",
  "Chef",
  "Photographer",
  "Electrician",
  "Plumber",
  "Carpenter",
  "Fitness Instructor",
  "Data Analyst",
  "UI/UX Developer",
  "Customer Success Manager",
  "Operations Coordinator",
  "IT Support Specialist",
  "Quality Assurance Tester",
  "Research Scientist",
  "Business Development Manager",
  "Financial Planner",
  "Front End Developer",
  "Back End Developer",
  "DevOps Engineer",
  "Technical Writer",
  "UX Researcher",
  "Sales Manager",
  "Healthcare Administrator",
  "Pharmacist",
  "Dental Hygienist",
  "Biomedical Engineer",
  "Event Planner",
  "Digital Marketing Specialist",
  "SEO Specialist",
  "Network Engineer",
  "Cybersecurity Analyst",
  "Laboratory Technician",
  "Architect",
  "Interior Designer",
  "Logistics Coordinator",
  "Executive Assistant",
  "Mechanical Designer",
  "Chemical Engineer",
  "Customer Service Representative",
  "Data Entry Clerk",
  "Insurance Agent",
  "Legal Assistant",
  "Market Research Analyst",
  "Office Manager",
  "Paralegal",
  "Real Estate Agent",
  "Social Worker",
  "Software Developer",
  "Technical Support Specialist",
  "Veterinarian",
  "Warehouse Manager",
  "Yoga Instructor",
  "Zoologist",
  "Biotechnology Researcher",
  "Digital Content Producer",
  "Environmental Scientist",
  "Fitness Trainer",
  "Genetic Counselor",
  "Health and Safety Officer",
  "IT Security Consultant",
  "Landscape Architect",
  "Marketing Analyst",
  "Occupational Therapist",
  "Physical Therapist",
  "Quality Control Inspector",
  "Robotics Engineer",
  "Social Media Coordinator",
  "Telecommunications Specialist",
  "Urban Planner",
  "Video Game Developer",
  "Wildlife Biologist",
  "Youth Counselor",
  "Zookeeper",
  "Cardiac Nurse",
  "Emergency Medical Technician (EMT)",
  "Gastroenterologist",
  "Hematologist",
  "Intensive Care Unit (ICU) Nurse",
  "Medical Illustrator",
  "Neonatal Nurse",
  "Occupational Health and Safety Specialist",
  "Pediatrician",
  "Radiation Therapist",
  "Speech-Language Pathologist",
  "Surgical Technologist",
  "Urologist",
  "Veterinary Nurse",
  "Wound Care Nurse",
  "X-ray Technician",
  "Yoga Therapist",
  "Zumba Instructor",
  "Clinical Research Coordinator",
  "Training",
  "Travel",
  "Tourism",
  "Retail",
  "Shop worker",
  "Transport",
  "Logistics",
  "Management",
  "Domestic",
  "Warehouse",
  "Distribution",
];

keywordsInputID.addEventListener("input", function () {
  const userInput = this.value.toLowerCase();
  const suggestions = jobTypes.filter((jobType) =>
    jobType.toLowerCase().includes(userInput)
  );

  displaySuggestions(suggestions);
});

function displaySuggestions(suggestions) {
  const maxSuggestions = 5; // Set the maximum number of suggestions to display
  const slicedSuggestions = suggestions.slice(0, maxSuggestions);

  const html = slicedSuggestions
    .map((suggestion) => `<div class="text-black">${suggestion}</div>`)
    .join("");
  autocompleteResults.innerHTML = html;

  autocompleteResults.querySelectorAll("div").forEach((div) => {
    div.addEventListener("click", function () {
      keywordsInputID.value = this.innerText;
      autocompleteResults.innerHTML = "";
    });
  });
}

// Close the autocomplete results if the user clicks outside
window.addEventListener("click", function (e) {
  if (!e.target.matches("#keywordsInputID")) {
    autocompleteResults.innerHTML = "";
  }
});

window.onload = async () => {
  try {
    let value = localStorage.getItem("buttonId");
  } catch (error) {
    console.error("Error retrieving value from localStorage:", error);
  }

  try {
    let sectorList = localStorage.getItem("sectorList");
    retrievedArray = JSON.parse(sectorList);
  } catch (error) {
    console.error("Error retrieving value from localStorage:", error);
  }

  try {
    let jobsTitlesArray = localStorage.getItem("jobsTitlesArray");
    jobsTitlesArray2 = JSON.parse(jobsTitlesArray);
  } catch (error) {
    console.error("Error retrieving value from localStorage:", error);
  }

  const sectorPanelID = document.getElementById("panelsStayOpen-collapseOne");

  retrievedArray.forEach((item) => {
    const containerDiv = document.createElement("div");
  
    // Create checkbox and name elements
    const checkbox = document.createElement("input");
    checkbox.classList.add("form-check-input");
    checkbox.classList.add("me-3");
    checkbox.type = "checkbox";
  
    const sectorDiv = document.createElement("span"); // Use <span> for name
  
    // Decode HTML entities and set text content
    const tempElement = document.createElement("div");
    tempElement.innerHTML = item;
    sectorDiv.textContent = tempElement.textContent || tempElement.innerText;
  
    sectorDiv.classList.add("areaLink");
  
    containerDiv.appendChild(checkbox);
    containerDiv.appendChild(sectorDiv);
  
    sectorDiv.id = `${jobsTitlesArray2[counter]}`;
    counter++;
  
    // Add click event listener to the name element
    sectorDiv.addEventListener("click", () => {
      checkbox.checked = !checkbox.checked; // Toggle checkbox state
      checkbox.dispatchEvent(new Event("change")); // Trigger the change event
    });
  
    // Keep the change event listener for direct checkbox interaction
    checkbox.addEventListener("change", (event) => {
      const isChecked = event.target.checked;
      if (isChecked) {
        const elementId = sectorDiv.id;
        console.log(`Checkbox for ${item} is checked and id is ${elementId}`);
        sectorsArray.push(item);
        fullJobsNamesArray.push(elementId);
      } else {
        console.log(`Checkbox for ${item} is unchecked`);
        const index = sectorsArray.indexOf(item);
        if (index !== -1) {
          sectorsArray.splice(index, 1);
          fullJobsNamesArray.splice(index, 1);
        }
      }
      console.log(sectorsArray);
      console.log(fullJobsNamesArray);
    });
  
    // Add the container div to the accordion body
    sectorPanelID.querySelector(".accordion-body").appendChild(containerDiv);
  });
  

  fetch("/api/getSalaryRangesAPI")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((salary) => {
      const sectorPanel2ID = document.getElementById("panelsStayOpen-collapseTwo");
      const containerDiv = document.createElement("div");

      // Create checkbox and name elements
      const checkbox = document.createElement("input");
      checkbox.classList.add("form-check-input");
      checkbox.classList.add("me-3");
      checkbox.type = "checkbox";

      const salaryDiv = document.createElement("span"); // Use <span> for name

      // Decode HTML entities and set text content
      const tempElement = document.createElement("div");
      tempElement.innerHTML = salary[0];
      salaryDiv.textContent = tempElement.textContent || tempElement.innerText;

      salaryDiv.classList.add("areaLink");

      containerDiv.appendChild(checkbox);
      containerDiv.appendChild(salaryDiv);

      // Add click event listener to the name element
      salaryDiv.addEventListener("click", () => {
        checkbox.checked = !checkbox.checked; // Toggle checkbox state
        checkbox.dispatchEvent(new Event("change")); // Trigger the change event
      });

      // Keep the change event listener for direct checkbox interaction
      checkbox.addEventListener("change", (event) => {
        const isChecked = event.target.checked;
        if (isChecked) {
          console.log(`Checkbox for ${salary[0]} is checked`);
          salaryArray.push(salary[0]);
        } else {
          console.log(`Checkbox for ${salary[0]} is unchecked`);
          const index = salaryArray.indexOf(salary[0]);
          if (index !== -1) {
            salaryArray.splice(index, 1);
          }
        }
        console.log(salaryArray);
      });

      sectorPanel2ID.querySelector(".accordion-body").appendChild(containerDiv);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });


  fetch("/api/getTotalNUmberOFJobsAPI")
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => {
      console.error("Error:", error);
    });

    contractType.forEach((contract) => {
      const sectorPanel3ID = document.getElementById("panelsStayOpen-collapseThree");
      const containerDiv = document.createElement("div");
    
      // Create checkbox and name elements
      const checkbox = document.createElement("input");
      checkbox.classList.add("form-check-input");
      checkbox.classList.add("me-3");
      checkbox.type = "checkbox";
    
      const contractDiv = document.createElement("span"); // Use <span> for name
    
      // Decode HTML entities and set text content
      const tempElement = document.createElement("div");
      tempElement.innerHTML = contract;
      contractDiv.textContent = tempElement.textContent || tempElement.innerText;
    
      contractDiv.classList.add("areaLink");
    
      containerDiv.appendChild(checkbox);
      containerDiv.appendChild(contractDiv);
    
      // Add click event listener to the name element
      contractDiv.addEventListener("click", () => {
        checkbox.checked = !checkbox.checked; // Toggle checkbox state
        checkbox.dispatchEvent(new Event("change")); // Trigger the change event
      });
    
      // Keep the change event listener for direct checkbox interaction
      checkbox.addEventListener("change", (event) => {
        const isChecked = event.target.checked;
        if (isChecked) {
          console.log(`Checkbox for ${contract} is checked`);
          contractArray.push(contract);
        } else {
          console.log(`Checkbox for ${contract} is unchecked`);
          const index = contractArray.indexOf(contract);
          if (index !== -1) {
            contractArray.splice(index, 1);
          }
        }
        console.log(contractArray);
      });
    
      sectorPanel3ID.querySelector(".accordion-body").appendChild(containerDiv);
    });
    

  hoursType.forEach((hours) => {
    const sectorPanel4ID = document.getElementById("panelsStayOpen-collapseFour");
    const containerDiv = document.createElement("div");
  
    // Create checkbox and name elements
    const checkbox = document.createElement("input");
    checkbox.classList.add("form-check-input");
    checkbox.classList.add("me-3");
    checkbox.type = "checkbox";
  
    const contractDiv = document.createElement("span"); // Use <span> for name
  
    // Decode HTML entities and set text content
    const tempElement = document.createElement("div");
    tempElement.innerHTML = hours;
    contractDiv.textContent = tempElement.textContent || tempElement.innerText;
  
    contractDiv.classList.add("areaLink");
    contractDiv.id = `${hoursTypeArray[counterHours]}`;
  
    containerDiv.appendChild(checkbox);
    containerDiv.appendChild(contractDiv);
  
    counterHours++;
  
    // Add click event listener to the name element
    contractDiv.addEventListener("click", () => {
      checkbox.checked = !checkbox.checked; // Toggle checkbox state
      checkbox.dispatchEvent(new Event("change")); // Trigger the change event
    });
  
    // Keep the change event listener for direct checkbox interaction
    checkbox.addEventListener("change", (event) => {
      const isChecked = event.target.checked;
      if (isChecked) {
        const elementId = contractDiv.id;
        console.log(`Checkbox for ${hours} is checked and id is ${elementId}`);
        hoursArray.push(hours);
        hoursConvertedName.push(elementId);
      } else {
        console.log(`Checkbox for ${hours} is unchecked`);
        const index = hoursArray.indexOf(hours);
        if (index !== -1) {
          hoursArray.splice(index, 1);
          hoursConvertedName.splice(index, 1);
        }
      }
      console.log(hoursArray);
      console.log(hoursConvertedName);
    });
  
    sectorPanel4ID.querySelector(".accordion-body").appendChild(containerDiv);
  });
  

  let btnclicked = localStorage.getItem("btnclicked");
  let keywordsValue = localStorage.getItem("keywordsValue");
  let locationValue = localStorage.getItem("locationValue");

  const buildAllJobsCards = () => {
    fetch("/api/getAllJobsAPI")
      .then((response) => response.json())
      .then((data) => {
        jobsData = data;
        buildcards(jobsData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const buildAllJobsCardsSeacrhAPI = () => {
    const requestData = {
      title: keywordsValue,
      location: locationValue,
    };

    fetch("/api/fetchJobsByLocationAndKeywordsAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        jobsData = data;
        console.log(jobsData);
        buildcards(jobsData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const buildAllJobsCardsLocationAPI = () => {
    let location = localStorage.getItem("buttonIdLocation");

    const requestData = {
      location: location,
    };

    fetch("/api/fetchJobsByLocationAPI2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        jobsData = data;
        console.log(jobsData);
        buildcards(jobsData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const buildJobsCardsContract_TimeAPI = () => {
    let contract_time = localStorage.getItem("buttonId");

    const requestData = {
      contract_time: contract_time,
    };

    fetch("/api/fetchJobsCardsContract_TimeAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        jobsData = data;
        console.log(jobsData);
        buildcards(jobsData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const buildJobsCardsJobTypesAPI = () => {
    let category = localStorage.getItem("buttonId");

    const requestData = {
      category: category,
    };

    fetch("/api/fetchJobsCardsJobTypesAPI_TimeAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        jobsData = data;
        console.log(jobsData);
        buildcards(jobsData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  let buttonId = localStorage.getItem("buttonId");
  let buttonIdLocation = localStorage.getItem("buttonIdLocation");

  if (btnclicked === "jobsButton") {
    //if the user clicked the 'jobs' link in the navbar
    console.log(1);
    buildAllJobsCards();
  } else if (btnclicked === "search") {
    //if the user clicked the search button
    console.log(2);
    buildAllJobsCardsSeacrhAPI();
  } else if (buttonId === "full_time" || buttonId === "part_time") {
    //if the user clicked the search button
    console.log(3);
    buildJobsCardsContract_TimeAPI();
  } else if (
    !(buttonId === "full_time" || buttonId === "part_time") &&
    !buttonIdLocation && !(btnclicked === "detailsbutton") 
  ) {
    //if the user clicked the search button
    console.log(4);
    buildJobsCardsJobTypesAPI();
  } else if (buttonIdLocation) {
    console.log(5);
    buildAllJobsCardsLocationAPI();
  } else if (btnclicked === "detailsbutton") {

    jobSearchWithParamaters()
    console.log(6);
  }
};

const temp = (job) => {
  console.log(job);
};

const buildcards = (data) => {
  jobsFoundID.innerHTML = "Jobs Found - ";
  console.log("All jobs", data);

  const text = jobsFoundID.innerHTML + `${data.length}`;
  jobsFoundID.innerHTML = text;
  const jobsContainerID = document.getElementById("jobsContainer");
  jobsContainerID.innerHTML = "";

  if (data.length === 0) {
    const containerDiv = document.createElement("div");
    const ErrorElement = document.createElement("h4");
    ErrorElement.textContent = "No jobs match your search";
    ErrorElement.style.textAlign = "center";
    ErrorElement.style.margin = "100px 10px 10px 0";
    containerDiv.appendChild(ErrorElement);
    jobsContainerID.appendChild(containerDiv);
  }

  data.forEach((job) => {
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("card");
    containerDiv.classList.add("p-3");
    containerDiv.classList.add("my-3");
    containerDiv.classList.add("borderRed2");

    const titleElement = document.createElement("h5");
    titleElement.textContent = job.title;
    titleElement.classList.add("areaLink");

    titleElement.addEventListener("click", () => {
      goToJobsDetailsPage(job);
    });

    containerDiv.appendChild(titleElement);

    const locationElement = document.createElement("div");

    if (!job.location.area[3]) {
      locationElement.textContent = `${job.location.area[1]}, ${job.location.area[0]}`;
    } else {
      locationElement.textContent = `${job.location.area[3]}, ${job.location.area[2]}`;
    }

    containerDiv.appendChild(locationElement);

    const salaryElement = document.createElement("div");
    salaryElement.textContent = ` Up to £${job.salary_max} per year`;

    containerDiv.appendChild(salaryElement);

    const contractTimeElement = document.createElement("div");
    if (job.contract_time === "full_time") {
      contractTimeElement.textContent = "Full Time";
    }
    if (job.contract_time === "part_time") {
      contractTimeElement.textContent = "Part Time";
    }

    containerDiv.appendChild(contractTimeElement);

    const contractTypeElement = document.createElement("div");
    if (job.contract_type === "permanent") {
      contractTypeElement.textContent = "Permanent";
    }
    if (job.contract_type === "contract") {
      contractTypeElement.textContent = "Contract";
    }

    containerDiv.appendChild(contractTypeElement);

    const descElement = document.createElement("div");
    descElement.textContent = job.description;
    descElement.classList.add("mt-2");

    containerDiv.appendChild(descElement);

    const btnViewDetails = document.createElement("button");
    btnViewDetails.textContent = "View details";
    btnViewDetails.classList.add("mt-2");
    btnViewDetails.classList.add("btn");
    btnViewDetails.classList.add("btnRed");
    btnViewDetails.style.width = "160px";

    btnViewDetails.addEventListener("click", () => {
      goToJobsDetailsPage(job);
    });

    containerDiv.appendChild(btnViewDetails);

    const btnApply = document.createElement("button");
    btnApply.textContent = "Apply";
    btnApply.classList.add("mt-2");
    btnApply.classList.add("btn");
    btnApply.classList.add("btnRed");
    btnApply.style.width = "160px";

    btnApply.addEventListener("click", () => {
      goToJobsApplyPage(job.title);
    });

    containerDiv.appendChild(btnApply);

    // Create a div for the salary

    titleElement.onclick = (event) => {
      temp(event, `${job}`);
    };

    jobsContainerID.appendChild(containerDiv);
  });
};
//remove the '£' from the salaries and split the string into an array so you can use it on the server as part of the search
function extractValues(rangeStr) {
  const [start, end] = rangeStr.substring(1).split(" - £").map(Number);
  return [start, end];
}

let requestData

const jobSearchWithParamaters = () => {
  const keywordsInputIDValue = keywordsInputID.value;
  const locationInputIDFull = locationInputID.value;
  const locationInputIDValue = locationInputIDFull.replace(/,\s*UK$/, ""); // Remove ", UK" at the end of the string
  const result = salaryArray.map(extractValues);
  let btnclicked = localStorage.getItem("btnclicked");

  console.log({btnclicked});

  if (btnclicked === "detailsbutton"){
console.log("2nd");
     requestData = localStorage.getItem("requestData");
    requestData = JSON.parse(requestData);
  } else {
    console.log("1st");
     requestData = {
      category: fullJobsNamesArray,
      contract_type: contractArray,
      contract_time: hoursConvertedName,
      title: keywordsInputIDValue,
      location: locationInputIDValue,
      salary_max: result,
    };
  }



  localStorage.setItem("requestData", JSON.stringify(requestData))
 
  console.log({ requestData });
  fetch("/api/jobSearchWithParamatersAPI", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      jobsData = data;
      console.log(jobsData);
      buildcards(jobsData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const jobSearchReset = () => {

  keywordsInputID.value = "";
  locationInputID.value = "";
  fullJobsNamesArray = [];
  sectorsArray = [];
  salaryArray = [];
  contractArray = [];
  hoursArray = [];
  hoursConvertedName = [];
  localStorage.removeItem("btnclicked");
  //Clear all checkboxes
  document.querySelectorAll(".form-check-input").forEach((checkbox) => {
    checkbox.checked = false;
  });
};

const goToJobsDetailsPage = (jobDetails) => {
  localStorage.removeItem("jobDetails");
  localStorage.setItem("jobDetails", JSON.stringify(jobDetails))
  window.location.href = "JobDetails.html";
}

const goToJobsApplyPage = (title) => {
  localStorage.setItem("jobDescription", title);
  window.location.href = "Apply.html";

}


