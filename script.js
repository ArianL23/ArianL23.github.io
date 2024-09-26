// Function to update the list of areas (either via fetch or simulated data)
function updateAreas(areas) {
    const areaList = document.getElementById('area-list');
    
    // Clear the current list
    areaList.innerHTML = '';

    // Populate the list with areas
    areas.forEach(area => {
        const listItem = document.createElement('li');
        listItem.textContent = area;
        areaList.appendChild(listItem);
    });
}

// Fetch areas from the external JSON
async function fetchAreas() {
    try {
        const response = await fetch('https://www.mako.co.il/Collab/amudanan/alerts.json'); // Replace with the actual URL
        const jsonData = await response.json();
        const areas = jsonData.data;
        updateAreas(areas);
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
            "בדיקה", 
            "בדיקה", 
            "בדיקה", 
            "בדיקה", 
            "בדיקה", 
            "בדיקה", 
            "בדיקה"
        ],
        "desc": "היכנסו למרחב המוגן ושהו בו 10 דקות"
    };

    // Simulate the update with the same update logic
    updateAreas(simulatedJson.data);
}

// Update areas every second
setInterval(fetchAreas, 10000);

// Initial call to populate the list with real data
fetchAreas();

// to test: simulateAreas();
