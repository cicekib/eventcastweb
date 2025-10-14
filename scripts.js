// Populate continent -> country -> city dropdowns and enable/disable correctly

document.addEventListener('DOMContentLoaded', () => {
const locationData = {
    africa: {
        Nigeria: ["Lagos", "Kano", "Ibadan", "Abuja", "Port Harcourt", "Benin City", "Maiduguri", "Zaria", "Aba", "Jos"],
        Egypt: ["Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said", "Suez", "Luxor", "Mansoura", "El-Mahalla", "Aswan"],
        South_Africa: ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein", "East London", "Nelspruit", "Kimberley", "Polokwane"],
        Kenya: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale", "Garissa", "Kakamega"],
        Ethiopia: ["Addis Ababa", "Gondar", "Mekelle", "Adama", "Hawassa", "Dire Dawa", "Bahir Dar", "Dessie", "Jimma", "Jijiga"],
        Ghana: ["Accra", "Kumasi", "Tamale", "Sekondi-Takoradi", "Sunyani", "Cape Coast", "Obuasi", "Ho", "Koforidua", "Wa"],
        Algeria: ["Algiers", "Oran", "Constantine", "Annaba", "Blida", "Batna", "Djelfa", "Setif", "Sidi Bel Abbes", "Biskra"],
        Morocco: ["Casablanca", "Rabat", "Fes", "Marrakesh", "Agadir", "Tangier", "Meknes", "Oujda", "Kenitra", "Tetouan"],
        Tanzania: ["Dodoma", "Dar es Salaam", "Arusha", "Mbeya", "Mwanza", "Morogoro", "Tanga", "Kigoma", "Tabora", "Rukwa"],
        Uganda: ["Kampala", "Nairobi", "Gulu", "Mbarara", "Jinja", "Masaka", "Entebbe", "Kabale", "Fort Portal", "Soroti"]
    },
    asia: {
        China: ["Shanghai", "Beijing", "Guangzhou", "Shenzhen", "Chengdu", "Tianjin", "Wuhan", "Dongguan", "Chongqing", "Nanjing"],
        India: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Surat"],
        Japan: ["Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kyoto", "Kawasaki", "Saitama"],
        Russia: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan", "Nizhny Novgorod", "Chelyabinsk", "Samara", "Omsk", "Rostov-on-Don"],
        Indonesia: ["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang", "Makassar", "Palembang", "Tangerang", "Depok", "Yogyakarta"],
        Pakistan: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Rawalpindi", "Multan", "Hyderabad", "Gujranwala", "Peshawar", "Quetta"],
        Bangladesh: ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Barisal", "Brahmanbaria", "Narayanganj", "Comilla", "Netrakona"],
        Vietnam: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Haiphong", "Can Tho", "Bien Hoa", "Hue", "Nha Trang", "Vung Tau", "Quy Nhon"],
        Philippines: ["Manila", "Quezon City", "Cebu City", "Davao City", "Zamboanga City", "Taguig", "Pasig", "Antipolo", "Caloocan", "Iloilo City"],
        Thailand: ["Bangkok", "Nonthaburi", "Nakhon Ratchasima", "Chiang Mai", "Hat Yai", "Udon Thani", "Pak Kret", "Pattaya", "Khon Kaen", "Surat Thani"]
        UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Al Ain", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm al Quwain", "Khor Fakkan", "Dibba Al-Fujairah"],
        Qatar: ["Doha", "Al Rayyan", "Al Khor", "Al Wakrah", "Umm Salal", "Al Mansurah", "Madinat Khalifah", "An Najmah", "As Sadd", "Farij al Amir"],
        Kuwait: ["Kuwait City", "Al Ahmadi", "Hawalli", "Al Jahra", "Salmiya", "Farwaniya", "Mangaf", "Fahaheel", "Rumaithiya", "Khaitan"],
        Bahrain: ["Manama", "Riffa", "Muharraq", "Hamad Town", "Isa Town", "Sitra", "Budaiya", "A’ali", "Hamala", "Saar"],
        Saudi Arabia: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Ta’if", "Al Ahsa", "Buraidah", "Khobar", "Tabuk"],
        Iraq: ["Baghdad", "Mosul", "Basra", "Kirkuk", "Erbil", "Karbala", "Sulaymaniyah", "Najaf", "Nasiriyah", "Hillah"],
        Iran: ["Tehran", "Mashhad", "Isfahan", "Karaj", "Tabriz", "Shiraz", "Qom", "Ahvaz", "Kermanshah", "Rasht"],
        Syria: ["Damascus", "Aleppo", "Homs", "Latakia", "Hama", "Deir ez-Zor", "Raqqa", "Al-Hasakah", "Tartus", "Douma"],
        Oman: ["Muscat", "Seeb", "Salalah", "Bawshar", "Sohar", "Nizwa", "Rustaq", "Ibri", "Sur", "Buraimi"],
        Jordan: ["Amman", "Zarqa", "Irbid", "Russeifa", "Aqaba", "Madaba", "Mafraq", "Karak", "Jerash", "Ajloun"],
        Lebanon: ["Beirut", "Tripoli", "Sidon", "Tyre", "Zahle", "Baabda", "Jounieh", "Aley", "Byblos", "Nabatieh"]
        
    },
    europe: {
        Germany: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Dusseldorf", "Leipzig", "Dortmund", "Essen"],
        France: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"],
        UK: ["London", "Birmingham", "Manchester", "Glasgow", "Liverpool", "Bristol", "Leeds", "Edinburgh", "Sheffield", "Newcastle"],
        Italy: ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", "Bari", "Venice"],
        Spain: ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Malaga", "Murcia", "Palma", "Las Palmas", "Bilbao"],
        Netherlands: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Tilburg", "Groningen", "Almere", "Breda", "Nijmegen"],
        Turkey: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Adana", "Gaziantep", "Konya", "Mersin", "Diyarbakir"],
        Poland: ["Warsaw", "Krakow", "Lodz", "Wroclaw", "Poznan", "Gdansk", "Szczecin", "Bydgoszcz", "Lublin", "Katowice"],
        Sweden: ["Stockholm", "Gothenburg", "Malmo", "Uppsala", "Vasteras", "Linkoping", "Orebro", "Helsingborg", "Norrkoping", "Lund"],
        Norway: ["Oslo", "Bergen", "Stavanger", "Trondheim", "Drammen", "Fredrikstad", "Porsgrunn", "Bodø", "Sandnes", "Skien"],
        Finland: ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu", "Lahti", "Kuopio", "Jyvaskyla", "Rovaniemi", "Porvoo"],
        Denmark: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg", "Randers", "Kolding", "Horsens", "Vejle", "Silkeborg"],
        Ireland: ["Dublin", "Cork", "Limerick", "Galway", "Waterford", "Kilkenny", "Sligo", "Drogheda", "Tralee", "Naas"],
        Portugal: ["Lisbon", "Porto", "Amadora", "Braga", "Coimbra", "Setubal", "Aveiro", "Funchal", "Leiria", "Évora"],
        Austria: ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt", "Villach", "Wels", "St. Pölten", "Bregenz"],
        Switzerland: ["Zurich", "Geneva", "Basel", "Bern", "Lausanne", "Lucerne", "St. Gallen", "Lugano", "La Chaux-de-Fonds", "Biel/Bienne"],
        Belgium: ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liege", "Bruges", "Namur", "Leuven", "Mons", "Mechelen"],
        Czechia: ["Prague", "Brno", "Ostrava", "Plzen", "Liberec", "Olomouc", "Usti nad Labem", "Hradec Kralove", "Zlin", "Jihlava"],
        Georgia: ["Batumi", "Tblisi"],
        Cyprus: ["Nicosia", "Limassol", "Larnaca", "Famagusta", "Paphos", "Kyrenia", "Paralimni", "Morphou", "Ayia Napa", "Dherynia"]
    },
    north_america: {
        USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"],
        Canada: ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Halifax"],
        Mexico: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "Ciudad Juarez", "Leon", "Zapopan", "Merida", "Queretaro"],
        Cuba: ["Havana", "Santiago de Cuba", "Camaguey", "Holguin", "Guantanamo", "Santa Clara", "Las Tunas", "Bayamo", "Cienfuegos", "Pinar del Rio"],
        Guatemala: ["Guatemala City", "Mixco", "Villa Nueva", "Quetzaltenango", "San Miguel Petapa", "Escuintla", "Mazatenango", "Chimaltenango", "Solola", "Retalhuleu"],
        Honduras: ["Tegucigalpa", "San Pedro Sula", "Choloma", "La Ceiba", "El Progreso", "Comayagua", "Puerto Cortes", "Danli", "La Lima", "Olancho"],
        Costa_Rica: ["San Jose", "Alajuela", "Cartago", "Heredia", "Liberia", "Puntarenas", "San Ramon", "Escazu", "Curridabat", "Tibas"],
        Panama: ["Panama City", "San Miguelito", "David", "Colón", "La Chorrera", "Santiago de Veraguas", "Chitre", "Penonome", "Las Tablas", "Bocas del Toro"]
    },
    south_america: {
        Brazil: ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre"],
        Argentina: ["Buenos Aires", "Cordoba", "Rosario", "Mendoza", "La Plata", "San Miguel de Tucuman", "Mar del Plata", "Salta", "Santa Fe", "San Juan"],
        Colombia: ["Bogota", "Medellin", "Cali", "Barranquilla", "Cartagena", "Cucuta", "Bucaramanga", "Pereira", "Santa Marta", "Villavicencio"],
        Chile: ["Santiago", "Valparaiso", "Concepcion", "La Serena", "Antofagasta", "Temuco", "Rancagua", "Talca", "Arica", "Chillan"],
        Peru: ["Lima", "Arequipa", "Trujillo", "Chiclayo", "Piura", "Iquitos", "Cusco", "Huancayo", "Tacna", "Ica"],
        Venezuela: ["Caracas", "Maracaibo", "Valencia", "Barquisimeto", "Ciudad Guayana", "Maturin", "Puerto La Cruz", "San Cristobal", "La Guaira", "Barinas"],
        Ecuador: ["Quito", "Guayaquil", "Cuenca", "Machala", "Manta", "Durán", "Ambato", "Esmeraldas", "Loja", "Santo Domingo"],
        Bolivia: ["Sucre", "La Paz", "Santa Cruz", "Cochabamba", "Oruro", "Potosi", "Tarija", "El Alto", "Beni", "Pando"]
    },
    australia: {
        Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Newcastle", "Wollongong", "Logan City"],
        New_Zealand: ["Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga", "Napier-Hastings", "Dunedin", "Palmerston North", "Nelson", "Rotorua"],
        Papua_New_Guinea: ["Port Moresby", "Lae", "Mount Hagen", "Madang", "Goroka", "Kokopo", "Kimbe", "Bulolo", "Rabaul", "Popondetta"],
        Fiji: ["Suva", "Lautoka", "Nadi", "Labasa", "Ba", "Sigatoka", "Levuka", "Korolevu", "Taveuni", "Savusavu"],
        Solomon_Islands: ["Honiara", "Gizo", "Auki", "Kirakira", "Tulagi", "Noro", "Munda", "Lata", "Buala", "Taro"]
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

// Replace duplicate displayEvents implementation with a compatibility wrapper
if (typeof window.displayEvents === 'undefined') {
    window.displayEvents = function(events) {
        const table = document.getElementById('eventTable');
        if (!table) return;

        // Clear existing rows except header
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        events.forEach((event, index) => {
            const row = table.insertRow(-1);

            // Find a date value in common keys
            const rawDate = event.datetime || event.date || event.time || event.start || event.starts_at || '';
            const eventDate = new Date(rawDate);
            const formattedDate = isNaN(eventDate) ? '' : eventDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            const name = event.name || event.title || '';
            const price = event.price || 'Free';
            const detailsUrl = event.detailsUrl || event.link || event.detailsLink || '#';

            const cells = [
                index + 1,
                // use textContent equivalent by creating text nodes where possible
                name,
                price,
                formattedDate,
                `<a href="${detailsUrl}" target="_blank" rel="noopener noreferrer">Details</a>`
            ];

            cells.forEach(cellData => {
                const cell = row.insertCell();
                cell.innerHTML = cellData;
            });
        });
    };
}

// Time filter function
function filterTableByTime(period) {
    const table = document.getElementById('eventTable');
    const rows = Array.from(table.getElementsByTagName('tr')).slice(1); // Skip header row
    const today = new Date();

    // Calculate end dates for each period
    const endDates = {
        'timethisweek': new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000)), // 7 days from now
        'timethismonth': new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000)), // 30 days from now
        'timethisyear': new Date(today.getFullYear(), 11, 31) // December 31st of current year
    };

    const endDate = endDates[period];

    // Hide rows that don't match the time filter
    rows.forEach(row => {
        const timeCell = row.cells[3]; // Event Time column
        const eventDate = new Date(timeCell.textContent);
        
        if (eventDate <= endDate && eventDate >= today) {
            row.style.display = ''; // Show row
        } else {
            row.style.display = 'none'; // Hide row
        }
    });
}

// Update button click handlers
function setupTimeFilterButtons() {
    const buttons = {
        'timethisweek': document.getElementById('timethisweek'),
        'timethismonth': document.getElementById('timethismonth'),
        'timethisyear': document.getElementById('timethisyear')
    };

    Object.entries(buttons).forEach(([period, button]) => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            Object.values(buttons).forEach(btn => btn.classList.remove('active'));
            
            if (button.classList.contains('active')) {
                // If already active, deactivate and show all rows
                button.classList.remove('active');
                const rows = document.getElementById('eventTable').getElementsByTagName('tr');
                Array.from(rows).forEach(row => row.style.display = '');
            } else {
                // Activate button and filter
                button.classList.add('active');
                filterTableByTime(period);
            }
        });
    });
}

// Function to get location from IP address
async function getLocationFromIP() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return {
            continent: data.continent_code.toLowerCase(),
            country: data.country_name.replace(' ', '_'),
            city: data.city
        };
    } catch (error) {
        console.error('Error getting location from IP:', error);
        return null;
    }
}

// Function to set dropdown values
function setDropdownValues(continent, country, city) {
    // Convert continent codes to match your dropdown values
    const continentMap = {
        'AF': 'africa',
        'AS': 'asia',
        'EU': 'europe',
        'NA': 'north_america',
        'SA': 'south_america',
        'OC': 'australia',
        'AN': 'antarctica'
    };

    // map short continent codes or accept already-mapped strings
    let mappedContinent = continent;
    if (typeof continent === 'string') {
        const up = continent.toUpperCase();
        mappedContinent = continentMap[up] || continent.toLowerCase();
    }

    // helper to normalize strings for loose matching
    const normalize = s => (s || '').toString().toLowerCase().replace(/[\s_\-.,'"]/g, '');

    // Set continent and trigger change to populate countries
    const continentDropdown = document.getElementById('continentDropdown');
    if (continentDropdown) {
        continentDropdown.value = mappedContinent;
        continentDropdown.dispatchEvent(new Event('change'));
    }

    // After continent change populates countries, try to pick best country
    setTimeout(() => {
        const countryDropdown = document.getElementById('countryDropdown');
        if (countryDropdown && country) {
            const target = normalize(country);
            let matchedCountry = null;

            for (const opt of countryDropdown.options) {
                if (!opt.value) continue; // skip placeholder
                const optVal = normalize(opt.value);
                const optText = normalize(opt.text);
                if (optVal === target || optText === target || optVal.includes(target) || target.includes(optVal) || optText.includes(target) || target.includes(optText)) {
                    matchedCountry = opt.value;
                    break;
                }
            }

            // try common underscore variant as last attempt
            if (!matchedCountry) {
                const alt = country.replace(/\s+/g, '_');
                const altNorm = normalize(alt);
                for (const opt of countryDropdown.options) {
                    if (normalize(opt.value) === altNorm) { matchedCountry = opt.value; break; }
                }
            }

            if (matchedCountry) {
                countryDropdown.value = matchedCountry;
                countryDropdown.dispatchEvent(new Event('change'));
            }
        }

        // After country change populates cities, pick best matching city (or fallback)
        setTimeout(() => {
            const cityDropdown = document.getElementById('cityDropdown');
            if (!cityDropdown) return;

            const targetCity = normalize(city);
            let matchedCity = null;

            if (city) {
                for (const opt of cityDropdown.options) {
                    if (!opt.value) continue; // skip placeholder
                    const optVal = normalize(opt.value);
                    const optText = normalize(opt.text);
                    if (optVal === targetCity || optText === targetCity || optVal.includes(targetCity) || targetCity.includes(optVal) || optText.includes(targetCity) || targetCity.includes(optText)) {
                        matchedCity = opt.value;
                        break;
                    }
                }
            }

            // fallback: choose first non-empty city option
            if (!matchedCity) {
                const first = Array.from(cityDropdown.options).find(o => o.value);
                if (first) matchedCity = first.value;
            }

            if (matchedCity) {
                cityDropdown.value = matchedCity;
                cityDropdown.dispatchEvent(new Event('change'));
            }
        }, 150);
    }, 150);
}

// Function to get location from browser
function getLocationFromBrowser() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                    );
                    const data = await response.json();
                    
                    resolve({
                        continent: data.continent.toLowerCase(),
                        country: data.countryName.replace(' ', '_'),
                        city: data.city
                    });
                } catch (error) {
                    reject(error);
                }
            },
            (error) => {
                reject(error);
            }
        );
    });
}

// Initialize location detection
async function initializeLocation() {
    try {
        // Try getting location from browser first
        const location = await getLocationFromBrowser();
        setDropdownValues(location.continent, location.country, location.city);
    } catch (error) {
        console.log('Browser location failed, trying IP-based location...');
        try {
            // Fallback to IP-based location
            const location = await getLocationFromIP();
            if (location) {
                setDropdownValues(location.continent, location.country, location.city);
            }
        } catch (error) {
            console.error('Failed to get location:', error);
        }
    }
}

// Add to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // ...existing DOMContentLoaded code...

    // Initialize location detection
    initializeLocation();
    setupTimeFilterButtons();
});



