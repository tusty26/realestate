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
('The Oasis at Ispahani Colony', 'Maghbazar, Dhaka', 'A serene living experience in the heart of the city with lush green surroundings and modern amenities.', 'Starting from BDT 1.5Cr', 3, 3, 1850, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', TRUE),
('ABC Windchime', 'Banani, Dhaka', 'Elegant apartments designed for the modern family, featuring contemporary architecture and premium finishes.', 'Starting from BDT 2.2Cr', 4, 4, 2400, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', TRUE),
('ABC Eastwinds', 'Gulshan, Dhaka', 'Luxury redefined at Eastwinds, offering breathtaking views and exclusive rooftop facilities.', 'Starting from BDT 3.5Cr', 4, 5, 3200, 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=800&q=80', TRUE),
('The Heritage Estate', 'Dhanmondi, Dhaka', 'Experience the classic charm of Dhanmondi with our latest architectural masterpiece.', 'Starting from BDT 1.8Cr', 3, 3, 2100, 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80', TRUE);
