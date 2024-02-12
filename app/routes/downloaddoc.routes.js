const express = require('express');
const fs = require('fs');
const pdf = require('html-pdf');

const app = express();

// Sample HTML content to convert to PDF
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>PDF Document</title>
</head>
<body>
  <h1>Hello, this is a PDF document</h1>
  <p>This PDF is generated dynamically from HTML content.</p>
</body>
</html>
`;

module.exports = (app) => {
    const router = express.Router();
    router.get('/download-pdf', (req, res) => {
  // Generate PDF from HTML content
  pdf.create(htmlContent).toBuffer((err, buffer) => {
    if (err) {
      console.error('Error generating PDF:', err);
      return res.status(500).send('Error generating PDF');
    }

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');

    // Send the PDF buffer as the response
    res.send(buffer);
  });
});

app.use("/api/file", router);
};

