// Function to fetch data from the website
function fetchData(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => callback(data))
        .catch(error => console.error('Error fetching data:', error));
}

// Function to parse the HTML and extract event information
function extractEventData(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extract event data here based on the structure of the website
    const events = [];

    // Example: extracting event type, name, time, and details link
    doc.querySelectorAll('.event').forEach(eventElement => {
        const eventType = eventElement.querySelector('.event-type').innerText;
        const eventName = eventElement.querySelector('.event-name').innerText;
        const eventTime = eventElement.querySelector('.event-time').innerText;
        const detailsLink = eventElement.querySelector('.event-details').href;

        events.push({
            type: eventType,
            name: eventName,
            time: eventTime,
            detailsLink: detailsLink
        });
    });

    return events;
}

// Function to display events as a table
function displayEvents(events) {
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    const headers = ['Event Type', 'Event Name', 'Event Time', 'Details Provider Link'];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        const textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });

    events.forEach(event => {
        const row = table.insertRow();
        for (const key in event) {
            const cell = row.insertCell();
            const textNode = document.createTextNode(event[key]);
            if (key === 'detailsLink') {
                const link = document.createElement('a');
                link.href = event[key];
                link.textContent = "Details";
                cell.appendChild(link);
            } else {
                cell.appendChild(textNode);
            }
        }
    });

    document.body.appendChild(table);
}

// Example usage
const websiteURL = 'https://allevents.in/';
fetchData(websiteURL, html => {
    const events = extractEventData(html);
    displayEvents(events);
});
