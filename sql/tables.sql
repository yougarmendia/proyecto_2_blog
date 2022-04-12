CREATE TABLE IF NOT EXISTS users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(90) NOT NULL,
	last_name VARCHAR(90) NOT NULL,
	email VARCHAR(255) NOT NULL
	);
	
CREATE TABLE IF NOT EXISTS posts (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	content VARCHAR(255),
	user_id INT,
	KEY user_id_idx(user_id)
);

CREATE TABLE IF NOT EXISTS articles (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	content TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id INT,
	KEY user_id_idx(user_id)
);

INSERT INTO users (first_name, last_name, email) VALUES (
"You", "Garmendia", "you.garmendia.ayala@ciisa.cl"
);

INSERT INTO posts (title, content, user_id) VALUES 
("Mi primer post", "Contenido altamente relevante",1
);

INSERT INTO users (first_name, last_name, email) VALUES (
	"Pepe", "Frog", "contacto@pepeblog.com"
);

INSERT INTO articles (title, content) VALUES ("Reparaciones, rabias y más", "Cada día se hace nuevo gasto más caro que el del día anterior. La cosa avanza lento, pero seguro.");