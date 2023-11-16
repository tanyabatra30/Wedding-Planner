const express = require('express');
const fs = require('fs');
const app = express();
const port = 4000;

// Set the 'public' folder as a static directory
app.use(express.static('public'));

const vendors = [
    { id: 1, name: 'Floral Delights', description: 'Beautiful floral arrangements for your special day.', image: 'floral.jpg' },
    { id: 2, name: 'Catering Bliss', description: 'Exquisite catering services to delight your guests.', image: 'catering.jpg' },
    { id: 3, name: 'Memorable Moments Photography', description: 'Capture the magic with our professional photography services.', image: 'photography.jpg' },
    { id: 4, name: 'Elegant Attire Boutique', description: 'Find the perfect wedding attire for a stylish and elegant look.', image: 'attire.jpg' },
    { id: 5, name: 'Harmony Music Ensemble', description: 'Create a musical atmosphere with our talented musicians.', image: 'music.jpg' },
    { id: 6, name: 'Serenity Venue Rentals', description: 'Beautiful venues for your dream wedding or special event.', image: 'venue.jpg' },

];

// Sample user data
const users = [
    { id: 1, email: 'user@example.com', password: 'password123' },
];

// Middleware to parse incoming JSON data
app.use(express.json());

// Define an array of gallery image filenames
const galleryImages = ['gallery1.jpg', 'gallery2.jpg', 'gallery3.jpg', 'gallery4.jpg', 'gallery5.jpg'];

// Home route
app.get('/', (req, res) => {
    const loggedInUser = users.find(user => user.id === 1);

    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/style.css"> <!-- Link to the stylesheet -->
            <style>
                /* Add additional styles for the navigation buttons */
                .prev, .next {
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    width: auto;
                    padding: 16px;
                    margin-top: -22px;
                    color: white;
                    font-weight: bold;
                    font-size: 18px;
                    transition: 0.6s ease;
                    border-radius: 0 3px 3px 0;
                    user-select: none;
                }

                .prev {
                    left: 0;
                }

                .next {
                    right: 0;
                    border-radius: 3px 0 0 3px;
                }

                /* Add styles for the active gallery slide */
                .gallery-slide.active {
                    display: block;
                }

                /* Set fixed dimensions for the gallery images */
                .gallery-slide img {
                    width: 60%; /* Set the width to 100% to fill the container */
                    height: 400px; /* Set the desired height for all images */
                    object-fit: cover; /* Ensure images maintain aspect ratio and cover the container */
                }

                /* Add styles for the top-right user info */
                .user-info {
                    position: absolute;
                    top: 0;
                    right: 0;
                    padding: 10px;
                }

                /* Style the logout button */
                .logout-button {
                    background-color: #f44336;
                    color: white;
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }

                /* Add additional styles for the About Us section */
                .about-us-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
            </style>
            <title>Wedding Planner</title>
        </head>
        <body>
            <div class="navbar">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/gallery">Gallery</a></li>
                    <li><a href="/schedule-booking">Schedule Booking</a></li>
                    <li><a href="/about">About Us</a></li>
                    <!-- Add more navigation links as needed -->
                </ul>
            </div>
            <div class="container">
                <div class="user-info">
                    <span>${loggedInUser ? loggedInUser.email : 'Guest'}</span>
                    <button class="logout-button" onclick="logout()">Logout</button>
                </div>
                <h1>Wedding  Planner</h1>
                <h2>Vendors</h2>
                <div class="vendor-container">
                    ${vendors.map(vendor => `
                        <div class="card">
                            <img src="/images/${vendor.image}" alt="${vendor.name}">
                            <h3>${vendor.name}</h3>
                            <p>${vendor.description}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="about-us-container">
                    <h2>About Us</h2>
                    <p>Welcome to Wedding Planner, your trusted partner in creating unforgettable moments. Our dedicated team is committed to making your special day extraordinary.</p>
                    <p>At Wedding Planner, we bring together a curated selection of vendors to meet all your wedding needs. From exquisite floral arrangements to professional photography and beautiful venues, we've got you covered.</p>
                    <p>Explore our services, meet our vendors, and let us help you plan the wedding of your dreams.</p>
                </div>
                <div class="calendar-container">
                    <!-- Embed Google Calendar iframe with a smaller size -->
                    <iframe src="https://calendar.google.com/calendar/embed?src=your-calendar-id" style="border: 0" width="400" height="300" frameborder="0" scrolling="no"></iframe>
                </div>
                <div class="booking-container">
                    <a href="/schedule-booking" class="schedule-booking-button">Schedule Booking</a>
                </div>
            </div>
            <div class="gallery-container">
                <h2>Gallery</h2>
                <div class="slideshow-container">
                    <!-- Add manual navigation buttons -->
                    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                    <a class="next" onclick="plusSlides(1)">&#10095;</a>
                    ${galleryImages.map((image, index) => `
                        <div class="gallery-slide ${index === 0 ? 'active' : ''}">
                            <img src="/images/${image}" alt="Wedding Photo ${index + 1}">
                        </div>
                    `).join('')}
                </div>
                <script>
                    var slideIndex = 0;
                    showSlides();

                    function showSlides() {
                        var slides = document.getElementsByClassName("gallery-slide");
                        for (var i = 0; i < slides.length; i++) {
                            slides[i].style.display = "none";
                        }
                        slideIndex++;
                        if (slideIndex > slides.length) { slideIndex = 1 }
                        if (slideIndex < 1) { slideIndex = slides.length }
                        slides[slideIndex - 1].style.display = "block";
                        setTimeout(showSlides, 2000); // Change slide every 2 seconds
                    }

                    function plusSlides(n) {
                        showSlides(slideIndex += n);
                    }

                    function logout() {
                        // Implement logout functionality here
                        alert('Logout clicked');
                    }
                </script>
                <div class="contact-us-container">
                <!-- Include content from contact-us.html -->
                ${fs.readFileSync('./contact-us.html', 'utf8')}
            </div>
            </div>
        </body>
        </html>
    `;

    res.send(html);
});

// About Us route
app.get('/about', (req, res) => {
    const html = fs.readFileSync('./about-us.html', 'utf8'); // Read the HTML template file
    res.send(html);
});

// Logout route
app.get('/logout', (req, res) => {
    // Perform logout actions (clear session, redirect, etc.)
    res.send('<h1>Logout successful</h1>');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


