const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config(); // Load environment variables from .env file


app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


const transporter = nodemailer.createTransport({
    service:"gmail", // Gmail SMTP server
    port: 465, // Gmail SMTP port for TLS
    secure: true, // true for 465, false for other ports
    auth: {
        user: "kartikdoda86@gmail.com", // Your Gmail address from environment variable
        pass: "dqbg xxek kqov axts"  // Your Gmail password or app-specific password from environment variable
    }
});




const sendEmail = async (req, res) => {
    const { sendersEmail, receiversEmail, subject, message } = req.body;

    // Log the request body to debug
    console.log("Request Body:", req.body);

    if (!receiversEmail) {
        return res.status(400).send({ error: 'Receiver email is required' });
    }

    const mailOptions = {
        from: sendersEmail || "kartikdoda86@gmail.com", // Default sender
        to: receiversEmail,
        subject: subject,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ error: 'Failed to send email' });
    }
};


app.post("/send-email", sendEmail);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});