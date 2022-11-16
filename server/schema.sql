CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/

  /* The id of the message. */
  id INT NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(255) NOT NULL,
  user VARCHAR(255) NOT NULL,
  messageText VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)

);




/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

