// Stores areas and their timestamps
let areaStorage = [];

// Function to update the list of areas
function updateAreas() {
    const areaList = document.getElementById('area-list');
    const currentTime = Date.now();
    
    // Clear the current list
    areaList.innerHTML = '';

    // Filter out areas older than 3 minutes (180000 milliseconds)
    areaStorage = areaStorage.filter(areaData => (currentTime - areaData.timestamp) <= 180000);

    // Only populate the list if there are areas to show
    if (areaStorage.length > 0) {
        areaStorage.forEach(areaData => {
            const listItem = document.createElement('li');
            listItem.textContent = areaData.area;
            areaList.appendChild(listItem);
        });
    }
}

// Fetch areas from the external JSON
async function fetchAreas() {
    try {
        const response = await fetch('https://www.mako.co.il/Collab/amudanan/alerts.json');
        const jsonData = await response.json();
        const areas = jsonData.data;

        const currentTime = Date.now();

        // Add new areas to the storage with a timestamp
        areas.forEach(area => {
            // Avoid duplicate areas by checking if it's already in storage
            if (!areaStorage.some(areaData => areaData.area === area)) {
                areaStorage.push({ area: area, timestamp: currentTime });
            }
        });

        // Update the display
        updateAreas();
    } catch (error) {
        console.error('Error fetching areas:', error);
    }
}

// Simulate areas using console input
function simulateAreas() {
    const simulatedJson = {
        "id": "133717343640000000",
        "cat": "1",
        "title": "ירי רקטות וטילים",
        "data": [
            "א", 
            "ב", 
            "ג", 
            "ד", 
            "ה", 
            "ו", 
            "ז"
        ],
        "desc": "היכנסו למרחב המוגן ושהו בו 10 דקות"
    };

    const currentTime = Date.now();

    // Add simulated areas to the storage with a timestamp
    simulatedJson.data.forEach(area => {
        if (!areaStorage.some(areaData => areaData.area === area)) {
            areaStorage.push({ area: area, timestamp: currentTime });
        }
    });

    // Update the display
    updateAreas();
}

// Update areas every 10 seconds
setInterval(fetchAreas, 10000); // 10000 milliseconds = 10 seconds

// Initial call to populate the list with real data
fetchAreas();

// to test: simulateAreas();
