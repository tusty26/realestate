CREATE DATABASE IF NOT EXISTS realestate_db;
USE realestate_db;

CREATE TABLE IF NOT EXISTS properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    location VARCHAR(255) NOT NULL
);

INSERT INTO properties (title, description, price, location) VALUES
('Luxury Penthouse', 'A beautiful penthouse with a city view.', 1500000.00, 'New York, NY'),
('Cozy Suburban Home', '3-bedroom house with a spacious backyard.', 350000.00, 'Austin, TX'),
('Modern Studio Apartment', 'Compact studio close to the metro station.', 1200.00, 'Seattle, WA'),
('Beachfront Villa', 'Private access to the beach and infinity pool.', 2500000.00, 'Miami, FL');
