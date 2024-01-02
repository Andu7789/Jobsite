const keywordsInputID = document.getElementById("keywordsInput");
const locationInputID = document.getElementById("locationInput");

const autocompleteResults = document.getElementById("autocomplete-results");

let apikey = ""
let appid = ""

async function getApiDetails() {
  try {
    const response = await fetch('/api/details');
    const data = await response.json();

    // Use the API details in your client-side code
     apiKey = data.apiKey;
     appId = data.appId;

  } catch (error) {
    console.error('Error fetching API details:', error);
  }
}

// Call the function to get API details
getApiDetails();

let locationCountArray = [];
let jobsTitlesArray = [];
let jobsTitlesArrayLocalStorage = [];
let countForJobsBySector = 1;

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
  "Swimming Teacher",
];

jobsTitlesArray = [
  "Accounting & Finance Jobs",
  "Legal Jobs",
  "PR, Advertising & Marketing Jobs",
  "Trade & Construction Jobs",
  "Customer Services Jobs",
  "Domestic help & Cleaning Jobs",
  "Hospitality & Catering Jobs",
  "HR & Recruitment Jobs",
  "Logistics & Warehouse Jobs",
  "Retail Jobs",
  "Teaching Jobs",
  "Travel Jobs",
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
    .map((suggestion) => `<div class="text-white">${suggestion}</div>`)
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

async function searchForResultsHomePage() {
  var keywordsInput = document.getElementById("keywordsInput");
  var locationInput = document.getElementById("locationInput");

  // Check if both inputs have values
  if (keywordsInput.value.trim() === "" || locationInput.value.trim() === "") {
    alert("Please fill in both Keywords and Location fields.");
    return; // Do not proceed with the search
  }

  const keywordsValue = keywordsInputID.value;
  const locationValueFull = locationInputID.value;

  const locationValue = locationValueFull.replace(/,\s*UK$/, ""); // Remove ", UK" at the end of the string

  console.log({ keywordsValue }, { locationValue });
  localStorage.setItem("keywordsValue", keywordsValue);
  localStorage.setItem("locationValue", locationValue);
  localStorage.setItem("btnclicked", "search");
  window.location.href = "Jobs.html";
}

window.onload = async () => {
  console.log("test");

  localStorage.setItem("sectorList",JSON.stringify(jobsTitlesArrayLocalStorage)
  );
  localStorage.setItem("jobsTitlesArray", JSON.stringify(jobsTitlesArray)
  );

  localStorage.removeItem("buttonIdLocation");
  let loc1 = "Eastern England";
  const easternEnglandHomeID = document.getElementById("easternEnglandHome");
  buildLocationData(loc1, easternEnglandHomeID);

  let loc2 = "Wales";
  const walesHomeID = document.getElementById("walesHome");
  buildLocationData(loc2, walesHomeID);

  let loc3 = "East Midlands";
  const eastMidlandsHomeID = document.getElementById("eastMidlandsHome");
  buildLocationData(loc3, eastMidlandsHomeID);

  let loc4 = "West Midlands";
  const westMidlandsHomeID = document.getElementById("westMidlandsHome");
  buildLocationData(loc4, westMidlandsHomeID);

  localStorage.removeItem("sectorList");
  localStorage.removeItem("btnclicked");

  jobsTitlesArray.forEach((job) => {
    getJobsNumbers(job);
  });

  async function buildLocationData(location, elementID) {
    const requestData = {
      location: location,
    };

    fetch("/api/fetchJobsByLocationAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.count === 0) {
          console.log("No data returned");
        } else {
          data.forEach((item) => {
            const area = item.location.area[3];
            const existingLocation = locationCountArray.find(
              (obj) => obj.area === area
            );

            if (existingLocation) {
              // If the area already exists in the array, increment the count
              existingLocation.count += 1;
            } else {
              // If the area does not exist, create a new entry with count 1
              locationCountArray.push({ area, count: 1 });
            }
          });
          locationCountArray.sort((a, b) => {
            // Compare the 'count' property of each object
            return b.count - a.count;
          });
          buildJobsArea1(locationCountArray, elementID);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
};

const buildJobsArea1 = (values, elementID) => {
  // Create a DocumentFragment
  const fragment = document.createDocumentFragment();

  values.slice(0, 8).forEach((item) => {
    // Create a container div to hold both area and count

    if (item.area !== undefined) {
      const containerDiv = document.createElement("div");

      // Create a div for area
      const areaDiv = document.createElement("h6");
      areaDiv.textContent = `${item.area} (${item.count})`;
      areaDiv.classList.add("areaLink");
      containerDiv.appendChild(areaDiv);

      // Add a click event listener to the container div

      containerDiv.addEventListener("click", () => {
        // Handle the click event here
        goToJobsLocation(item.area);
        console.log(`Clicked on ${item.area} - Count: ${item.count}`);
      });

      // Append the container div to the fragment
      fragment.appendChild(containerDiv);
    }
  });

  // Append the entire fragment to the southEastHomeID element
  elementID.appendChild(fragment);
  locationCountArray = [];
};

const getJobsNumbers = (jobTitles) => {
  const requestData = {
    category: jobTitles,
  };

  fetch("/api/fetchJobNumberAPI", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      const temp = document.getElementById(`job${countForJobsBySector}`);
      const text = temp.innerHTML + ` (${data})`;
      temp.innerHTML = text;
      temp.classList.add("areaLink");
      jobsTitlesArrayLocalStorage.push(temp.innerHTML);
      localStorage.setItem(
        "sectorList",
        JSON.stringify(jobsTitlesArrayLocalStorage)
      );

      temp.addEventListener("click", () => {
        console.log(`Clicked on ${text}, ${jobTitles}`);
        goToJobs(jobTitles);
      });
      countForJobsBySector++;

      if (data.count === 0) {
        console.log("No data returned");
      } else {
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const goToJobs = (buttonId) => {
  localStorage.setItem("buttonId", buttonId);
  window.location.href = "Jobs.html";
};

const goToJobsLocation = (buttonId) => {
  localStorage.setItem("buttonIdLocation", buttonId);
  window.location.href = "Jobs.html";
};

const jobsPage = () => {
  localStorage.removeItem("buttonId");
  localStorage.setItem("btnclicked", "jobsButton");
  window.location.href = "Jobs.html";
};
