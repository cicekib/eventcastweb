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
            Turkey: ["Istanbul", "Ankara", "Izmir", "Bursa", "Adana"],
            Russia: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan"]
        },
        europe: {
            Germany: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt"],
            France: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"],
            UK: ["London", "Birmingham", "Manchester", "Glasgow", "Liverpool"],
            Italy: ["Rome", "Milan", "Naples", "Turin", "Palermo"],
            Spain: ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza"]
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
            Fiji: ["Suva", "Lautoka", "Nadi", "Labasa", "Ba"],
            Papua_New_Guinea: ["Port Moresby", "Lae", "Arawa", "Mount Hagen", "Madang"]
        },
        antarctica: {
            Research_Stations: ["McMurdo Station", "South Pole Station", "Palmer Station", "Rothera", "Princess Elisabeth"]
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