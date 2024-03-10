import 'dotenv/config';

const configCors = (app) => {
    //Add headers before the routes are defined
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", process.env.REACT_URL);
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method",
        );
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
        next();
    });
}

export default configCors;