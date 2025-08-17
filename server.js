const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle contact form submission
app.post('/contact', (req, res) => {
    // Destructure the form data, including the new 'domain' field
    const { name, email, domain, message } = req.body;

    // Log the received data to the server console
    console.log('--- New Internship Application ---');
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Selected Domain: ${domain}`); // Log the selected domain
    console.log(`Message: ${message}`);
    console.log('------------------------------------');
    
    // Send a user-friendly response back to the client
    res.status(200).send('<h1>Thank you for your application! We will review it and get back to you soon.</h1>');
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`🚀 Server is running!`);
    console.log(`View your website at http://localhost:${PORT}`);
});