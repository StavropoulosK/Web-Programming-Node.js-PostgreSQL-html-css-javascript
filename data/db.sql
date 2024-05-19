CREATE TABLE IF NOT EXISTS CLIENT (
	user_id serial NOT NULL primary key,
	first_name varchar(40) NOT NULL,
	last_name varchar(40) NOT NULL,
	username varchar(40) not null unique,
	"password" varchar(255) not null,
	email varchar(40) not null,
	phoneNumber bigint not null,
	profilePicture bytea default null,
	signUpDate varchar(40) not null default CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS admin(
	user_id serial NOT NULL primary key,
	username varchar(40) not null unique,
	"password" varchar(255) not null,
	profilePicture bytea default null
);

CREATE TABLE IF NOT EXISTS ROOM_TYPE (
	room_type_id integer NOT NULL primary key,
	bedroom_count integer NOT NULL,
	"class" varchar(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS PRICE_CATALOGUE (
	price_id serial primary key,
	price numeric(10,2) not null,
	room_type integer not null,
	startDate varchar(40) NOT NULL,
	endDate varchar(40) not null,
	FOREIGN KEY (room_type) REFERENCES ROOM_TYPE (room_type_id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS ROOM (
	"number" serial NOT NULL primary key,
	"floor" integer NOT NULL,
	num_single_beds integer NOT NULL,
	num_double_beds integer NOT NULL,
	sea_view boolean default null,
	accessibility_for_disabled boolean,
	under_renovation boolean DEFAULT FALSE,
	room_type integer NOT NULL,
	FOREIGN KEY (room_type) REFERENCES ROOM_TYPE (room_type_id)
            ON UPDATE cascade
            ON DELETE cascade
);



CREATE TABLE IF NOT EXISTS RESERVATION (
	reservation_id serial primary key,
	check_in varchar(40) NOT NULL,
	check_out varchar(40) NOT NULL,
	num_people int NOT NULL,
	total_cost numeric(10,2) NOT NULL,
	breakfast boolean NOT NULL DEFAULT FALSE,
	cancelled boolean NOT NULL DEFAULT FALSE,
	reservation_date date NOT NULL,
	client integer NOT NULL,
	roomNumber integer not null,
	FOREIGN KEY (client) REFERENCES CLIENT (user_id)
            ON UPDATE cascade
            ON DELETE cascade,
	FOREIGN KEY (roomNumber) REFERENCES ROOM(number)
            ON UPDATE cascade
            ON DELETE cascade
);



CREATE TABLE IF NOT EXISTS REVIEW (
	"id" serial primary key,
	reservation_id integer not null,
	review text not null,
	FOREIGN KEY (reservation_id ) REFERENCES RESERVATION (reservation_id)
            ON UPDATE cascade
            ON DELETE cascade
);

CREATE TABLE IF NOT EXISTS PAYMENT (
	payment_id serial primary key,
	"value" numeric(10,2) NOT NULL,
	"method" varchar(30) not null default 'ΠΙΣΤΩΤΙΚΗ/ΧΡΕΩΣΤΙΚΗ ΚΑΡΤΑ',
	payment_date date NOT NULL,
	reservation integer NOT NULL,
	FOREIGN KEY (reservation) REFERENCES RESERVATION (reservation_id)
            ON UPDATE cascade
            ON DELETE restrict
);


create index if not exists client_username_password
on client(username,password);

create index if not exists payment_reservationId
on payment(reservation);

create index if not exists reservationClient
on reservation(client);

create index if not exists reservationDates
on reservation(check_in,check_out,roomNumber);

create index if not exists reservationRoom
on reservation(roomNumber);

create index if not exists reviewReservation
on review(reservation_id);

create index if not exists roomTypes
on room(room_type,num_single_beds,num_double_beds);

create index if not exists roomPrices
on price_catalogue(room_type,startDate,endDate);

insert into admin values(default,'admin','admin123',default);

insert into room_type values(1,4,'Υπερπολυτελή Σουίτα');
insert into room_type values(2,2,'Deluxe Σουίτα 2 Υπνοδωματίων');
insert into room_type values(3,1,'Deluxe Σουίτα 1 Υπνοδωματίου');
insert into room_type values(4,2,'Διαμέρισμα 2 Υπνοδωματίων');
insert into room_type values(5,1,'Διαμέρισμα 1 Υπνοδωματίου');


insert into room values(default,1,0,4,true,false,default,1);
insert into room values(default,1,0,4,true,false,default,1);


insert into room values(default,0,2,1,true,false,default,2);
insert into room values(default,0,2,1,true,false,default,2);

insert into room values(default,3,4,0,true,false,default,2);
insert into room values(default,0,4,0,true,false,default,2);

insert into room values(default,0,2,1,true,true,default,2);
insert into room values(default,0,2,1,true,true,default,2);

insert into room values(default,3,4,0,true,true,default,2);
insert into room values(default,0,4,0,true,true,default,2);


insert into room values(default,3,0,1,true,false,default,3);
insert into room values(default,0,0,1,true,false,default,3);

insert into room values(default,3,2,0,true,false,default,3);
insert into room values(default,0,2,0,true,false,default,3);


insert into room values(default,1,2,1,false,false,default,4);
insert into room values(default,1,2,1,false,false,default,4);
insert into room values(default,1,2,1,true,false,default,4);

insert into room values(default,1,4,0,false,false,default,4);
insert into room values(default,1,4,0,false,false,default,4);
insert into room values(default,1,4,0,true,false,default,4);

insert into room values(default,1,2,1,true,true,default,4);
insert into room values(default,1,2,1,true,true,default,4);

insert into room values(default,1,4,0,true,true,default,4);
insert into room values(default,0,4,0,true,true,default,4);


insert into room values(default,0,2,0,false,false,default,5);
insert into room values(default,0,2,0,false,false,default,5);
insert into room values(default,0,2,0,true,false,default,5);
