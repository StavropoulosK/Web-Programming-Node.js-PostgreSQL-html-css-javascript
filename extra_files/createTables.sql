CREATE TABLE IF NOT EXISTS "USER" (
	"user_id" serial,
	"username" varchar(20) NOT NULL,
	"email" varchar(30) NOT NULL,
	"password" varchar(30) NOT NULL,
	PRIMARY KEY ("user_id")
);

CREATE TABLE IF NOT EXISTS "CLIENT" (
	"user_id" integer NOT NULL,
	"first_name" varchar(20) NOT NULL,
	"last_name" varchar(30) NOT NULL,
	"phone_number" integer,
	"register_date" date,
	PRIMARY KEY ("user_id"),
	FOREIGN KEY ("user_id") REFERENCES "USER" ("user_id")
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "ADMIN" (
	"user_id" integer NOT NULL,
	PRIMARY KEY ("user_id"),
	FOREIGN KEY ("user_id") REFERENCES "USER" ("user_id")
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "ROOM_TYPE" (
	"room_type_id" varchar(20) NOT NULL,
	"bedroom_count" smallint NOT NULL,
	"class" varchar(10) NOT NULL,
	PRIMARY KEY ("room_type_id")
);

CREATE TABLE IF NOT EXISTS "PRICE_CATALOGUE" (
	"price_id" serial,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"price" boolean NOT NULL,
	"room_type" varchar(20) NOT NULL,
	PRIMARY KEY ("price_id"),
	FOREIGN KEY ("room_type") REFERENCES "ROOM_TYPE" ("room_type_id")
            ON UPDATE CASCADE
            ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS "ROOM" (
	"number" smallint NOT NULL,
	"floor" smallint NOT NULL,
	"num_single_beds" smallint NOT NULL,
	"num_double_beds" smallint NOT NULL,
	"view" text,
	"accessibility_for_disabled" boolean DEFAULT TRUE,
	"under_renovation" boolean DEFAULT FALSE,
	"room_type" varchar(20) NOT NULL,
	PRIMARY KEY ("number"),
	FOREIGN KEY ("room_type") REFERENCES "ROOM_TYPE" ("room_type_id")
            ON UPDATE SET NULL
            ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS "RESERVATION" (
	"reservation_id" serial,
	"check_in" date NOT NULL,
	"check_out" date NOT NULL,
	"num_people" smallint NOT NULL,
	"total_cost" boolean NOT NULL,
	"breakfast" boolean NOT NULL DEFAULT FALSE,
	"cancelled" boolean NOT NULL DEFAULT FALSE,
	"reservation_date" date NOT NULL,
	"client" integer NOT NULL,
	PRIMARY KEY ("reservation_id"),
	FOREIGN KEY ("client") REFERENCES "CLIENT" ("user_id")
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "ROOM_RESERVATION" (
	"room" smallint NOT NULL,
	"reservation" integer NOT NULL,
	PRIMARY KEY ("room", "reservation"),
	FOREIGN KEY ("room") REFERENCES "ROOM" ("number")
            ON UPDATE CASCADE
            ON DELETE CASCADE,
	FOREIGN KEY ("reservation") REFERENCES "RESERVATION" ("reservation_id")
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "REVIEW" (
	"rating" smallint NOT NULL,
	"comments" text,
	"reservation" integer NOT NULL,
	PRIMARY KEY ("reservation"),
	FOREIGN KEY ("reservation") REFERENCES "RESERVATION" ("reservation_id")
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "PAYMENT" (
	"payment_id" serial,
	"value" boolean NOT NULL,
	"method" varchar(10) NOT NULL,
	"payment_date" date NOT NULL,
	"reservation" integer NOT NULL,
	PRIMARY KEY ("payment_id"),
	FOREIGN KEY ("reservation") REFERENCES "RESERVATION" ("reservation_id")
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
);

