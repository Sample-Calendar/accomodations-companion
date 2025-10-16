async function loadAirportData() {
  try {
    const response = await fetch("/data/airports.csv");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const csvText = await response.text();
    return csvText;
  } catch (error) {
    console.error('Error fetching CSV:', error);
    return null;
  }
}

function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim() !== ''); // Remove empty lines
  if (lines.length === 0) {
    return [];
  }
  const headers = lines[0].split('\t').map(header => header.trim().toLowerCase()); // Split on tabs
  const results = [];

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split('\t'); // Split on tabs
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j] ? currentLine[j].trim() : '';
    }
    results.push(obj);
  }
  return results;
}

async function processAirportData() {
  const csvData = await loadAirportData();
  if (!csvData) {
    console.error("No CSV data to process");
    return [];
  }

  // Step 1: Parse the CSV data with tab delimiter
  const parsedData = parseCSV(csvData);

  // Step 2: Filter the data (keep only valid objects with a truthy code)
  const filteredData = parsedData.filter(airport => {
    const isObject = airport && typeof airport === 'object';
    const hasCode = isObject ? !!airport.code : false;
    const isValid = isObject && hasCode;
    return isValid;
  });

  // Step 3: Map the filtered data into the desired format
  const airportArray = filteredData.map(airport => {
    const mappedItem = {
      value: airport.code || '',
      label: airport.name || 'Unnamed',
    };
    return mappedItem;
  });

  return airportArray;
}

async function createPortOptions() {
  const airportOptions = await processAirportData();
  const allOption = { value: 'SelectAll', label: 'Any Airport' };
  return [allOption, ...airportOptions];
}

export async function getPortOptions() {
  const options = await createPortOptions();
  return options;
}