// Event data fetching and display functions
async function fetchEvents(city) {
    try {
        // Replace with your actual API endpoint
        const response = await fetch(`https://api.eventcast.com/events?city=${city}`);
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching events:', error);
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
