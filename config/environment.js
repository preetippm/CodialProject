const http = require("http");
require("dotenv").config();

const development = {
    name : "development",
    //we will create a key
    asset_path : '/assets',
    session_cookie_key : 'blahsomething',
    db : 'codial_development',
    smtp: {
        service:'gmail',
        host: 'smtp.gamil.com',
        port:587,
        secure: false,
        auth : {
            user:'ppmmallick679',
            pass:'PM8952.CGI'
        },
    
        tls: {rejectUnauthorized: false}
    },
    
        google_client_id: "819779106938-nbj85g6a46q7hk2fvr5ca2atno60mu19.apps.googleusercontent.com",
        google_client_secret: "kWZyQxDnZERZ2nTupyL2Sw8x",
        google_call_back_url: "http://localhost:8000/users/auth/google/callback",
        jwt_secret : 'codial'
    
}

const production = {
    name : "production",
    asset_path : process.env.CODIAL_ASSET_PATH,
    session_cookie_key : process.env.CODIAL_SESSION_COOKIE_KEY,
    db : process.env.CODIAL_DB,
    smtp: {
        service:'gmail',
        host: 'smtp.gamil.com',
        port:587,
        secure: false,
        auth : {
            user:process.env.CODIAL_GMAIL_USERNAME,
            pass:process.env.CODIAL_GMAIL_PASSWORD
        },
    
        tls: {rejectUnauthorized: false}
    },
    
        google_client_id: process.env.CODIAL_GOOGLE_CLIENT_ID,
        google_client_secret: process.env.CODIAL_GOOGLE_CLIENT_SECRET,
        google_call_back_url: process.env.CODIAL_GOOGLE_CALL_BACK_URL,
        jwt_secret : process.env.CODIAL_JWT_SECRET
    
}

module.exports = eval(process.env.CODIAL_ENVIRONMENT)== undefined? development: eval(process.env.CODIAL_ENVIRONMENT);