// Event data fetching and display functions
async function fetchEvents(city) {
  try {
    const tokenResp = await fetch('./etkinlik.txt');
    if (!tokenResp.ok) throw new Error('Failed to load API token');
    const token = (await tokenResp.text()).trim();
    if (!token) throw new Error('Empty API token');

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
    const items = data.results || data.data || data || [];

    return (items || []).map(ev => ({
      name: ev.title || ev.name || ev.id || '',
      datetime: ev.start || ev.starts_at || ev.start_local || ev.scheduled_start || ev.scheduled || '',
      price: ev.price || 'Free',
      detailsUrl: ev.link || (ev.sources && ev.sources[0] && ev.sources[0].url) || `https://predicthq.com/events/${ev.id}`
    }));

  } catch (error) {
    console.error('Error fetching events from API:', error);
    return [];
  }
}

function displayEvents(events) {
  const table = document.getElementById('eventTable');
  if (!table) {
    console.error('Table element with id="eventTable" not found.');
    return;
  }

  // Clear existing rows except header
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // Add new event rows
  events.forEach((event, index) => {
    const row = table.insertRow(-1);

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

// Function to save displayed events to Google Sheet
async function saveEventsToSheet() {
  const table = document.getElementById('eventTable');
  const rows = table.querySelectorAll("tr:not(:first-child)");

  if (rows.length === 0) {
    console.warn("No events to save.");
    return;
  }

  const events = [];

  rows.forEach(row => {
    const cols = row.querySelectorAll("td");
    events.push({
      index: cols[0]?.innerText.trim(),
      name: cols[1]?.innerText.trim(),
      price: cols[2]?.innerText.trim(),
      date: cols[3]?.innerText.trim(),
      link: cols[4]?.querySelector('a') ? cols[4].querySelector('a').href : '',
      city: document.getElementById("cityDropdown")?.value || '',
      country: document.getElementById("countrySelect")?.value || '',
      continent: document.getElementById("continentSelect")?.value || ''
    });
  });

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzH5MEU981veXK3mXIt9xh6k1IVgKf6j0pKCLw62SnzNgjsmBhlsO4SNFaxfsxd4N3B_Q/exec", {
      method: "POST",
      body: JSON.stringify(events),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json();
    if (result.result === "success") {
      console.log("✅ Events successfully saved to Google Sheet.");
    } else {
      console.error("❌ Failed to save events:", result.message);
    }
  } catch (err) {
    console.error("Error sending data to Google Sheet:", err);
  }
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

    searchButton.disabled = true;
    searchButton.textContent = 'Searching...';

    try {
      const events = await fetchEvents(selectedCity);
      displayEvents(events);

      if (events.length > 0) {
        await saveEventsToSheet(); // ✅ save only after table is populated
      } else {
        console.warn("No events fetched to save.");
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch events. Please try again.');
    } finally {
      searchButton.disabled = false;
      searchButton.textContent = 'Search Events';
    }
  });
});

