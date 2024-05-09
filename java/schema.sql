drop table polls;
drop table reply;
drop table users;
drop table jwt;

CREATE TABLE polls (
	id SERIAL PRIMARY KEY,

	owner_login VARCHAR(50),

    name VARCHAR(50),
    questions TEXT,
    answers TEXT,
    status BOOLEAN,
    creation_time DATE,
    expiration_time DATE,

    link TEXT,
    reply_amount BIGINT
);

CREATE TABLE reply (
	id SERIAL PRIMARY KEY,

	owner_login VARCHAR(50),

    answers TEXT,
    creation_time DATE,

    link TEXT,
    poll_link TEXT
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,

	role VARCHAR(20) NOT NULL,
	login VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(50) NOT NULL
);

CREATE TABLE jwt (
	id SERIAL PRIMARY KEY,

	owner_login VARCHAR(20) NOT NULL,
	access_token VARCHAR(300) NOT NULL,
	refresh_token VARCHAR(300) NOT NULL
);
