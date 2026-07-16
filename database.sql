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
    is_featured BOOLEAN DEFAULT FALSE,
    assigned_agent_id INT DEFAULT NULL
);

INSERT INTO properties (title, location, description, price, rooms, baths, size, image_url, is_featured, assigned_agent_id) VALUES
('The Oasis Apartments', 'Gulshan, Dhaka', 'Luxury living space with panoramic views of Gulshan lake and state-of-the-art facilities.', '$750,000', 4, 4, 3200, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', TRUE, 1),
('Skyline Heights', 'Uttara, Dhaka', 'Modern high-rise residential complex located in the heart of Uttara, close to airport road.', '$420,000', 3, 3, 2100, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', FALSE, 2),
('Rosewood Court', 'Dhanmondi, Dhaka', 'Elegant townhouse layout in the central residential pocket of Dhanmondi with gated private gardens.', '$610,000', 3, 4, 2800, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', TRUE, 3),
('Bonaventura Office Tower', 'Banani, Dhaka', 'Premium commercial corporate office spaces offering direct street access and custom layouts.', '$2,450,000', 0, 8, 12000, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', TRUE, 6),
('Grand Vista Villas', 'Purbachal, Dhaka', 'Exclusive triplex bungalows featuring spacious private lakeside gardens and secure community access.', '$1,200,000', 5, 6, 5400, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', FALSE, 5),
('South Breeze Residency', 'Baridhara, Dhaka', 'Upscale residential apartment block featuring high ceilings, automated ventilation, and premium views.', '$950,000', 4, 4, 3800, 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80', FALSE, 1),
('Emerald Commercial Hub', 'Motijheel, Dhaka', 'Retail and business block in commercial hub with flexible spaces and underground parking loops.', '$3,100,000', 0, 12, 18000, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', TRUE, 4),
('Lakeview Manor', 'Gulshan, Dhaka', 'Luxury penthouse overlooking Gulshan Lake with custom architectural finishes and private pool access.', '$880,000', 4, 5, 4100, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', TRUE, 1),
('Purbachal Lakeside Bungalow', 'Purbachal, Dhaka', 'Lakeside residential duplex bungalow with luxury interiors and secure community access paths.', '$1,150,000', 5, 5, 4800, 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80', TRUE, 5),
('Banani Penthouse Suite', 'Banani, Dhaka', 'Luxury corporate penthouse with high-end security and helipad access keys.', '$3,850,000', 5, 6, 8500, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', FALSE, 6);


CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO inquiries (name, message) VALUES
('John Doe', 'I am interested in the Oasis property.'),
('Jane Smith', 'Do you have any properties in Uttara?'),
('Rahat Kabir', 'Can I schedule a viewing for Bonaventura Office Tower?'),
('Farhana Yasmin', 'What is the booking amount for Lakeview Manor?'),
('Tanvir Ahmed', 'Are there any commercial plots available near Purbachal?'),
('Nabila Islam', 'Please send me the catalog for Grand Vista Villas.');


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
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO agents (name, phone, email, username, password) VALUES
('Sarah Jenkins', '+880 171 111 2222', 'sarah.j@abcrealestate.com', 'sarah', 'password123'),
('Michael Chang', '+880 181 333 4444', 'm.chang@abcrealestate.com', 'michael', 'password123'),
('Rahat Kabir', '+880 191 555 6666', 'rahat.k@abcrealestate.com', 'rahat', 'password123'),
('Anisur Rahman', '+880 151 777 8888', 'anisur.r@abcrealestate.com', 'anisur', 'password123'),
('Farhana Karim', '+880 161 999 0000', 'farhana.k@abcrealestate.com', 'farhana', 'password123'),
('Zayed Hossain', '+880 131 222 3333', 'zayed.h@abcrealestate.com', 'zayed', 'password123');


CREATE TABLE IF NOT EXISTS sales_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_name VARCHAR(255) NOT NULL,
    buyer_name VARCHAR(255) NOT NULL,
    price_sold VARCHAR(100) NOT NULL,
    broker_assigned VARCHAR(255) NOT NULL
);

INSERT INTO sales_transactions (property_name, buyer_name, price_sold, broker_assigned) VALUES
('The Oasis Apartments', 'Zarif Rahman', '$750,000', 'Sarah Jenkins'),
('Skyline Heights', 'Muntasir Billah', '$420,000', 'Michael Chang'),
('Rosewood Court', 'Adnan Chowdhury', '$610,000', 'Rahat Kabir'),
('Bonaventura Office Tower', 'Radiant Corporation', '$2,450,000', 'Zayed Hossain'),
('Lakeview Manor', 'Naseem Khan', '$880,000', 'Sarah Jenkins'),
('Grand Vista Villas', 'Dr. Salma Begum', '$1,200,000', 'Farhana Karim'),
('South Breeze Residency', 'Mahmudul Hasan', '$950,000', 'Sarah Jenkins'),
('Emerald Commercial Hub', 'Capital Holdings Ltd', '$3,100,000', 'Anisur Rahman'),
('Purbachal Lakeside Bungalow', 'Sayed Ashraful', '$1,150,000', 'Farhana Karim'),
('Banani Penthouse Suite', 'Summit Properties', '$3,850,000', 'Zayed Hossain');


CREATE TABLE IF NOT EXISTS admin_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    note TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin_notes (note) VALUES
('Welcome to the admin area! Ensure properties are kept up to date.'),
('System maintenance scheduled for tonight at 02:00 AM.'),
('Assign Purbachal Lakeside Bungalow leads to Farhana Karim.'),
('Review transaction logs for Motijheel Emerald Hub sale by end of week.');


CREATE TABLE IF NOT EXISTS agent_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    agent_name VARCHAR(255) NOT NULL,
    property_title VARCHAR(255) NOT NULL,
    request_type VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO agent_requests (agent_name, property_title, request_type, message) VALUES
('Sarah Jenkins', 'The Oasis Apartments', 'Price Adjustment Request', 'I request to adjust the pricing for Lakeview Manor based on buyer feedback.'),
('Michael Chang', 'Skyline Heights', 'Information Correction', 'Please update listing description details to include nearby Metro Station reference.'),
('Rahat Kabir', 'Rosewood Court', 'Unlist Portfolio Request', 'Buyer deposit received, please unlist Rosewood Court temporarily.');
