// Event data fetching and display functions
async function fetchEvents(city) {
  try {
    const events = [];
    
    // Fetch from multiple sources concurrently
    await Promise.allSettled([
      fetchPredictHQEvents(city).then(results => events.push(...results)),
      fetchEventbriteEvents(city).then(results => events.push(...results)),
      fetchTicketmasterEvents(city).then(results => events.push(...results)),
      fetchSeatGeekEvents(city).then(results => events.push(...results)),
      fetchSongkickEvents(city).then(results => events.push(...results)),
      fetchMeetupEvents(city).then(results => events.push(...results)),
      fetchDatabaseEvents(city).then(results => events.push(...results))
    ]);

    // Sort events by date and return
    return events
      .filter(event => event.name && event.datetime)
      .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// PredictHQ API
async function fetchPredictHQEvents(city) {
  try {
    const tokenResp = await fetch('./etkinlik.txt');
    if (!tokenResp.ok) throw new Error('Failed to load API token');
    const token = (await tokenResp.text()).trim();
    if (!token) throw new Error('Empty API token');

    const url = new URL('https://api.predicthq.com/v1/events/');
    if (city) url.searchParams.set('q', city);
    url.searchParams.set('limit', '1000');

    const resp = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!resp.ok) return [];
    const data = await resp.json();
    const items = data.results || [];

    return items.map(ev => ({
      name: ev.title || ev.name || ev.id || '',
      datetime: ev.start || ev.starts_at || ev.start_local || '',
      price: ev.price || 'Free',
      detailsUrl: ev.link || (ev.sources && ev.sources[0] && ev.sources[0].url) || `https://predicthq.com/events/${ev.id}`,
      googleSearchLink: `https://www.google.com/search?q=${encodeURIComponent(ev.title || ev.name || ev.id || 'event')}`,
      source: 'PredictHQ',
      category: ev.category || ev.labels?.join(', ') || 'General'
    }));
  } catch (error) {
    console.error('Error fetching PredictHQ events:', error);
    return [];
  }
}

// Eventbrite API
async function fetchEventbriteEvents(city) {
  try {
    const tokenResp = await fetch('./etkinlik.txt');
    if (!tokenResp.ok) return [];
    const token = (await tokenResp.text()).trim();
    if (!token) return [];

    const url = new URL('https://www.eventbriteapi.com/v3/events/search/');
    if (city) url.searchParams.set('q', city);
    url.searchParams.set('sort_by', 'date');
    url.searchParams.set('page_size', '20');

    const resp = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!resp.ok) return [];
    const data = await resp.json();
    const items = data.events || [];

    return items.map(ev => ({
      name: ev.name?.text || ev.name || '',
      datetime: ev.start?.utc || ev.start?.local || '',
      price: ev.is_free ? 'Free' : (ev.ticket_availability?.minimum_ticket_price?.display || 'Paid'),
      detailsUrl: ev.url || `https://www.eventbrite.com/e/${ev.id}`,
      googleSearchLink: `https://www.google.com/search?q=${encodeURIComponent(ev.name?.text || ev.name || 'event')}`,
      source: 'Eventbrite',
      category: ev.category?.name || ev.subcategory?.name || 'General'
    }));
  } catch (error) {
    console.error('Error fetching Eventbrite events:', error);
    return [];
  }
}

// Ticketmaster API
async function fetchTicketmasterEvents(city) {
  try {
    const tokenResp = await fetch('./etkinlik.txt');
    if (!tokenResp.ok) return [];
    const token = (await tokenResp.text()).trim();
    if (!token) return [];

    const url = new URL('https://app.ticketmaster.com/discovery/v2/events.json');
    if (city) url.searchParams.set('city', city);
    url.searchParams.set('size', '20');
    url.searchParams.set('apikey', token);

    const resp = await fetch(url.toString());
    if (!resp.ok) return [];
    const data = await resp.json();
    const items = data._embedded?.events || [];

    return items.map(ev => ({
      name: ev.name || '',
      datetime: ev.dates?.start?.dateTime || ev.dates?.start?.localDate || '',
      price: ev.priceRanges ? `$${ev.priceRanges[0]?.min} - $${ev.priceRanges[0]?.max}` : 'Price varies',
      detailsUrl: ev.url || `https://www.ticketmaster.com/event/${ev.id}`,
      googleSearchLink: `https://www.google.com/search?q=${encodeURIComponent(ev.name || 'event')}`,
      source: 'Ticketmaster',
      category: ev.classifications?.[0]?.segment?.name || ev.classifications?.[0]?.genre?.name || 'Event'
    }));
  } catch (error) {
    console.error('Error fetching Ticketmaster events:', error);
    return [];
  }
}

// SeatGeek API
async function fetchSeatGeekEvents(city) {
  try {
    const tokenResp = await fetch('./etkinlik.txt');
    if (!tokenResp.ok) return [];
    const token = (await tokenResp.text()).trim();
    if (!token) return [];

    const url = new URL('https://api.seatgeek.com/2/events');
    if (city) url.searchParams.set('venue.city', city);
    url.searchParams.set('per_page', '20');
    url.searchParams.set('client_id', token);

    const resp = await fetch(url.toString());
    if (!resp.ok) return [];
    const data = await resp.json();
    const items = data.events || [];

    return items.map(ev => ({
      name: ev.title || ev.name || '',
      datetime: ev.datetime_utc || ev.datetime_local || '',
      price: ev.stats?.lowest_price ? `$${ev.stats.lowest_price}+` : 'Price varies',
      detailsUrl: ev.url || `https://seatgeek.com/events/${ev.id}`,
      googleSearchLink: `https://www.google.com/search?q=${encodeURIComponent(ev.title || ev.name || 'event')}`,
      source: 'SeatGeek',
      category: ev.type || ev.performers?.[0]?.type || 'Event'
    }));
  } catch (error) {
    console.error('Error fetching SeatGeek events:', error);
    return [];
  }
}

// Songkick API
async function fetchSongkickEvents(city) {
  try {
    const tokenResp = await fetch('./etkinlik.txt');
    if (!tokenResp.ok) return [];
    const token = (await tokenResp.text()).trim();
    if (!token) return [];

    const url = new URL('https://api.songkick.com/api/3.0/events.json');
    if (city) url.searchParams.set('location', `clientip=${city}`);
    url.searchParams.set('per_page', '20');
    url.searchParams.set('apikey', token);

    const resp = await fetch(url.toString());
    if (!resp.ok) return [];
    const data = await resp.json();
    const items = data.resultsPage?.results?.events || [];

    return items.map(ev => ({
      name: ev.displayName || '',
      datetime: ev.start?.datetime || ev.start?.date || '',
      price: ev.price ? `$${ev.price}` : 'Price varies',
      detailsUrl: ev.uri || `https://www.songkick.com/events/${ev.id}`,
      googleSearchLink: `https://www.google.com/search?q=${encodeURIComponent(ev.displayName || 'event')}`,
      source: 'Songkick',
      category: ev.type || 'Concert'
    }));
  } catch (error) {
    console.error('Error fetching Songkick events:', error);
    return [];
  }
}

// Meetup API
async function fetchMeetupEvents(city) {
  try {
    const tokenResp = await fetch('./etkinlik.txt');
    if (!tokenResp.ok) return [];
    const token = (await tokenResp.text()).trim();
    if (!token) return [];

    const url = new URL('https://api.meetup.com/graphql');
    const query = {
      query: `query {
        searchEvents(filter: {query: "${city}", source: ALL}) {
          edges {
            node {
              id
              title
              dateTime
              eventUrl
              group {
                category {
                  name
                }
              }
              isFree
            }
          }
        }
      }`
    };

    const resp = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    });

    if (!resp.ok) return [];
    const data = await resp.json();
    const items = data.data?.searchEvents?.edges || [];

    return items.map(edge => ({
      name: edge.node.title || '',
      datetime: edge.node.dateTime || '',
      price: edge.node.isFree ? 'Free' : 'Paid',
      detailsUrl: edge.node.eventUrl || '',
      googleSearchLink: `https://www.google.com/search?q=${encodeURIComponent(edge.node.title || 'event')}`,
      source: 'Meetup',
      category: edge.node.group?.category?.name || 'Meetup'
    }));
  } catch (error) {
    console.error('Error fetching Meetup events:', error);
    return [];
  }
}


// Database API: Fetch event data from Google Sheet based on selected city
async function fetchDatabaseEvents(city) {
  try {
    if (!city) return [];

    // Public Google Sheet URL
    const SHEET_ID = "1zXYyp5ddQfzsWmcFFXLRI49CbyPG4QAmWeNFPIYfkMg";
    const SHEET_NAME = "PHQ-25_Q2Q3"; // the tab name
    const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;

    const response = await fetch(SHEET_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const text = await response.text();

    // Parse Google GViz JSON
    const jsonText = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/);
    if (!jsonText || !jsonText[1]) throw new Error("Invalid Google Sheet JSON structure");
    const json = JSON.parse(jsonText[1]);

    const table = json.table;
    const headers = table.cols.map(c => c.label?.trim() || `col${Math.random()}`);
    const rows = table.rows || [];

    if (!rows.length) return [];

    // Detect city column (case-insensitive) or fallback to column F (index 5)
    let cityColIndex = headers.findIndex(h => h.toLowerCase().includes("city"));
    if (cityColIndex === -1) cityColIndex = 5;

    // Map rows to objects
    const data = rows.map(row => {
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = row.c[i]?.v || "";
      });
      return obj;
    });

    // Filter by city (case-insensitive)
    const filtered = data.filter(r => {
      const value = r[headers[cityColIndex]] || "";
      return value.toString().trim().toLowerCase() === city.toLowerCase();
    });

    // Map to standardized display format
    const formatted = filtered.map(ev => ({
      name: ev["Event Name"] || ev["Name"] || ev["Title"] || "Unnamed Event",
      datetime: ev["Date"] || ev["Datetime"] || "", // keep raw string
      price: ev["Price"] || "Free",
      detailsUrl: ev["Link"] || ev["URL"] || "",
      googleSearchLink: `https://www.google.com/search?q=${encodeURIComponent(ev["Event Name"] || ev["Name"] || "")}`,
      source: "Google Sheet",
      category: ev["Category"] || ev["Type"] || "General"
    }));

    console.log(`✅ Google Sheet events for "${city}" in tab "${SHEET_NAME}":`, formatted);
    return formatted;

  } catch (err) {
    console.error("❌ Error fetching Google Sheet events:", err);
    return [];
  }
}

// Function to display events in the table
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
      `<a href="${event.detailsUrl}" target="_blank">Details</a>`,
      `<a href="${event.googleSearchLink}" target="_blank">Google</a>`,
      event.source || 'N/A',
      event.category || 'General'

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
  if (!table) {
    console.error('eventTable not found');
    return;
  }
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

  console.log("Payload to send to sheet:", events);

  try {
    const SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxoG56VKcTrMaGi2VMmB_q4807A1zNQjZ4bLKMeZuNEm2DQGiakzth68ODinyBYw8--UA/exec";

    // Use text/plain to avoid CORS preflight (OPTIONS) which Apps Script doesn't respond to.
    const response = await fetch(SHEET_WEBAPP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8"
      },
      body: JSON.stringify(events)
    });

    // If the server returns a non-2xx, throw to be caught below
    if (!response.ok) {
      const txt = await response.text();
      throw new Error(`HTTP ${response.status} - ${txt}`);
    }

    const result = await response.json();
    console.log("Server response:", result);

    if (result && result.result === "success") {
      console.log(`✅ ${result.count || events.length} rows saved to Google Sheet.`);
    } else {
      console.error("❌ Save failed:", result);
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
