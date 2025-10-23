// Populate continent -> country -> city dropdowns and enable/disable correctly
document.addEventListener('DOMContentLoaded', () => {
const locationData = {
    
    africa: {
        Algeria: ["Algiers", "Oran", "Constantine", "Annaba", "Blida", "Batna", "Sétif", "Sidi Bel Abbès", "Skikda", "Tébessa"],
        Angola: ["Luanda", "N'dalatando", "Huambo", "Lobito", "Benguela", "Lubango", "Kuito", "Namibe", "Malanje", "Soyo"],
        Benin: ["Porto-Novo", "Cotonou", "Parakou", "Djougou", "Bohicon", "Kandi", "Abomey", "Natitingou", "Lokossa", "Ouidah"],
        Botswana: ["Gaborone", "Francistown", "Molepolole", "Selebi-Phikwe", "Maun", "Serowe", "Kanye", "Mahalapye", "Mogoditshane", "Palapye"],
        BurkinaFaso: ["Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Ouahigouya", "Banfora", "Dédougou", "Tenkodogo", "Gaoua", "Kaya", "Fada N'gourma"],
        Burundi: ["Bujumbura", "Gitega", "Ngozi", "Rumonge", "Ruyigi", "Muramvya", "Kayanza", "Makamba", "Cibitoke", "Kirundo"],
        CaboVerde: ["Praia", "Mindelo", "Santa Maria", "Cova Figueira", "Assomada", "Espargos", "Porto Novo", "Tarrafal", "Vila do Maio", "Sal Rei"],
        Cameroon: ["Yaoundé", "Douala", "Garoua", "Bamenda", "Maroua", "Ngaoundéré", "Bertoua", "Loum", "Kumba", "Edea"],
        CentralAfricanRepublic: ["Bangui", "Bimbo", "Mbaïki", "Berbérati", "Kaga-Bandoro", "Bozoum", "Bossangoa", "Bria", "Bambari", "Nola"],
        Chad: ["N'Djamena", "Moundou", "Sarh", "Abéché", "Kélo", "Koumra", "Pala", "Am Timan", "Bongor", "Mongo"],
        Comoros: ["Moroni", "Mutsamudu", "Domoni", "Fomboni", "Adda-Douéni", "Sima", "Ouani", "Iconi", "Koki", "Mbeni"],
        Congo: ["Brazzaville", "Pointe-Noire", "Dolisie", "Nkayi", "Impfondo", "Ouesso", "Madingou", "Owando", "Loandjili", "Gamboma"],
        DRCongo: ["Kinshasa", "Lubumbashi", "Mbuji-Mayi", "Kisangani", "Kananga", "Bukavu", "Goma", "Kolwezi", "Likasi", "Matadi"],
        Djibouti: ["Djibouti City", "Ali Sabieh", "Tadjoura", "Obock", "Dikhil", "Arta", "Holhol", "Yoboki", "Loyada", "Galafi"],
        Egypt: ["Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said", "Suez", "Luxor", "Mansoura", "Tanta", "Asyut"],
        EquatorialGuinea: ["Malabo", "Bata", "Ebebiyin", "Aconibe", "Evinayong", "Luba", "Mikomeseng", "Mongomo", "Rebola", "Mbini"],
        Eritrea: ["Asmara", "Keren", "Massawa", "Assab", "Mendefera", "Barentu", "Dekemhare", "Akordat", "Adi Keyh", "Teseney"],
        Eswatini: ["Mbabane", "Manzini", "Big Bend", "Mhlume", "Nhlangano", "Hlatikulu", "Siteki", "Piggs Peak", "Lobamba", "Simunye"],
        Ethiopia: ["Addis Ababa", "Dire Dawa", "Mekelle", "Adama", "Hawassa", "Bahir Dar", "Jimma", "Gondar", "Dessie", "Shashamane"],
        Gabon: ["Libreville", "Port-Gentil", "Franceville", "Oyem", "Moanda", "Mouila", "Lambaréné", "Tchibanga", "Koulamoutou", "Makokou"],
        Gambia: ["Banjul", "Serekunda", "Brikama", "Bakau", "Farafenni", "Soma", "Basse Santa Su", "Kerewan", "Lamin", "Janjanbureh"],
        Ghana: ["Accra", "Kumasi", "Tamale", "Takoradi", "Ashaiman", "Cape Coast", "Obuasi", "Tema", "Teshie", "Madina"],
        Guinea: ["Conakry", "Nzérékoré", "Kankan", "Kindia", "Labé", "Boké", "Mamou", "Siguiri", "Kissidougou", "Macenta"],
        GuineaBissau: ["Bissau", "Bafatá", "Gabu", "Bissorã", "Bolama", "Cacheu", "Catio", "Buba", "Mansôa", "Bubaque"],
        IvoryCoast: ["Abidjan", "Bouaké", "Daloa", "Yamoussoukro", "San Pedro", "Korhogo", "Man", "Divo", "Gagnoa", "Abengourou"],
        Kenya: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale", "Garissa", "Kakamega"],
        Lesotho: ["Maseru", "Teyateyaneng", "Maputsoe", "Mafeteng", "Hlotse", "Quthing", "Qachas Nek", "Mohales Hoek", "Butha-Buthe", "Thaba-Tseka"],
        Liberia: ["Monrovia", "Gbarnga", "Kakata", "Buchanan", "Zwedru", "Harper", "Voinjama", "Tubmanburg", "Robertsport", "Sanniquellie"],
        Libya: ["Tripoli", "Benghazi", "Misrata", "Tarhuna", "Zawiya", "Ajdabiya", "Sabha", "Derna", "Tobruk", "Sirte"],
        Madagascar: ["Antananarivo", "Toamasina", "Antsirabe", "Fianarantsoa", "Mahajanga", "Toliara", "Antsiranana", "Ambovombe", "Ambatondrazaka", "Manakara"],
        Malawi: ["Lilongwe", "Blantyre", "Mzuzu", "Zomba", "Kasungu", "Mangochi", "Karonga", "Salima", "Nkhotakota", "Rumphi"],
        Mali: ["Bamako", "Sikasso", "Mopti", "Koutiala", "Kayes", "Ségou", "Gao", "Tombouctou", "San", "Kati"],
        Mauritania: ["Nouakchott", "Nouadhibou", "Kiffa", "Zouérat", "Rosso", "Atar", "Tidjikja", "Kaédi", "Sélibaby", "Boutilimit"],
        Mauritius: ["Port Louis", "Beau Bassin-Rose Hill", "Vacoas-Phoenix", "Curepipe", "Quatre Bornes", "Triolet", "Goodlands", "Centre de Flacq", "Bel Air", "Mahebourg"],
        Morocco: ["Casablanca", "Rabat", "Fes", "Marrakesh", "Tangier", "Agadir", "Meknes", "Oujda", "Kenitra", "Tetouan"],
        Mozambique: ["Maputo", "Matola", "Beira", "Nampula", "Chimoio", "Quelimane", "Tete", "Xai-Xai", "Nacala", "Pemba"],
        Namibia: ["Windhoek", "Rundu", "Walvis Bay", "Oshakati", "Swakopmund", "Katima Mulilo", "Grootfontein", "Rehoboth", "Otjiwarongo", "Okahandja"],
        Niger: ["Niamey", "Zinder", "Maradi", "Agadez", "Tahoua", "Dosso", "Diffa", "Arlit", "Tillabéri", "Birnin Konni"],
        Nigeria: ["Lagos", "Kano", "Ibadan", "Abuja", "Port Harcourt", "Benin City", "Maiduguri", "Zaria", "Aba", "Jos"],
        Rwanda: ["Kigali", "Butare", "Gitarama", "Ruhengeri", "Gisenyi", "Byumba", "Cyangugu", "Kibuye", "Kibungo", "Nyanza"],
        SãoToméandPríncipe: ["São Tomé", "Neves", "Santana", "Trindade", "Guadalupe", "Santo António", "Santa Cruz", "Ribeira Afonso", "Porto Alegre", "Pantufo"],
        Senegal: ["Dakar", "Touba", "Thiès", "Kaolack", "Ziguinchor", "Saint-Louis", "Diourbel", "Louga", "Tambacounda", "Kolda"],
        Seychelles: ["Victoria", "Anse Boileau", "Beau Vallon", "Anse Royale", "Takamaka", "Cascade", "Bel Ombre", "Glacis", "Baie Lazare", "Grand Anse"],
        SierraLeone: ["Freetown", "Bo", "Kenema", "Makeni", "Koidu", "Lunsar", "Port Loko", "Waterloo", "Kabala", "Kailahun"],
        Somalia: ["Mogadishu", "Hargeisa", "Bosaso", "Galkayo", "Kismayo", "Baidoa", "Burao", "Borama", "Beledweyne", "Jowhar"],
        SouthAfrica: ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein", "Pietermaritzburg", "East London", "Kimberley", "Polokwane"],
        SouthSudan: ["Juba", "Wau", "Malakal", "Yambio", "Rumbek", "Aweil", "Bor", "Torit", "Bentiu", "Maridi"],
        Sudan: ["Khartoum", "Omdurman", "Port Sudan", "Kassala", "Nyala", "Al-Ubayyid", "Kosti", "Wad Madani", "Atbara", "El Fasher"],
        Tanzania: ["Dodoma", "Dar es Salaam", "Mwanza", "Arusha", "Mbeya", "Morogoro", "Tanga", "Kahama", "Tabora", "Zanzibar City"],
        Togo: ["Lomé", "Sokodé", "Kara", "Kpalimé", "Atakpamé", "Bassar", "Tsévié", "Aného", "Dapaong", "Mango"],
        Tunisia: ["Tunis", "Sfax", "Sousse", "Ettadhamen", "Kairouan", "Gabès", "Bizerte", "Ariana", "Gafsa", "Monastir"],
        Uganda: ["Kampala", "Gulu", "Lira", "Mbarara", "Jinja", "Mbale", "Entebbe", "Masaka", "Arua", "Fort Portal"],
        Zambia: ["Lusaka", "Kitwe", "Ndola", "Kabwe", "Chingola", "Mufulira", "Luanshya", "Livingstone", "Kasama", "Chipata"],
        Zimbabwe: ["Harare", "Bulawayo", "Chitungwiza", "Mutare", "Gweru", "Kwekwe", "Kadoma", "Masvingo", "Chinhoyi", "Marondera"]
    },

    asia: {
        Afghanistan: ["Kabul", "Kandahar", "Herat", "Mazar-i-Sharif", "Jalalabad", "Kunduz", "Lashkar Gah", "Taloqan", "Puli Khumri", "Charikar"],
        Armenia: ["Yerevan", "Gyumri", "Vanadzor", "Vagharshapat", "Hrazdan", "Abovyan", "Kapan", "Armavir", "Artashat", "Gavarr"],
        Azerbaijan: ["Baku", "Ganja", "Sumqayit", "Mingachevir", "Lankaran", "Shirvan", "Nakhchivan", "Shaki", "Yevlakh", "Khachmaz"],
        Bahrain: ["Manama", "Riffa", "Muharraq", "Hamad Town", "Isa Town", "Sitra", "Budaiya", "Aali", "Hamala", "Saar"],
        Bangladesh: ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Barisal", "Brahmanbaria", "Narayanganj", "Comilla", "Netrakona"],
        Bhutan: ["Thimphu", "Phuntsholing", "Punakha", "Samdrup Jongkhar", "Gelephu", "Paro", "Trongsa", "Jakar", "Trashigang", "Mongar"],
        Brunei: ["Bandar Seri Begawan", "Kuala Belait", "Seria", "Tutong", "Bangar", "Sukang", "Labu", "Telisai", "Kiarong", "Pekan Muara"],
        Cambodia: ["Phnom Penh", "Siem Reap", "Battambang", "Sihanoukville", "Poipet", "Kampong Cham", "Ta Khmau", "Kampot", "Kratie", "Pursat"],
        China: ["Shanghai", "Beijing", "Guangzhou", "Shenzhen", "Chengdu", "Tianjin", "Wuhan", "Dongguan", "Chongqing", "Nanjing"],
        Cyprus: ["Nicosia", "Limassol", "Larnaca", "Famagusta", "Paphos", "Kyrenia", "Paralimni", "Dali", "Morphou", "Lefka"],
        Georgia: ["Tbilisi", "Kutaisi", "Batumi", "Rustavi", "Zugdidi", "Gori", "Poti", "Samtredia", "Kobuleti", "Telavi"],
        India: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Surat"],
        Indonesia: ["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang", "Makassar", "Palembang", "Tangerang", "Depok", "Yogyakarta"],
        Iran: ["Tehran", "Mashhad", "Isfahan", "Karaj", "Tabriz", "Shiraz", "Qom", "Ahvaz", "Kermanshah", "Rasht"],
        Iraq: ["Baghdad", "Basra", "Karbala", "Najaf", "Amarah"],
        Israel: ["Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya", "Beersheba", "Holon", "Bnei Brak"],
        Japan: ["Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kyoto", "Kawasaki", "Saitama"],
        Jordan: ["Amman", "Zarqa", "Irbid", "Russeifa", "Aqaba", "Madaba", "Mafraq", "Karak", "Jerash", "Ajloun"],
        Kazakhstan: ["Almaty", "Astana", "Shymkent", "Karaganda", "Aktobe", "Taraz", "Pavlodar", "Oskemen", "Semey", "Kostanay"],
        Kurdistan: ["Mosul", "Erbil", "Sulaymaniyah", "Kirkuk", "Nasiriyah", "Duhok", "Halabja", "Zakho", "Akre", "Chamchamal"],
        Kuwait: ["Kuwait City", "Al Ahmadi", "Hawalli", "Al Jahra", "Salmiya", "Farwaniya", "Mangaf", "Fahaheel", "Rumaithiya", "Khaitan"],
        Kyrgyzstan: ["Bishkek", "Osh", "Jalal-Abad", "Karakol", "Tokmok", "Uzgen", "Naryn", "Batken", "Talas", "Kyzyl-Kiya"],
        Laos: ["Vientiane", "Pakse", "Savannakhet", "Luang Prabang", "Xam Neua", "Phonsavan", "Thakhek", "Muang Xay", "Vang Vieng", "Attapeu"],
        Lebanon: ["Beirut", "Tripoli", "Sidon", "Tyre", "Zahle", "Baabda", "Jounieh", "Aley", "Byblos", "Nabatieh"],
        Malaysia: ["Kuala Lumpur", "George Town", "Johor Bahru", "Kota Kinabalu", "Kuching", "Shah Alam", "Ipoh", "Malacca City", "Alor Setar", "Miri"],
        Maldives: ["Malé", "Addu City", "Fuvahmulah", "Kulhudhuffushi", "Thinadhoo", "Naifaru", "Dhidhdhoo", "Eydhafushi", "Fonadhoo", "Mahibadhoo"],
        Mongolia: ["Ulaanbaatar", "Erdenet", "Darkhan", "Choibalsan", "Mörön", "Nalaikh", "Zuunmod", "Bayankhongor", "Arvaikheer", "Dalanzadgad"],
        Myanmar: ["Yangon", "Mandalay", "Naypyidaw", "Bago", "Pathein", "Monywa", "Sittwe", "Mawlamyine", "Taunggyi", "Pyay"],
        Nepal: ["Kathmandu", "Pokhara", "Lalitpur", "Biratnagar", "Birgunj", "Bharatpur", "Dharan", "Butwal", "Hetauda", "Janakpur"],
        NorthKorea: ["Pyongyang", "Hamhung", "Chongjin", "Nampo", "Wonsan", "Sinuiju", "Tanchon", "Kaesong", "Rason", "Haeju"],
        Oman: ["Muscat", "Seeb", "Salalah", "Bawshar", "Sohar", "Nizwa", "Rustaq", "Ibri", "Sur", "Buraimi"],
        Pakistan: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Rawalpindi", "Multan", "Hyderabad", "Gujranwala", "Peshawar", "Quetta"],
        Palestine: ["Gaza City", "Hebron", "Nablus", "Jenin", "Ramallah", "Bethlehem", "Tulkarm", "Qalqilya", "Khan Yunis", "Rafah"],
        Philippines: ["Manila", "Quezon City", "Cebu City", "Davao City", "Zamboanga City", "Taguig", "Pasig", "Antipolo", "Caloocan", "Iloilo City"],
        Qatar: ["Doha", "Al Rayyan", "Al Khor", "Al Wakrah", "Umm Salal", "Al Mansurah", "Madinat Khalifah", "An Najmah", "As Sadd", "Farij al Amir"],
        SaudiArabia: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Taif", "Al Ahsa", "Buraidah", "Khobar", "Tabuk"],
        Singapore: ["Singapore"],
        SouthKorea: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Suwon", "Ulsan", "Changwon", "Goyang"],
        SriLanka: ["Colombo", "Kandy", "Galle", "Jaffna", "Negombo", "Anuradhapura", "Ratnapura", "Trincomalee", "Batticaloa", "Matara"],
        Syria: ["Damascus", "Aleppo", "Homs", "Latakia", "Hama", "Deir ez-Zor", "Raqqa", "Al-Hasakah", "Tartus", "Douma"],
        Taiwan: ["Taipei", "Kaohsiung", "Taichung", "Tainan", "Hsinchu", "Keelung", "Chiayi", "Changhua", "Pingtung", "Yilan"],
        Tajikistan: ["Dushanbe", "Khujand", "Bokhtar", "Kulob", "Istaravshan", "Konibodom", "Isfara", "Tursunzoda", "Panjakent", "Vahdat"],
        Thailand: ["Bangkok", "Nonthaburi", "Nakhon Ratchasima", "Chiang Mai", "Hat Yai", "Udon Thani", "Pak Kret", "Pattaya", "Khon Kaen", "Surat Thani"],
        TimorLeste: ["Dili", "Baucau", "Maliana", "Suai", "Liquica", "Aileu", "Lospalos", "Ermera", "Viqueque", "Same"],
        Turkmenistan: ["Ashgabat", "Türkmenabat", "Dashoguz", "Mary", "Balkanabat", "Tejen", "Bayramaly", "Serdar", "Turkmenbashi", "Gumdag"],
        UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Al Ain", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm al Quwain", "Khor Fakkan", "Dibba Al-Fujairah"],
        Uzbekistan: ["Tashkent", "Namangan", "Samarkand", "Andijan", "Bukhara", "Nukus", "Fergana", "Kokand", "Khoresm", "Jizzakh"],
        Vietnam: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Haiphong", "Can Tho", "Bien Hoa", "Hue", "Nha Trang", "Vung Tau", "Quy Nhon"],
        Yemen: ["Sanaa", "Aden", "Taiz", "Hodeidah", "Ibb", "Dhamar", "Mukalla", "Sayun", "Zinjibar", "Al Bayda"]
    },

    europe: {
        Albania: ["Tirana", "Durrës", "Vlorë", "Shkodër", "Fier", "Elbasan", "Korçë", "Berat", "Lushnjë", "Kavajë"],
        Andorra: ["Andorra la Vella", "Escaldes-Engordany", "Encamp", "Sant Julià de Lòria", "La Massana", "Ordino", "Canillo", "El Tarter", "Arinsal", "Soldeu"],
        Austria: ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt", "Villach", "Wels", "St. Pölten", "Bregenz"],
        Belarus: ["Minsk", "Gomel", "Mogilev", "Vitebsk", "Hrodna", "Brest", "Babruysk", "Baranovichi", "Pinsk", "Orsha"],
        Belgium: ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liège", "Bruges", "Namur", "Leuven", "Mons", "Mechelen"],
        BosniaAndHerzegovina: ["Sarajevo", "Banja Luka", "Tuzla", "Zenica", "Mostar", "Bijeljina", "Prijedor", "Doboj", "Brčko", "Trebinje"],
        Bulgaria: ["Sofia", "Plovdiv", "Varna", "Burgas", "Ruse", "Stara Zagora", "Pleven", "Sliven", "Dobrich", "Shumen"],
        Croatia: ["Zagreb", "Split", "Rijeka", "Osijek", "Zadar", "Pula", "Slavonski Brod", "Karlovac", "Varaždin", "Šibenik"],
        Czechia: ["Prague", "Brno", "Ostrava", "Plzeň", "Liberec", "Olomouc", "Ústí nad Labem", "Hradec Králové", "Zlín", "Jihlava"],
        Cyprus: ["Nicosia", "Limassol", "Larnaca", "Famagusta", "Paphos", "Kyrenia", "Morphou", "Paralimni", "Deryneia", "Protaras"],
        Denmark: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg", "Randers", "Kolding", "Horsens", "Vejle", "Silkeborg"],
        Estonia: ["Tallinn", "Tartu", "Narva", "Pärnu", "Kohtla-Järve", "Viljandi", "Rakvere", "Maardu", "Sillamäe", "Kuressaare"],
        Finland: ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu", "Lahti", "Kuopio", "Jyväskylä", "Rovaniemi", "Porvoo"],
        France: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"],
        Georgia: ["Tbilisi", "Kutaisi", "Batumi", "Rustavi", "Zugdidi", "Gori", "Poti", "Samtredia", "Kobuleti", "Telavi"],
        Germany: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf", "Leipzig", "Dortmund", "Essen"],
        Greece: ["Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa", "Volos", "Ioannina", "Chania", "Rhodes", "Kavala"],
        Hungary: ["Budapest", "Debrecen", "Szeged", "Miskolc", "Pécs", "Győr", "Nyíregyháza", "Kecskemét", "Székesfehérvár", "Szombathely"],
        Iceland: ["Reykjavík", "Kópavogur", "Hafnarfjörður", "Akureyri", "Reykjanesbær", "Garðabær", "Mosfellsbær", "Árborg", "Akranes", "Fjarðabyggð"],
        Ireland: ["Dublin", "Cork", "Limerick", "Galway", "Waterford", "Kilkenny", "Sligo", "Drogheda", "Tralee", "Naas"],
        Israel: ["Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya", "Beer Sheva", "Holon", "Bnei Brak"],
        Italy: ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", "Bari", "Venice"],
        Kosovo: ["Pristina", "Prizren", "Pejë", "Gjakova", "Mitrovica", "Ferizaj", "Gjilan", "Vushtrri", "Podujevo", "Suhareka"],
        Latvia: ["Riga", "Daugavpils", "Liepāja", "Jelgava", "Jūrmala", "Ventspils", "Rēzekne", "Valmiera", "Ogre", "Salaspils"],
        Liechtenstein: ["Vaduz", "Schaan", "Balzers", "Triesen", "Eschen", "Mauren", "Ruggell", "Gamprin", "Planken", "Triesenberg"],
        Lithuania: ["Vilnius", "Kaunas", "Klaipėda", "Šiauliai", "Panevėžys", "Alytus", "Marijampolė", "Mažeikiai", "Jonava", "Utena"],
        Luxembourg: ["Luxembourg City", "Esch-sur-Alzette", "Differdange", "Dudelange", "Ettelbruck", "Diekirch", "Wiltz", "Grevenmacher", "Remich", "Bertrange"],
        Malta: ["Valletta", "Birkirkara", "Mdina", "Sliema", "St Julians", "Marsaxlokk", "Zabbar", "Rabat", "Mosta", "Qormi"],
        Moldova: ["Chișinău", "Tiraspol", "Bălți", "Cahul", "Ungheni", "Rîbnița", "Orhei", "Edineț", "Hîncești", "Cimișlia"],
        Monaco: ["Monaco", "Monte-Carlo", "Fontvieille", "La Condamine", "Jardin Exotique", "Larvotto", "Moneghetti", "Port Hercule", "La Rocade", "Saint-Michel"],
        Montenegro: ["Podgorica", "Nikšić", "Herceg Novi", "Pljevlja", "Bijelo Polje", "Bar", "Cetinje", "Berane", "Ulcinj", "Tivat"],
        Netherlands: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Tilburg", "Groningen", "Almere", "Breda", "Nijmegen"],
        NorthMacedonia: ["Skopje", "Bitola", "Kumanovo", "Prilep", "Tetovo", "Veles", "Ohrid", "Štip", "Gostivar", "Strumica"],
        Norway: ["Oslo", "Bergen", "Stavanger", "Trondheim", "Drammen", "Fredrikstad", "Porsgrunn", "Bodø", "Sandnes", "Skien"],
        Poland: ["Warsaw", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk", "Szczecin", "Bydgoszcz", "Lublin", "Katowice"],
        Portugal: ["Lisbon", "Porto", "Amadora", "Braga", "Coimbra", "Setúbal", "Aveiro", "Funchal", "Leiria", "Évora"],
        Romania: ["Bucharest", "Cluj-Napoca", "Timișoara", "Iași", "Constanța", "Craiova", "Brașov", "Galați", "Ploiești", "Oradea"],
        SanMarino: ["San Marino", "Serravalle", "Borgo Maggiore", "Domagnano", "Faetano", "Monte Giardino", "Acquaviva", "Chiesanuova", "Fiorentino"],
        Serbia: ["Belgrade", "Novi Sad", "Niš", "Kragujevac", "Subotica", "Zrenjanin", "Pančevo", "Čačak", "Novi Pazar", "Smederevo"],
        Slovakia: ["Bratislava", "Košice", "Prešov", "Žilina", "Nitra", "Trnava", "Banská Bystrica", "Poprad", "Martin", "Zvolen"],
        Slovenia: ["Ljubljana", "Maribor", "Celje", "Kranj", "Velenje", "Koper", "Novo Mesto", "Ptuj", "Trbovlje", "Murska Sobota"],
        Spain: ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga", "Murcia", "Palma", "Las Palmas", "Bilbao"],
        Sweden: ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås", "Linköping", "Örebro", "Helsingborg", "Norrköping", "Lund"],
        Switzerland: ["Zurich", "Geneva", "Basel", "Bern", "Lausanne", "Lucerne", "St. Gallen", "Lugano", "La Chaux-de-Fonds", "Biel/Bienne"],
        Turkiye: ["Istanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Gaziantep", "Konya", "Mersin", "Diyarbakir"],
        UK: ["London", "Birmingham", "Manchester", "Glasgow", "Liverpool", "Bristol", "Leeds", "Edinburgh", "Sheffield", "Newcastle"],
        Ukraine: ["Kyiv", "Kharkiv", "Odesa", "Dnipro", "Lviv", "Zaporizhzhia", "Kryvyi Rih", "Mykolaiv", "Mariupol", "Vinnytsia"],
        VaticanCity: ["Vatican City"]
    },

    north_america: {
        AntiguaAndBarbuda: ["St. John's", "All Saints", "Liberta", "Bolans", "Potters Village", "Parham", "Piggotts", "Codrington", "Old Road", "Jennings"],
        Bahamas: ["Nassau", "Freeport", "West End", "Coopers Town", "Marsh Harbour", "Freetown", "George Town", "High Rock", "Arthur's Town", "Clarence Town"],
        Barbados: ["Bridgetown", "Speightstown", "Oistins", "Bathsheba", "Crane", "Holetown", "Bulkeley", "Four Roads", "Hillaby", "Greenland"],
        Belize: ["Belize City", "San Ignacio", "Orange Walk Town", "Belmopan", "Dangriga", "Corozal Town", "Punta Gorda", "Benque Viejo del Carmen", "San Pedro", "Ladyville"],
        Canada: ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Halifax"],
        CostaRica: ["San José", "Alajuela", "Cartago", "Heredia", "Liberia", "Puntarenas", "San Ramón", "Escazú", "Curridabat", "Tibás"],
        Cuba: ["Havana", "Santiago de Cuba", "Camagüey", "Holguín", "Guantánamo", "Santa Clara", "Las Tunas", "Bayamo", "Cienfuegos", "Pinar del Río"],
        DominicanRepublic: ["Santo Domingo", "Santiago de los Caballeros", "La Romana", "San Pedro de Macorís", "San Cristóbal", "Puerto Plata", "La Vega", "Higüey", "Moca", "Bonao"],
        ElSalvador: ["San Salvador", "Santa Ana", "San Miguel", "Soyapango", "Mejicanos", "Santa Tecla", "Apopa", "Delgado", "Ahuachapán", "Ilopango"],
        Greenland: ["Nuuk", "Sisimiut", "Ilulissat", "Qaqortoq", "Aasiaat", "Maniitsoq", "Tasiilaq", "Paamiut", "Narsaq", "Uummannaq"],
        Guatemala: ["Guatemala City", "Mixco", "Villa Nueva", "Quetzaltenango", "San Miguel Petapa", "Escuintla", "Mazatenango", "Chimaltenango", "Sololá", "Retalhuleu"],
        Haiti: ["Port-au-Prince", "Carrefour", "Delmas", "Pétion-Ville", "Cap-Haïtien", "Gonaïves", "Saint-Marc", "Les Cayes", "Jacmel", "Port-de-Paix"],
        Honduras: ["Tegucigalpa", "San Pedro Sula", "Choloma", "La Ceiba", "El Progreso", "Comayagua", "Puerto Cortés", "Danlí", "La Lima", "Juticalpa"],
        Jamaica: ["Kingston", "Spanish Town", "Montego Bay", "Portmore", "Mandeville", "May Pen", "Old Harbour", "Savanna-la-Mar", "Ocho Rios", "Linstead"],
        Mexico: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "Ciudad Juárez", "León", "Zapopan", "Mérida", "Querétaro"],
        Nicaragua: ["Managua", "León", "Masaya", "Chinandega", "Matagalpa", "Estelí", "Granada", "Juigalpa", "Jinotega", "Bluefields"],
        Panama: ["Panama City", "San Miguelito", "David", "Colón", "La Chorrera", "Santiago de Veraguas", "Chitré", "Penonomé", "Las Tablas", "Bocas del Toro"],
        USA: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
            "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
            "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
            "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
            "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
            "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Washington D.C."]
    },
    south_america: {
        Argentina: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata", "San Miguel de Tucumán", "Mar del Plata", "Salta", "Santa Fe", "San Juan"],
        Bolivia: ["Sucre", "La Paz", "Santa Cruz de la Sierra", "Cochabamba", "Oruro", "Potosí", "Tarija", "El Alto", "Trinidad", "Cobija"],
        Brazil: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre"],
        Chile: ["Santiago", "Valparaíso", "Concepción", "La Serena", "Antofagasta", "Temuco", "Rancagua", "Talca", "Arica", "Chillán"],
        Colombia: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Cúcuta", "Bucaramanga", "Pereira", "Santa Marta", "Villavicencio"],
        Ecuador: ["Quito", "Guayaquil", "Cuenca", "Machala", "Manta", "Durán", "Ambato", "Esmeraldas", "Loja", "Santo Domingo"],
        Guyana: ["Georgetown", "Linden", "New Amsterdam", "Bartica", "Skeldon", "Rosignol", "Anna Regina", "Vreed-en-Hoop", "Mahaica", "Fort Wellington"],
        Paraguay: ["Asunción", "Ciudad del Este", "San Lorenzo", "Luque", "Capiatá", "Encarnación", "Fernando de la Mora", "Limpio", "Ñemby", "Pedro Juan Caballero"],
        Peru: ["Lima", "Arequipa", "Trujillo", "Chiclayo", "Piura", "Iquitos", "Cusco", "Huancayo", "Tacna", "Ica"],
        Suriname: ["Paramaribo", "Lelydorp", "Nieuw Nickerie", "Moengo", "Meerzorg", "Nieuw Amsterdam", "Albina", "Groningen", "Totness", "Brokopondo"],
        Uruguay: ["Montevideo", "Salto", "Paysandú", "Las Piedras", "Rivera", "Maldonado", "Tacuarembó", "Melo", "Mercedes", "Artigas"],
        Venezuela: ["Caracas", "Maracaibo", "Valencia", "Barquisimeto", "Ciudad Guayana", "Maturín", "Puerto La Cruz", "San Cristóbal", "La Guaira", "Barinas"]
    },
    australia: {
        Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Newcastle", "Wollongong", "Logan City"],
        Fiji: ["Suva", "Nadi", "Lautoka", "Labasa", "Ba", "Sigatoka", "Levuka", "Savusavu", "Dreketi", "Taveuni"],
        New_Zealand: ["Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga", "Napier-Hastings", "Dunedin", "Palmerston North", "Nelson", "Rotorua"],
        Papua_New_Guinea: ["Port Moresby", "Lae", "Mount Hagen", "Madang", "Goroka", "Kokopo", "Kimbe", "Bulolo", "Rabaul", "Popondetta"],
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

document.addEventListener('DOMContentLoaded', function() {
    const eventTable = document.getElementById('eventTable');
    const filterCategory = document.getElementById('filterCategory');
    
    // Initialize the filter on page load
    setupCategoryFilter();
    
    // Apply initial filter (show all events)
    filterEventsByCategory('all');

    // Category filter function
    function filterEventsByCategory(category) {
        const rows = eventTable.querySelectorAll('tbody tr');
        const normalizedCategory = category.trim().toLowerCase().replace(/[_\s]+/g, '-');
        
        console.clear();
        console.log('🔍 Filter triggered for:', normalizedCategory);
        console.log('Rows found:', rows.length);
        
        let visibleCount = 0;
        
        rows.forEach((row, index) => {
            const catCell = row.querySelector('td:nth-child(8)'); // Category is in the 8th column
            if (!catCell) {
                console.warn(`Row ${index + 1} has no category cell.`);
                row.style.display = 'none';
                return;
            }
            
            const cellText = catCell.textContent.trim().toLowerCase().replace(/[_\s]+/g, '-');
            console.log(`Row ${index + 1} category: "${cellText}"`);
            
            const isMatch = normalizedCategory === 'all' || cellText === normalizedCategory;
            row.style.display = isMatch ? '' : 'none';
            
            if (isMatch) visibleCount++;
            console.log(`Row ${index + 1} match: ${isMatch}`);
        });
        
        console.log(`📊 ${visibleCount} events match the filter`);
        
        // Optional: Update a counter display if you want to show results count
        updateResultsCounter(visibleCount, rows.length);
    }

    // Setup category filter
    function setupCategoryFilter() {
        if (!filterCategory) return;

        // Listen for category changes - auto-filter on selection
        filterCategory.addEventListener('change', function() {
            filterEventsByCategory(this.value);
        });
        
        // Optional: Also filter on input for better UX
        filterCategory.addEventListener('input', function() {
            filterEventsByCategory(this.value);
        });
    }

});

// Optional: Add this CSS to your styles for better visual feedback
const dynamicFilterStyles = `
    #filterCategory {
        transition: all 0.3s ease;
    }
    
    #filterCategory:focus {
        box-shadow: 0 0 0 3px rgba(138, 23, 184, 0.3);
        border-color: #8a17b8;
    }
    
    .table-responsive tr {
        transition: all 0.3s ease;
    }
    
    .table-responsive tr[style*="display: none"] {
        opacity: 0;
        transform: translateX(-10px);
    }
`;

// Inject the styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicFilterStyles;
document.head.appendChild(styleSheet);

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

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const searchButton = document.getElementById('searchButton');
    const eventTable = document.getElementById('eventTable');

    // Navbar toggle for mobile
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) navLinks.classList.remove('open');
        });
    });
});
