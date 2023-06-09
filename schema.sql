USE jobbler;

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255),
    appl_amount INT DEFAULT 0;
    date_create TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users (email);


CREATE TABLE apps (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    c_name VARCHAR(255) NOT NULL,
    descr VARCHAR(255),
    date_create TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    CONSTRAINT fk_apps_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);
