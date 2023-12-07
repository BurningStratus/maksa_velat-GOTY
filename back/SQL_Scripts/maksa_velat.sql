CREATE DATABASE maksa_velat;

USE maksa_velat;

CREATE TABLE event
(
  id INT NOT NULL,
  event_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE airport
(
  airport_name VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  icao VARCHAR(255) NOT NULL,
  latitude_deg DECIMAL(10, 6) NOT NULL,
  longitude_deg DECIMAL(10, 6) NOT NULL,
  blackjack INT NOT NULL,
  event_id INT NOT NULL,
  PRIMARY KEY (icao),
  FOREIGN KEY (event_id) REFERENCES event(id)
);

CREATE TABLE game
(
  id INT NOT NULL AUTO_INCREMENT,
  screen_name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  money INT NOT NULL,
  debt INT NOT NULL,
  calendar VARCHAR(10),
  PRIMARY KEY (id),
  FOREIGN KEY (location) REFERENCES airport(icao)
);

INSERT INTO event VALUES(0,"Nothing"),(1,"Monaco"),(2,"Berlin"),(3,"Warsaw"),(4,"Vatican City"),(5,"Dublin"),
                        (6,"Madrid"),(7,"Oslo"),(8,"Bucharest"),(11,"Black Cat"),(13,"Bandits");

INSERT INTO airport (airport_name, country, icao, latitude_deg, longitude_deg, blackjack, event_id) VALUES
  ("Amsterdam", "Holland", "AM", 52.3676, 4.9041, 1, 0),
  ("Athens", "Greece", "AT", 37.9838, 23.7275, 1, 0),
  ("Barcelona", "Spain", "BA", 41.3851, 2.1734, 1, 0),
  ("Bern", "Switzerland", "BE", 46.9480, 7.4474, 1, 0),
  ("Berlin", "Germany", "BR", 52.5200, 13.4050, 1, 2),
  ("Belgrad", "Serbia", "BG", 44.7866, 20.4489, 1, 0),
  ("Bratislava", "Slovakia", "BT", 48.1486, 17.1077, 1, 0),
  ("Bucharest", "Romania", "BC", 44.4268, 26.1025, 1, 0),
  ("Budapest", "Hungary", "BD", 47.4979, 19.0402, 1, 0),
  ("Brussels", "Belgium", "BU", 50.8503, 4.3517, 1, 0),
  ("Copenhagen", "Denmark", "CO", 55.6761, 12.5683, 1, 0),
  ("Dublin", "Ireland", "DU", 53.3498, -6.2603, 1, 5),
  ("Helsinki", "Finland", "HE", 60.1699, 24.9384, 1, 0),
  ("Istanbul", "Turkey", "IS", 41.0082, 28.9784, 1, 0),
  ("Kiev", "Ukraine", "KI", 50.4501, 30.5234, 1, 0),
  ("Lisbon", "Portugal", "LI", 38.7223, -9.1393, 1, 0),
  ("Ljubljana", "Slovenia", "LJ", 46.0569, 14.5058, 1, 0),
  ("London", "UK", "LO", 51.5074, -0.1278, 1, 0),
  ("Madrid", "Spain", "MD", 40.4168, -3.7038, 1, 6),
  ("Marseilles", "France", "MR", 43.2965, 5.3698, 1, 0),
  ("Monaco", "Monaco", "MO", 43.7384, 7.4246, 0, 1),
  ("Oslo", "Norway", "OS", 59.9139, 10.7522, 1, 7),
  ("Paris", "France", "PA", 48.8566, 2.3522, 1, 0),
  ("Prague", "Czech Republic", "PR", 50.0755, 14.4378, 1, 0),
  ("Riga", "Latvia", "RI", 56.9496, 24.1052, 1, 0),
  ("Rome", "Italy", "RO", 41.9028, 12.4964, 1, 0),
  ("Sarajevo", "Bosnia and Herzegovina", "SA", 43.8563, 18.4131, 1, 0),
  ("Stockholm", "Sweden", "ST", 59.3293, 18.0686, 1, 0),
  ("Tallinn", "Estonia", "TA", 59.4370, 24.7536, 1, 0),
  ("Vatican City", "Vatican", "VA", 41.9022, 12.4539, 0, 4),
  ("Vienna", "Austria", "VI", 48.2082, 16.3738, 1, 0),
  ("Warsaw", "Poland", "WA", 52.2297, 21.0122, 1, 3);
