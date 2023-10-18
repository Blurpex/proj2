DROP TABLE IF EXISTS employee;
CREATE TABLE IF NOT EXISTS employee (
    id              INTEGER NOT NULL AUTO_INCREMENT,
    name            VARCHAR(255),
    description     VARCHAR(255),
    image           VARCHAR(255),
    PRIMARY KEY (id)
);
