// Populate continent -> country -> city dropdowns and enable/disable correctly

document.addEventListener('DOMContentLoaded', () => {
const locationData = {
    africa: {
        Nigeria: ["Lagos", "Kano", "Ibadan", "Abuja", "Port Harcourt"],
        Egypt: ["Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said"],
        South_Africa: ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth"],
        Kenya: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
        Ethiopia: ["Addis Ababa", "Gondar", "Mekelle", "Adama", "Hawassa"]
    },
    asia: {
        China: ["Shanghai", "Beijing", "Chongqing", "Tianjin", "Guangzhou"],
        India: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad"],
        Japan: ["Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo"],
        Russia: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan"]
    },
    europe: {
        Germany: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt"],
        France: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"],
        UK: ["London", "Birmingham", "Manchester", "Glasgow", "Liverpool"],
        Italy: ["Rome", "Milan", "Naples", "Turin", "Palermo"],
        Spain: ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza"],
        Netherlands: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
        Poland: ["Warsaw", "Krakow", "Lodz", "Wroclaw", "Poznan"],
        Turkey: ["Istanbul", "Ankara", "Izmir", "Bursa", "Adana"],
        Sweden: ["Stockholm", "Gothenburg", "Malmo", "Uppsala", "Vasteras"],
        Norway: ["Oslo", "Bergen", "Stavanger", "Trondheim", "Drammen"],
        Finland: ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu"],
        Denmark: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg"],
        Ireland: ["Dublin", "Cork", "Limerick", "Galway", "Waterford"],
        Portugal: ["Lisbon", "Porto", "Amadora", "Braga", "Coimbra"],
        Hungary: ["Budapest", "Debrecen", "Szeged", "Miskolc", "Pecs"],
        Austria: ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck"],
        Czechia: ["Prague", "Brno", "Ostrava", "Plzen", "Liberec"],
        Belgium: ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liege"]
    },
    north_america: {
        USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
        Canada: ["Toronto", "Montreal", "Calgary", "Ottawa", "Edmonton"],
        Mexico: ["Mexico City", "Ecatepec", "Guadalajara", "Puebla", "Juarez"],
        Cuba: ["Havana", "Santiago de Cuba", "Camaguey", "Holguin", "Guantanamo"],
        Guatemala: ["Guatemala City", "Mixco", "Villa Nueva", "Quetzaltenango", "San Miguel Petapa"]
    },
    south_america: {
        Brazil: ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador", "Fortaleza"],
        Argentina: ["Buenos Aires", "Cordoba", "Rosario", "Mendoza", "La Plata"],
        Colombia: ["Bogota", "Medellin", "Cali", "Barranquilla", "Cartagena"],
        Chile: ["Santiago", "Puente Alto", "Antofagasta", "Vina del Mar", "Valparaiso"],
        Peru: ["Lima", "Arequipa", "Trujillo", "Chiclayo", "Piura"]
    },
    australia: {
        Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
        New_Zealand: ["Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga"],
        Papua_New_Guinea: ["Port Moresby", "Lae", "Arawa", "Mount Hagen", "Madang"],
        Fiji: ["Suva", "Lautoka", "Nadi", "Labasa", "Ba"],
        Solomon_Islands: ["Honiara", "Gizo", "Auki", "Kirakira", "Tulagi"]
    },
    antarctica: {
        "Research Stations": ["McMurdo Station", "Amundsen-Scott South Pole Station", "Palmer Station", "Rothera Research Station", "Princess Elisabeth Station"]
    }
};

    const continentDropdown = document.getElementById('continentDropdown');
    const countryDropdown = document.getElementById('countryDropdown');
    const cityDropdown = document.getElementById('cityDropdown');

    if (!continentDropdown || !countryDropdown || !cityDropdown) return;

    function resetSelect(sel, placeholder) {
        sel.innerHTML = '';
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = placeholder;
        sel.appendChild(opt);
        sel.value = '';
    }

    function prettyName(name) {
        return name.replace(/_/g, ' ');
    }

    // initialize
    resetSelect(countryDropdown, 'Select Country');
    resetSelect(cityDropdown, 'Select City');
    countryDropdown.disabled = true;
    cityDropdown.disabled = true;

    continentDropdown.addEventListener('change', () => {
        const cont = continentDropdown.value;
        resetSelect(countryDropdown, 'Select Country');
        resetSelect(cityDropdown, 'Select City');
        countryDropdown.disabled = true;
        cityDropdown.disabled = true;

        if (cont && locationData[cont]) {
            const countries = Object.keys(locationData[cont]);
            countries.forEach(countryKey => {
                const o = document.createElement('option');
                o.value = countryKey;
                o.textContent = prettyName(countryKey);
                countryDropdown.appendChild(o);
            });
            countryDropdown.disabled = false;
        }
    });

    countryDropdown.addEventListener('change', () => {
        const cont = continentDropdown.value;
        const countryKey = countryDropdown.value;
        resetSelect(cityDropdown, 'Select City');
        cityDropdown.disabled = true;

        if (cont && countryKey && locationData[cont] && locationData[cont][countryKey]) {
            locationData[cont][countryKey].forEach(city => {
                const o = document.createElement('option');
                o.value = city;
                o.textContent = city;
                cityDropdown.appendChild(o);
            });
            cityDropdown.disabled = false;
        }
    });
});

// Update the displayEvents function in index.html or script.js
function displayEvents(events) {
    var table = document.getElementById('eventTable');
    
    // Clear existing rows except header
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    
    events.forEach((event, index) => {
        var newRow = table.insertRow(-1);
        
        // Add row number
        const rowNumCell = newRow.insertCell();
        rowNumCell.innerHTML = index + 1;
        
        // Add other cells in new order
        const eventNameCell = newRow.insertCell();
        const eventPriceCell = newRow.insertCell();
        const eventTimeCell = newRow.insertCell();
        const detailsLinkCell = newRow.insertCell();

        eventNameCell.innerHTML = event.name;
        eventPriceCell.innerHTML = event.price;
        eventTimeCell.innerHTML = event.date;
        detailsLinkCell.innerHTML = `<a href="${event.link}">Details</a>`;
    });
}
