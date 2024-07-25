## Online hotel booking application

This project is the creation of the students Stavropoulos Constantinos and Charalambopoulos Dimitrios of the Department of Electrical Engineering and Computer Technology of the University of Patras for the course "Web Programming" for the academic year 2023-24.

### Summary

The basic idea of ​​the project is the creation of an integrated website - database system that allows through the website the search for available dates, available rooms, general information about the hotel, as well as the creation of reservations. The objective of the application is to provide the customer a pleasant exprerience in creating a reservation and searching for information through the user-friendly environment of the website. Also very important is the improvement of the organization of the hotel data and the automation of the data entry into the database. At the same time, emphasis was placed on data protection and checks for incorrect data entry using appropriate restrictions. The presentation of the work was carried out through the public address [BayHotel](https://bayhotel.fly.dev), which was created using the [fly.io](https://fly.io) service.

### Installation instructions

Installing and running the application requires [Node.js](https://nodejs.org/en/download/package-manager) to be installed, specifically the latest LTS version. Then executing the commands `npm install` and `npm audit fix` in the terminal in the project folder in this order installs the necessary modules. Finally, to execute the code, it is sufficient to run the `node app.mjs` instruction, as the system sends a local page through which the website can be accessed.

Of course it is also necessary to install the database, which is not included ready as it is created in PostgreSQL, but it can be easily created by following the following steps:
1. Installing and configuring [PostgreSQL](https://www.postgresql.org/download/)
2. Installing and configuring [pgAdmin 4](https://www.pgadmin.org/download/)
3. Open and run in pgAdmin the db.sql file which is located in the data folder of the project
4. Open and run in pgAdmin the fill_price_catalogue.sql file which is located in the data folder of the project