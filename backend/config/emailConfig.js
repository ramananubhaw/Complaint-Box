const emailConfig = {
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
};

export default emailConfig;