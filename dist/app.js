import express, { json } from "express";
import * as dotenv from 'dotenv';
import { User } from "./models/User.js";
import { rutas } from "./utils/rutas.js";
import { adminRouter } from "./routes/adminRoutes.js";
//import { shopRouter } from "./routes/shopRoutes.js";
import { collections, connectToDatabase } from "./services/databaseService.js";
import { shopRouter } from "./routes/shopRoutes.js";
console.log('------------------------------------------------------------_---');
console.log("Bienvenido a mi app");
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
connectToDatabase()
    .then(async () => {
    const user = new User('123456789', 'Mateo', 'mateo@a.com', { calle: 'a', telf: '555', CP: '46000' });
    await user.save();
})
    .then(() => {
    console.log('Funciona');
    app.use(json()); //Middleware para procesar los campos que me envíen por HTTP body-parser
    app.use(express.static(rutas.public)); //Mia rutas contenido estáticos .css .js
    app.disable('x-powered-by');
    app.set('view engine', 'ejs');
    app.set('views', rutas.views);
    app.use(
    //Este middleware simula que se ha loggeado un usuario
    //Este es el usuario que se utilizará en los métodos de la tienda. En el futuro se sustituirá con el proceso de login
    async (req, res, next) => {
        var _a;
        const user = await ((_a = collections.users) === null || _a === void 0 ? void 0 : _a.findOne({ 'DNI': '123456789' }));
        req.body.user = new User(user.DNI, user.name, user.mail, user.contacto, user.cart, user._id.toHexString());
        next();
    });
    app.use('/admin', adminRouter); //Las rutas empiezan por /admin
    app.use('/', shopRouter);
    //Controladores para responder a las peticiones por HTTP
    app.use('/', (req, res, next) => {
        console.log("Middleware del final");
    });
    // FIN 
    app.listen(port);
    console.log("Servidor de la app en marcha");
    console.log(`Página disponible en: http://localhost:${port}`);
})
    .catch((error) => {
    console.log(error);
});
console.log(' ---- FIN del Programa -----');
