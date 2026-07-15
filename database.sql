CREATE DATABASE IF NOT EXISTS realestate_db;
USE realestate_db;

CREATE TABLE IF NOT EXISTS properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    price VARCHAR(100),
    rooms INT,
    baths INT,
    size INT,
    image_url VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE
);

INSERT INTO properties (title, location, description, price, rooms, baths, size, image_url, is_featured) VALUES
('The Oasis Apartments', 'Gulshan, Dhaka', 'Luxury living space with panoramic views of Gulshan lake and state-of-the-art facilities.', '$750,000', 4, 4, 3200, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', TRUE),
('Skyline Heights', 'Uttara, Dhaka', 'Modern high-rise residential complex located in the heart of Uttara, close to airport road.', '$420,000', 3, 3, 2100, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', FALSE),
('Rosewood Court', 'Dhanmondi, Dhaka', 'Elegant townhouse layout in the central residential pocket of Dhanmondi with gated private gardens.', '$610,000', 3, 4, 2800, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', TRUE);


CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO inquiries (name, message) VALUES
('John Doe', 'I am interested in the Oasis property.'),
('Jane Smith', 'Do you have any properties in Uttara?');

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
);

INSERT INTO users (username, password, role) VALUES
('admin', 'admin_password_2026', 'admin');

CREATE TABLE IF NOT EXISTS agents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL
);

INSERT INTO agents (name, phone, email) VALUES
('Sarah Jenkins', '+880 171 111 2222', 'sarah.j@abcrealestate.com'),
('Michael Chang', '+880 181 333 4444', 'm.chang@abcrealestate.com'),
('Rahat Kabir', '+880 191 555 6666', 'rahat.k@abcrealestate.com');

CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(255) NOT NULL,
    performed_by VARCHAR(255) NOT NULL,
    ip_address VARCHAR(50) NOT NULL,
    details TEXT
);

INSERT INTO audit_logs (action, performed_by, ip_address, details) VALUES
('LOGIN', 'admin', '192.168.1.100', 'Admin successfully logged in from internal network'),
('PROPERTY_VIEW', 'guest', '192.168.1.150', 'Guest viewed properties catalog'),
('INQUIRY_SUBMIT', 'John Doe', '192.168.1.201', 'Inquiry message stored for Oasis property');

CREATE TABLE IF NOT EXISTS admin_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    note TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin_notes (note) VALUES
('Welcome to the admin area! Ensure properties are kept up to date.'),
('System maintenance scheduled for tonight at 02:00 AM.');



