module.exports = {
    site_key: process.env.RECAPTCHA_SITE_KEY,
    secret_key: process.env.RECAPTCHA_SECRET_KEY,
    options: { 'hl': 'fa' },

    google : {
        google_client_key: process.env.GOOGLE_CLIENT_KEY,
        google_secret_key: process.env.GOOGLE_SECRET_KEY,
        google_callback_url: process.env.GOOGLE_CALLBACK_URL
    }
}




