//pick all the images from server(url) to local

const axios = require('axios'); // Importing the axios library to make HTTP requests
const fs = require('fs'); // Importing the fs library to write files to disk
const cheerio = require('cheerio'); // Importing the cheerio library to parse HTML

const websiteUrl = 'https://www.linkedin.com/feed/'; // The URL of the website from which to download images

// Make a GET request to the website
axios.get(websiteUrl)
    .then(response => {
        const html = response.data; // The HTML content of the website

        const $ = cheerio.load(html); // Load the HTML into cheerio for parsing

        // Find all image tags and loop through them
        $('img').each(function () {
            const imgUrl = $(this).attr('src'); // Get the URL of the image

            // Make a GET request to the image URL
            axios.get(imgUrl, { responseType: 'arraybuffer' })
                .then(response => {
                    const contentType = response.headers['content-type']; // Get the content type of the image

                    // Generate a unique file name for the image
                    const fileName = `${Date.now()}.${contentType.split('/')[1]}`;

                    // Write the image to disk
                    fs.writeFileSync(fileName, response.data);
                })
                .catch(error => {
                    console.log(`Error downloading image from ${imgUrl}: ${error}`);
                });
        });
    })
    .catch(error => {
        console.log(`Error fetching website content from ${websiteUrl}: ${error}`);
    });
