export type CharismaCategory =
  | "leaders"
  | "activists"
  | "thinkers"
  | "artists"
  | "athletes";

export type CharismaticPerson = {
  id: string;
  name: string;
  wiki: string;
  birth: string;
  place: string;
  category: CharismaCategory;
  wall: "left" | "right";
};

const slug = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const raw: Array<[string, string, string, string, CharismaCategory]> = [
  ["Alexandre le Grand", "Alexander the Great", "356 av. J.-C.", "Pella, royaume de Macédoine", "leaders"],
  ["Jules César", "Julius Caesar", "100 av. J.-C.", "Rome, République romaine", "leaders"],
  ["Cléopâtre VII", "Cleopatra", "vers 69 av. J.-C.", "Alexandrie, royaume ptolémaïque d’Égypte", "leaders"],
  ["Napoléon Bonaparte", "Napoleon", "1769-08-15", "Ajaccio, Corse, France", "leaders"],
  ["Winston Churchill", "Winston Churchill", "1874-11-30", "Palais de Blenheim, Angleterre", "leaders"],
  ["Abraham Lincoln", "Abraham Lincoln", "1809-02-12", "Sinking Spring Farm, Kentucky, États-Unis", "leaders"],
  ["Charles de Gaulle", "Charles de Gaulle", "1890-11-22", "Lille, France", "leaders"],
  ["John F. Kennedy", "John F. Kennedy", "1917-05-29", "Brookline, Massachusetts, États-Unis", "leaders"],
  ["Barack Obama", "Barack Obama", "1961-08-04", "Honolulu, Hawaï, États-Unis", "leaders"],
  ["Nelson Mandela", "Nelson Mandela", "1918-07-18", "Mvezo, Afrique du Sud", "leaders"],
  ["Mustafa Kemal Atatürk", "Mustafa Kemal Atatürk", "1881", "Salonique, Empire ottoman", "leaders"],
  ["Franklin D. Roosevelt", "Franklin D. Roosevelt", "1882-01-30", "Hyde Park, New York, États-Unis", "leaders"],
  ["Simón Bolívar", "Simón Bolívar", "1783-07-24", "Caracas, Capitainerie générale du Venezuela", "leaders"],
  ["Élisabeth Ire", "Elizabeth I", "1533-09-07", "Greenwich, Angleterre", "leaders"],
  ["Eva Perón", "Eva Perón", "1919-05-07", "Los Toldos, Argentine", "leaders"],
  ["Fidel Castro", "Fidel Castro", "1926-08-13", "Birán, Cuba", "leaders"],
  ["Richard Cœur de Lion", "Richard I of England", "1157-09-08", "Oxford, Angleterre", "leaders"],
  ["Margaret Thatcher", "Margaret Thatcher", "1925-10-13", "Grantham, Angleterre", "leaders"],
  ["Saladin", "Saladin", "vers 1137–1138", "Tikrit, califat abbasside", "leaders"],
  ["Marc Aurèle", "Marcus Aurelius", "121-04-26", "Rome, Empire romain", "leaders"],

  ["Jésus de Nazareth", "Jesus", "vers 6–4 av. J.-C.", "Bethléem, Judée, selon la tradition", "activists"],
  ["Mahomet", "Muhammad", "vers 570", "La Mecque, Arabie", "activists"],
  ["Bouddha (Siddhartha Gautama)", "Gautama Buddha", "vers le VIe–Ve siècle av. J.-C.", "Lumbini, selon la tradition", "activists"],
  ["Martin Luther King Jr.", "Martin Luther King Jr.", "1929-01-15", "Atlanta, Géorgie, États-Unis", "activists"],
  ["Mahatma Gandhi", "Mahatma Gandhi", "1869-10-02", "Porbandar, Inde britannique", "activists"],
  ["Jeanne d’Arc", "Joan of Arc", "vers 1412", "Domrémy, royaume de France", "activists"],
  ["Malcolm X", "Malcolm X", "1925-05-19", "Omaha, Nebraska, États-Unis", "activists"],
  ["Mère Teresa", "Mother Teresa", "1910-08-26", "Skopje, Empire ottoman", "activists"],
  ["Dalaï-Lama (Tenzin Gyatso)", "14th Dalai Lama", "1935-07-06", "Taktser, Tibet", "activists"],
  ["Che Guevara", "Che Guevara", "1928-06-14", "Rosario, Argentine", "activists"],
  ["Joan Baez", "Joan Baez", "1941-01-09", "Staten Island, New York, États-Unis", "activists"],
  ["Desmond Tutu", "Desmond Tutu", "1931-10-07", "Klerksdorp, Afrique du Sud", "activists"],
  ["Frantz Fanon", "Frantz Fanon", "1925-07-20", "Fort-de-France, Martinique, France", "activists"],
  ["Rosa Parks", "Rosa Parks", "1913-02-04", "Tuskegee, Alabama, États-Unis", "activists"],
  ["François d’Assise", "Francis of Assisi", "vers 1181–1182", "Assise, duché de Spolète", "activists"],
  ["Toussaint Louverture", "Toussaint Louverture", "vers 1743", "Habitation Bréda, Saint-Domingue", "activists"],
  ["Emmeline Pankhurst", "Emmeline Pankhurst", "1858-07-15", "Manchester, Angleterre", "activists"],
  ["Frederick Douglass", "Frederick Douglass", "vers février 1818", "comté de Talbot, Maryland, États-Unis", "activists"],
  ["Jean-Paul II", "Pope John Paul II", "1920-05-18", "Wadowice, Pologne", "activists"],
  ["Sitting Bull", "Sitting Bull", "vers 1831", "région de Grand River, territoire dakota", "activists"],

  ["Albert Einstein", "Albert Einstein", "1879-03-14", "Ulm, Empire allemand", "thinkers"],
  ["Socrate", "Socrates", "vers 470 av. J.-C.", "Athènes, Grèce antique", "thinkers"],
  ["Voltaire", "Voltaire", "1694-11-21", "Paris, France", "thinkers"],
  ["Oscar Wilde", "Oscar Wilde", "1854-10-16", "Dublin, Irlande", "thinkers"],
  ["Steve Jobs", "Steve Jobs", "1955-02-24", "San Francisco, Californie, États-Unis", "thinkers"],
  ["Carl Sagan", "Carl Sagan", "1934-11-09", "Brooklyn, New York, États-Unis", "thinkers"],
  ["Marie Curie", "Marie Curie", "1867-11-07", "Varsovie, royaume de Pologne", "thinkers"],
  ["Friedrich Nietzsche", "Friedrich Nietzsche", "1844-10-15", "Röcken, royaume de Prusse", "thinkers"],
  ["Léonard de Vinci", "Leonardo da Vinci", "1452-04-15", "Anchiano, près de Vinci, république de Florence", "thinkers"],
  ["Mark Twain", "Mark Twain", "1835-11-30", "Florida, Missouri, États-Unis", "thinkers"],
  ["Virginia Woolf", "Virginia Woolf", "1882-01-25", "Londres, Angleterre", "thinkers"],
  ["Richard Feynman", "Richard Feynman", "1918-05-11", "Queens, New York, États-Unis", "thinkers"],
  ["Simone de Beauvoir", "Simone de Beauvoir", "1908-01-09", "Paris, France", "thinkers"],
  ["James Baldwin", "James Baldwin", "1924-08-02", "Harlem, New York, États-Unis", "thinkers"],
  ["Stephen Hawking", "Stephen Hawking", "1942-01-08", "Oxford, Angleterre", "thinkers"],
  ["Jane Goodall", "Jane Goodall", "1934-04-03", "Londres, Angleterre", "thinkers"],
  ["Jean-Paul Sartre", "Jean-Paul Sartre", "1905-06-21", "Paris, France", "thinkers"],
  ["Maya Angelou", "Maya Angelou", "1928-04-04", "Saint-Louis, Missouri, États-Unis", "thinkers"],
  ["Galilée", "Galileo Galilei", "1564-02-15", "Pise, duché de Florence", "thinkers"],
  ["Sigmund Freud", "Sigmund Freud", "1856-05-06", "Freiberg en Moravie, Empire d’Autriche", "thinkers"],

  ["Marlon Brando", "Marlon Brando", "1924-04-03", "Omaha, Nebraska, États-Unis", "artists"],
  ["Marilyn Monroe", "Marilyn Monroe", "1926-06-01", "Los Angeles, Californie, États-Unis", "artists"],
  ["Elvis Presley", "Elvis Presley", "1935-01-08", "Tupelo, Mississippi, États-Unis", "artists"],
  ["David Bowie", "David Bowie", "1947-01-08", "Brixton, Londres, Angleterre", "artists"],
  ["Freddie Mercury", "Freddie Mercury", "1946-09-05", "Stone Town, Zanzibar", "artists"],
  ["Michael Jackson", "Michael Jackson", "1958-08-29", "Gary, Indiana, États-Unis", "artists"],
  ["Charlie Chaplin", "Charlie Chaplin", "1889-04-16", "Londres, Angleterre", "artists"],
  ["Audrey Hepburn", "Audrey Hepburn", "1929-05-04", "Ixelles, Belgique", "artists"],
  ["James Dean", "James Dean", "1931-02-08", "Marion, Indiana, États-Unis", "artists"],
  ["Maria Callas", "Maria Callas", "1923-12-02", "New York, États-Unis", "artists"],
  ["Al Pacino", "Al Pacino", "1940-04-25", "East Harlem, New York, États-Unis", "artists"],
  ["Clint Eastwood", "Clint Eastwood", "1930-05-31", "San Francisco, Californie, États-Unis", "artists"],
  ["Édith Piaf", "Édith Piaf", "1915-12-19", "Paris, France", "artists"],
  ["Bruce Lee", "Bruce Lee", "1940-11-27", "San Francisco, Californie, États-Unis", "artists"],
  ["Jimi Hendrix", "Jimi Hendrix", "1942-11-27", "Seattle, Washington, États-Unis", "artists"],
  ["Sophia Loren", "Sophia Loren", "1934-09-20", "Rome, Italie", "artists"],
  ["Robert De Niro", "Robert De Niro", "1943-08-17", "Manhattan, New York, États-Unis", "artists"],
  ["Bob Marley", "Bob Marley", "1945-02-06", "Nine Mile, Jamaïque", "artists"],
  ["Serge Gainsbourg", "Serge Gainsbourg", "1928-04-02", "Paris, France", "artists"],
  ["Paul Newman", "Paul Newman", "1925-01-26", "Shaker Heights, Ohio, États-Unis", "artists"],

  ["Muhammad Ali", "Muhammad Ali", "1942-01-17", "Louisville, Kentucky, États-Unis", "athletes"],
  ["Ayrton Senna", "Ayrton Senna", "1960-03-21", "São Paulo, Brésil", "athletes"],
  ["Pelé", "Pelé", "1940-10-23", "Três Corações, Brésil", "athletes"],
  ["Michael Jordan", "Michael Jordan", "1963-02-17", "Brooklyn, New York, États-Unis", "athletes"],
  ["Diego Maradona", "Diego Maradona", "1960-10-30", "Lanús, Argentine", "athletes"],
  ["Serena Williams", "Serena Williams", "1981-09-26", "Saginaw, Michigan, États-Unis", "athletes"],
  ["Usain Bolt", "Usain Bolt", "1986-08-21", "Sherwood Content, Jamaïque", "athletes"],
  ["Amelia Earhart", "Amelia Earhart", "1897-07-24", "Atchison, Kansas, États-Unis", "athletes"],
  ["Roger Federer", "Roger Federer", "1981-08-08", "Bâle, Suisse", "athletes"],
  ["Mike Tyson", "Mike Tyson", "1966-06-30", "Brooklyn, New York, États-Unis", "athletes"],
  ["Nadia Comăneci", "Nadia Comăneci", "1961-11-12", "Onești, Roumanie", "athletes"],
  ["Jack Dempsey", "Jack Dempsey", "1895-06-24", "Manassa, Colorado, États-Unis", "athletes"],
  ["Cristiano Ronaldo", "Cristiano Ronaldo", "1985-02-05", "Funchal, Madère, Portugal", "athletes"],
  ["Arnold Schwarzenegger", "Arnold Schwarzenegger", "1947-07-30", "Thal, Autriche", "athletes"],
  ["Billie Jean King", "Billie Jean King", "1943-11-22", "Long Beach, Californie, États-Unis", "athletes"],
  ["Jacques-Yves Cousteau", "Jacques Cousteau", "1910-06-11", "Saint-André-de-Cubzac, France", "athletes"],
  ["Tiger Woods", "Tiger Woods", "1975-12-30", "Cypress, Californie, États-Unis", "athletes"],
  ["Zinédine Zidane", "Zinedine Zidane", "1972-06-23", "Marseille, France", "athletes"],
  ["Bruce Springsteen", "Bruce Springsteen", "1949-09-23", "Long Branch, New Jersey, États-Unis", "athletes"],
  ["Simone Biles", "Simone Biles", "1997-03-14", "Columbus, Ohio, États-Unis", "athletes"],
];

export const charismaticPeople: CharismaticPerson[] = raw.map(
  ([name, wiki, birth, place, category], index) => ({
    id: slug(name),
    name,
    wiki,
    birth,
    place,
    category,
    wall: index % 2 === 0 ? "left" : "right",
  }),
);
