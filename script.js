// Function to parse the HTML and extract event information
function extractEventData(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extract event data here based on the structure of the website
    const events = [];

    // Example: extracting event type, name, time, and details link
    doc.querySelectorAll('.event').forEach(eventElement => {
        const eventPrice = eventElement.querySelector('.event-price').innerText;
        const eventName = eventElement.querySelector('.event-name').innerText;
        const eventTime = eventElement.querySelector('.event-time').innerText;
        const detailsLink = eventElement.querySelector('.event-details').href;

        events.push({
            price: eventPrice,
            name: eventName,
            time: eventTime,
            detailsLink: detailsLink
        });
    });

    return events;
}

// Function to display events as a table
function displayEvents(events) {
    var table = document.getElementById('eventTable');
    console.log("events_display: ", events)

    events.forEach(event => {
        var newRow = table.insertRow(-1);
        //const newRow = table.insertRow();

        // Create cells for each event property
        const eventPriceCell = newRow.insertCell();
        const eventNameCell = newRow.insertCell();
        const eventTimeCell = newRow.insertCell();
        const detailsLinkCell = newRow.insertCell();
        console.log("eventNameCell: ", eventNameCell)
        console.log("eventPriceCell: ", event.price)

        // Set the innerHTML of each cell with the corresponding event property
        eventPriceCell.innerHTML = event.price;
        eventNameCell.innerHTML = event.name;
        eventTimeCell.innerHTML = event.date;
        detailsLinkCell.innerHTML = `<a href="${event.link}">Details</a>`;
    });
}

// Function to fetch event data from backend
async function fetchEventData(selectedCity) {
    try {
        const response = await fetch('http://localhost:3000/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city: selectedCity })
        });
        if (!response.ok) {
            throw new Error('Failed to fetch event data');
        }
        const events = await response.json();
        return events;
    } catch (error) {
        console.error('Error fetching event data:', error);
        return [];
    }
}

// Function to handle search button click
async function handleSearch() {
    try {
        const selectedCity = document.getElementById('cityDropdown').value;
        const events = await fetchEventData(selectedCity);
        // Display events or do further processing here
        console.log('Eventsfetched:', events);
        displayEvents(events);
    } catch (error) {
        console.error('Errorfetched:', error);
    }
}

// Add event listener to the search button
document.getElementById('searchButton').addEventListener('click', handleSearch);



function filterTable() {
    var input, typeFilter, nameFilter, table, tr, typeTd, nameTd, i, typeTxtValue, nameTxtValue;
    input = document.getElementById("typeFilter");
    typeFilter = input.value.toUpperCase();
    nameFilter = input.value.toUpperCase(); // Use the same filter value for both type and name
    table = document.getElementById("eventTable");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        typeTd = tr[i].getElementsByTagName("td")[0];
        nameTd = tr[i].getElementsByTagName("td")[1]; // Get the cell containing the event name

        if (typeTd && nameTd) {
            typeTxtValue = typeTd.textContent || typeTd.innerText;
            nameTxtValue = nameTd.textContent || nameTd.innerText;
            console.log("trrrr: ", typeTxtValue)
            console.log("trrrr22: ", nameTxtValue)

            // Check if either the event type or event name matches the filter
            if (typeTxtValue.toUpperCase().indexOf(typeFilter) > -1 || nameTxtValue.toUpperCase().indexOf(nameFilter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// Function to remove the filter and display all events
function removeFilter() {
    console.log("already_remove")
    var table, tr, i;
    table = document.getElementById("eventTable");
    console.log("table:", table)
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }
}

// Function to toggle filter buttons state
function toggleActiveState(buttonId) {
    const button = document.getElementById(buttonId);
    const isActive = button.classList.contains('active');

    // Toggle active state for the clicked button
    if (isActive) {
        button.classList.remove('active');
    } else {
        // Remove active state from all buttons
        document.querySelectorAll('.select-time button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }
}
// Function to filter events by time: week, month, or year
function filterTableByTime(period) {
    console.log("already_filterd")

    document.querySelectorAll('.select-time button').forEach(button => {
        button.classList.remove('active');
    });

    // Remove the filter to display all events
    removeFilter();

    var table = document.getElementById("eventTable");
    const tr = table.getElementsByTagName("tr");

    const events = Array.from(tr).slice(1).map(row => {
        const [type, name, time, link] = Array.from(row.querySelectorAll("td")).map(cell => cell.textContent);
        return { type, name, time, detailsLink: link };
    });

    console.log("events", events)

    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.time);
        const today = new Date();
        let startDate, endDate;

        // Calculate start and end dates based on the selected period
        if (period === 'timethisweek') {
            const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay())); // Next Sunday
            startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()); // This Monday
            endDate = nextWeek;
        } else if (period === 'timethismonth') {
            startDate = new Date(today.getFullYear(), today.getMonth(), 1); // First day of this month
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of this month
        } else if (period === 'timethisyear') {
            startDate = new Date(today.getFullYear(), 0, 1); // First day of this year
            endDate = new Date(today.getFullYear(), 11, 31); // Last day of this year
        }

        return eventDate >= startDate && eventDate <= endDate;
    });

    console.log("filteredEvents222", filteredEvents)

    // Clear existing table rows
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Display filtered events
    filteredEvents.forEach(event => {
        const newRow = table.insertRow(-1);
        Object.values(event).forEach(value => {
            const cell = newRow.insertCell();
            cell.textContent = value;
        });
    });
    setTimeout(removeFilter, 500)
}

// Function to handle filter buttons click
function handleFilterButtonClick(period) {
    const button = document.getElementById(period);
    if (button.classList.contains('active')) {
        console.log("first")
        // If the button is already active, remove the filter
        removeFilter();
    } else {
        console.log("second")
        filterTableByTime(period);
        toggleActiveState(period);
    }
}

document.getElementById('timethisweek').addEventListener('click', () => handleFilterButtonClick('timethisweek'));
document.getElementById('timethismonth').addEventListener('click', () => handleFilterButtonClick('timethismonth'));
document.getElementById('timethisyear').addEventListener('click', () => handleFilterButtonClick('timethisyear'));
