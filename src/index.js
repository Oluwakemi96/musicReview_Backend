import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { json, urlencoded } from 'express';
import config from './config/index.js';
import fileUpload from 'express-fileupload';
import 'dotenv/config';

const port = config.MUSIC_REVIEW_PORT || 4000;

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(helmet());
app.use(cors());
app.use(fileUpload());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to music review backend APIs"
    })
});

// 404 error handling
app.use((req, res) => res.status(404).json({
    status: "error",
    code: 404,
    label: "NOT_FOUND",
    message: "Route not found",
}))

// server related error handling
app.use((req, res) => res.status(500).json({
    status: "error",
    code: 500,
    label: "INTERNAL_SERVER_ERROR",
    message: "Ooopppps! Server error, please try again later"
}))

app.listen(port);

console.log(`Server is running on port ${port}`);

export default app;
