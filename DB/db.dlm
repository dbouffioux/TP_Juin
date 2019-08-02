INSERT INTO person
	VALUES (DEFAULT, 'M�lissa', 'Schyns',
	LOWER(SUBSTRING('M�lissa' from 1 for 3) || SUBSTRING('Schyns' from 1 for 3) || 1), 'test123');
INSERT INTO person
	VALUES (DEFAULT, 'Jean', 'Leclercq',
	LOWER(SUBSTRING('Jean' from 1 for 3) || SUBSTRING('Leclercq' from 1 for 3) || 2), 'test123');
INSERT INTO person
	VALUES (DEFAULT, 'Yannick', 'Boogaerts',
	LOWER(SUBSTRING('Yannick' from 1 for 3) || SUBSTRING('Boogaerts' from 1 for 3) || 3), 'test123');
INSERT INTO person
	VALUES (DEFAULT, 'Roman', 'DelFavero',
	LOWER(SUBSTRING('Roman' from 1 for 3) || SUBSTRING('DelFavero' from 1 for 3) || 4), 'test123');
INSERT INTO person
	VALUES (DEFAULT, 'Louis', 'Hella',
	LOWER(SUBSTRING('Louis' from 1 for 3) || SUBSTRING('Hella' from 1 for 3) || 5), 'test123');
INSERT INTO person
	VALUES (DEFAULT, 'Damien', 'Bouffioux',
	LOWER(SUBSTRING('Damien' from 1 for 3) || SUBSTRING('Bouffioux' from 1 for 3) || 6), 'test123');
INSERT INTO person
	VALUES (DEFAULT, 'Salvatrice', 'Montalbano',
	LOWER(SUBSTRING('Salvatrice' from 1 for 3) || SUBSTRING('Montalbano' from 1 for 3) || 7), 'test123');
INSERT INTO person
	VALUES (DEFAULT, 'Delphine', 'Franquinet',
	LOWER(SUBSTRING('Delphine' from 1 for 3) || SUBSTRING('Franquinet' from 1 for 3) || 8), 'test123');
INSERT INTO person
	VALUES (DEFAULT, 'Maxime', 'Quoili',
	LOWER(SUBSTRING('Maxime' from 1 for 3) || SUBSTRING('Quoili' from 1 for 3) || 9), 'test123');
INSERT INTO person
	VALUES (DEFAULT, 'Philippe', 'Vancom',
	LOWER(SUBSTRING('Philippe' from 1 for 3) || SUBSTRING('Vancom' from 1 for 3) || 10), 'test123');
INSERT INTO person
	VALUES (DEFAULT, 'Romain', 'Celen',
	LOWER(SUBSTRING('Romain' from 1 for 3) || SUBSTRING('Celen' from 1 for 3) || 11), 'test123');
INSERT INTO person
	VALUES (DEFAULT, 'Thibault', 'Molle',
	LOWER(SUBSTRING('Thibault' from 1 for 3) || SUBSTRING('Molle' from 1 for 3) || 12), 'test123');
INSERT INTO person
	VALUES (DEFAULT, 'Zahraa', 'Obaed',
	LOWER(SUBSTRING('Zahraa' from 1 for 3) || SUBSTRING('Obaed' from 1 for 3) || 13), 'test123');



INSERT INTO event
	VALUES (DEFAULT, 'Francofolies', 3,
	'2019-08-03T18:30:00Z', '2019-08-03T23:30:00Z',);
INSERT INTO event
	VALUES (DEFAULT, 'Rock Wechter', 5,
	'2019-08-01T22:30:00Z', '2019-08-02T23:30:00Z',);
INSERT INTO event
	VALUES (DEFAULT, 'Tomorrow Land', 8,
	'2019-08-02T18:30:00Z', '2019-08-03T20:30:00Z',);



INSERT INTO activity
	VALUES (DEFAULT,
	'Pink',
	'2019-08-02T22:30:00Z', 
	'2019-08-02T23:30:00Z',
	2,
	'https://www.pinkspage.com/',
	'rock');

INSERT INTO activity
	VALUES (DEFAULT,
	'Bastille',
	'2019-08-01T22:30:00Z', 
	'2019-08-01T23:30:00Z',
	2,
	'https://www.bastillebastille.com/',
	'rock');
INSERT INTO activity
	VALUES (DEFAULT,
	'Ang�le',
	'2019-08-03T22:00:00Z', 
	'2019-08-03T23:30:00Z',
	1,
	'https://angele.store/',
	'pop');
INSERT INTO activity
	VALUES (DEFAULT,
	'Stromae',
	'2019-08-03T18:30:00Z', 
	'2019-08-03T20:30:00Z',
	1,
	'https://www.facebook.com/stromae/',
	'pop/rap');
INSERT INTO activity
	VALUES (DEFAULT,
	'David Ghetta',
	'2019-08-03T18:30:00Z', 
	'2019-08-03T20:30:00Z',
	3,
	'https://www.davidguetta.com/',
	'electro');
INSERT INTO activity
	VALUES (DEFAULT,
	'Mortin Solveig',
	'2019-08-02T18:30:00Z', 
	'2019-08-02T20:30:00Z',
	3,
	'http://www.martinsolveig.com/',
	'electro');



INSERT INTO inscription
	VALUES (DEFAULT, 5,2);
INSERT INTO inscription
	VALUES (DEFAULT,5,3);
INSERT INTO inscription
	VALUES (DEFAULT,5,1);
INSERT INTO inscription
	VALUES (DEFAULT,9,1);
INSERT INTO inscription
	VALUES (DEFAULT,6,2);
INSERT INTO inscription
	VALUES (DEFAULT,2,3);
INSERT INTO inscription
	VALUES (DEFAULT,6,5);