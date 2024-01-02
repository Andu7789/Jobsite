const express = require("express");
const path = require('path');
const app = express();
const fs = require("fs");
const Datastore = require("nedb");
const port = process.env.PORT || 3000;
require('dotenv').config()

app.listen(port, () => {
  console.log(`starting server at ${port}`);
});

app.use(express.static("public")); //listens for all files within the 'public' folder
app.use(express.json({ limit: "1mb" })); //need this for JSON to be allowed to be used
app.use('/Assets', express.static('Assets'));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Home.html'));
});

// Add a route for the new HTML page
app.get('/Jobs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Jobs.html'));
});

// Add a route for the new HTML page
app.get('/Job Alert', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Job Alert.html'));
});

// Add a route for the new HTML page
app.get('/Career', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Career.html'));
});

// Add a route for the new HTML page
app.get('/CV Upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'CV Upload.html'));
});

// make a new database called database.db if it doesnt already exist
const database1 = new Datastore("database1.db");
database1.loadDatabase();
db1 = database1;

app.post('/api/temp', (request, response) => { 
  const data = request.body
  let doc = []

  data.results.forEach(element => {
  doc.push(element)
  });

  console.log({doc});

  /*db1.remove({}, { multi: true }, function (err, newDocs) {
    if (err) {
      console.error('Error clearing the database:', err);
    } else {
      console.log('Doc - Database clearing completed:', newDocs);
    }
    
  });*/


  db1.insert(doc, function (err, newDocs) {
    if (err) {
      console.error('Error creating the database:', err);
    } else {
      console.log('Doc - Database creation completed:');
    }
  
  });


  response.json({
      doc,
  })
})

app.post('/api/fetchJobsByLocationAPI', (request, response) => {
  const requestData = request.body.location;
  //const tets = location.area[0]

  console.log("Received location to find:", requestData);

  // Assuming you want to match the region (Eastern England)
  //const regionToMatch = requestData.location.toLowerCase(); // Convert to lowercase for case-insensitive matching

  db1.find({ "location.area.1": requestData }, function (err, docs) {
    if (err) {
      console.error('fetchJobsByLocationAPI:', err);
      response.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log('fetchJobsByLocationAPI: Success');
      response.json(docs);
    }
  });
});

app.post('/api/fetchJobsByLocationAPI2', (request, response) => {
  const requestData = request.body.location;
  let position = requestData === "London" ? 1 : 3; //London is in a different part of the array to the other locations

  console.log("(fetchJobsByLocationAPI2) - Received location to find:", requestData);
  
  db1.find({ [`location.area.${position}`]: requestData }, function (err, docs) {

    if (err) {
      console.error('fetchJobsByLocationAPI:', err);
      response.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log('fetchJobsByLocationAPI2: Success');
      response.json(docs);
    }
  });
});

app.post('/api/fetchJobNumberAPI', (request, response) => {
  const requestData = request.body.category;
  //const tets = location.area[0]

  console.log("Received job title to find:", requestData);

  db1.find({ "category.label":requestData }, function (err, docs) {
    if (err) {
      console.error('fetchJobNumberAPI:', err);
      response.status(500).json({ error: "Internal Server Error" });
    } else {
      const matchingRecordsCount = docs.length;
      console.log('fetchJobNumberAPI: Success', matchingRecordsCount, 'match your search');

      response.json(matchingRecordsCount);
    }
  });
});


// Helper function to parse salary band ranges
const parseSalaryBand = (band) => {
  const match = band && band.flat().filter(val => typeof val === 'number');
  if (!match) {
    return 0; // Return a default value if there is no match or if band is undefined/null
  }

  return match[0];
};

app.get("/api/getSalaryRangesAPI", (req, res) => {
  db1.find({}, (err, items) => {
    if (err) {
      console.error('getSalaryRangesAPI:', err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Updated salary bands
    const salaryBand = [[10000], [15000], [25000], [35000], [45000], [55000], [65000], [75000], [85000], [95000], [105000], [115000]];

    // Function to count the occurrences in each salary band
    const countSalaryOccurrences = () => {
      const countArray = Array(salaryBand.length).fill(0);

      items.forEach((item) => {
        const salary = item.salary_max;

        for (let i = 0; i < salaryBand.length; i++) {
          const max = parseSalaryBand(salaryBand[i]);
          if (salary <= max) {
            countArray[i]++;
            break; // Once a match is found, move to the next item
          }
        }
      });

 // Output the results
 const result = salaryBand.reduce((acc, band, index) => {
  const nextBand = salaryBand[index + 1];
  const adjustedEnd = nextBand ? nextBand[0] - 1 : Infinity;

  const count = countArray[index];

  if (count > 0) {
    acc.push([
      `£${band[0]} - £${adjustedEnd}`,
      count,
    ]);
  }

  return acc;
}, []);

res.json(result);
    };

    // Call the function to count salary occurrences
    countSalaryOccurrences();
  });
});

app.get('/api/getTotalNUmberOFJobsAPI', (request, response) => {

  db1.find({}, (err, jobs) => {
    if (err) {
      console.error('getTotalNUmberOFJobsAPI:', err);
      response.status(500).json({ error: "Internal Server Error" });
    } else {
      const numofjobs = jobs.length;
      console.log('getTotalNUmberOFJobsAPI: Success - number of jobs -', numofjobs);

      response.json(numofjobs);
    }
  });
});

app.get('/api/getAllJobsAPI', (request, response) => {

  db1.find({}, (err, jobs) => {
    if (err) {
      console.error('getAllJobsAPI:', err);
      response.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log('getAllJobsAPI: Success');

      response.json(jobs);
    }
  });
});



app.post('/api/fetchJobsByLocationAndKeywordsAPI', (request, response) => {

  const location = request.body.location;
  const keyWords = request.body.title;

  let position = location === "London" ? 1 : 3; // London is in a different part of the array to the other locations

  console.log("(fetchJobsByLocationAndKeywordsAPI) - Received location to find:", location);

  db1.find({
    $and: [
      { [`location.area.${position}`]: location },
      { title: { $regex: new RegExp(keyWords, 'i') } } // Case-insensitive regex search on the 'title' field
    ]
  }, function (err, docs) {

    if (err) {
      console.error('fetchJobsByLocationAndKeywordsAPI:', err);
      response.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log('fetchJobsByLocationAndKeywordsAPI: Success');
      response.json(docs);
    }
  });
});

app.post('/api/fetchJobsCardsContract_TimeAPI', (request, response) => {
  const requestData = request.body.contract_time;
  
  console.log("(fetchJobsCardsContract_TimeAPI) - Received contract_time to find:", requestData);
  
  db1.find({ "contract_time": requestData }, function (err, docs) {

    if (err) {
      console.error('fetchJobsCardsContract_TimeAPI:', err);
      response.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log('fetchJobsCardsContract_TimeAPI: Success');
      response.json(docs);
    }
  });
});

app.post('/api/fetchJobsCardsJobTypesAPI_TimeAPI', (request, response) => {
  const requestData = request.body.category;


  console.log("Received job title to find:", requestData);

  //db1.find({ "category.label":requestData }, function (err, docs) {

  db1.find({ "category.label": { $regex: new RegExp(requestData, 'i') } }, function (err, docs) {

    if (err) {
      console.error('fetchJobsCardsJobTypesAPI_TimeAPI:', err);
      response.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log('fetchJobsCardsJobTypesAPI_TimeAPI: Success', docs);

      response.json(docs);
    }
  });
});

app.post('/api/jobSearchWithParamatersAPI', (request, response) => {
  const requestData = request.body.category;
  const requestDataContType = request.body.contract_type;
  const requestDataContTime = request.body.contract_time;

  console.log("Received job title to find:", requestData, requestDataContType);

  // Build the $and array dynamically based on the presence of data in each array
  const andArray = [];

  if (requestData.length > 0) {
    andArray.push({"category.label": { $in: requestData }});
  }

  if (requestDataContType.length > 0) {
    andArray.push({"contract_type": { $in: requestDataContType }});
  }

  if (requestDataContTime.length > 0) {
    andArray.push({"contract_time": { $in: requestDataContTime }});
  }

  // Use the $and operator to combine conditions
  db1.find({ $and: andArray }, function (err, docs) {
    if (err) {
      console.error('jobSearchWithParamatersAPI:', err);
      response.status(500).json({ error: "Internal Server Error" });
    } else {
      let numfound = docs.length
      console.log('jobSearchWithParamatersAPI: Success' ,numfound, 'found');
      response.json(docs);
    }
  });
});




