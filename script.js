// Event data fetching and display functions
async function fetchEvents(city) {
    try {
        // Load API token from local file (served by your web server)
        const tokenResp = await fetch('./etkinlik.txt');
        if (!tokenResp.ok) throw new Error('Failed to load API token');
        const token = (await tokenResp.text()).trim();
        if (!token) throw new Error('Empty API token');

        // Build PredictHQ request
        const url = new URL('https://api.predicthq.com/v1/events/');
        if (city) url.searchParams.set('q', city);
        url.searchParams.set('limit', '50');

        const resp = await fetch(url.toString(), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!resp.ok) {
            const txt = await resp.text();
            throw new Error(`PredictHQ API error ${resp.status}: ${txt}`);
        }

        const data = await resp.json();

        // PredictHQ may return results in different keys; normalize to an array
        const items = data.results || data.data || data || [];

        // Map to the format expected by displayEvents in this file
        return (items || []).map(ev => {
            return {
                name: ev.title || ev.name || ev.id || '',
                datetime: ev.start || ev.starts_at || ev.start_local || ev.scheduled_start || ev.scheduled || '',
                price: ev.price || null,
                detailsUrl: ev.link || (ev.sources && ev.sources[0] && ev.sources[0].url) || `https://predicthq.com/events/${ev.id}`
            };
        });
    } catch (error) {
        console.error('Error fetching events from API:', error);
        return [];
    }
}

function displayEvents(events) {
    const table = document.getElementById('eventTable');
    
    // Clear existing rows except header
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Add new event rows
    events.forEach((event, index) => {
        const row = table.insertRow(-1);
        
        // Add cells
        const cells = [
            index + 1,
            event.name,
            event.price || 'Free',
            new Date(event.datetime).toLocaleDateString(),
            `<a href="${event.detailsUrl}" target="_blank">Details</a>`
        ];

        cells.forEach(cellData => {
            const cell = row.insertCell();
            cell.innerHTML = cellData;
        });
    });
}

// Event handlers
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const cityDropdown = document.getElementById('cityDropdown');
    
    searchButton.addEventListener('click', async () => {
        const selectedCity = cityDropdown.value;
        
        if (!selectedCity) {
            alert('Please select a city first');
            return;
        }

        // Show loading state
        searchButton.disabled = true;
        searchButton.textContent = 'Searching...';

        try {
            const events = await fetchEvents(selectedCity);
            displayEvents(events);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch events. Please try again.');
        } finally {
            // Reset button state
            searchButton.disabled = false;
            searchButton.textContent = 'Search Events';
        }

        saveEventsToSheet(); // Call to save events after displaying
    });
    saveEventsToSheet(); // Call to save events after displaying
});

saveEventsToSheet(); // Call to save events after displaying

// Function to save events to Google Sheet via Web App
function saveEventsToSheet() {
  const rows = document.querySelectorAll("#eventsTable tbody tr");
  if (rows.length === 0) {
    console.warn("No events to save.");
    return;
  }

  const events = [];

  rows.forEach(row => {
    const cols = row.querySelectorAll("td");
    events.push({
      name: cols[0].innerText.trim(),
      price: cols[1].innerText.trim(),
      date: cols[2].innerText.trim(),
      link: cols[3].querySelector('a') ? cols[3].querySelector('a').href : '',
      continent: document.getElementById("continentSelect").value,
      country: document.getElementById("countrySelect").value,
      city: document.getElementById("citySelect").value
    });
  });

  fetch("https://script.google.com/macros/s/AKfycbwE1bJ5geAxB2jzQQWNbw7c2MzOBIFKPvNoESP9JgciPAW2jnYhaqFUGzPbkS8QTX2g/exec", {
    method: "POST",
    body: JSON.stringify(events),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(response => {
    if (response.result === "success") {
      console.log("Events successfully saved to Google Sheet.");
    } else {
      console.error("Failed to save events:", response.message);
    }
  })
  .catch(err => {
    console.error("Error sending data to Google Sheet:", err);
  });
}



