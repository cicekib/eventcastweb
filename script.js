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
        console.error('Error fetching events from PredictHQ:', error);
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
    });
});
