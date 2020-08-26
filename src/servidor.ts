import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
/*import session from 'express-session';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import multer, { memoryStorage}  from 'multer';

const multipart = require('connect-multiparty');
import cron from 'node-cron';


//import request from 'request';

//Configuracion
import autenticacion from './config/passport-setup'
import keys from './config/keys';
import googleCalendar from './config/googleCalendar';
//Rutas
import indexRoutes from './routes/indexRoutes';
import autenticacionRoutes from './routes/autenticacionRoutes';
import configuracionRoutes from './routes/configuracionRoutes';
import contactosRoutes from './routes/contactosRoutes';
import documentosRoutes from './routes/documentosRoutes';
import notificacionesRoutes from './routes/notificacionesRoutes';
import cloudantRoutes from './routes/cloudantRoutes';
import calendarioRoutes from './routes/calendarioRoutes';
import eventosRoutes from './routes/eventosRoutes';

//import eventosController from './controllers/eventosController';
*/

//Configuracion
import passportStrategies from './lib/passportStrategies'
//Rutas
import indexRoutes from './routes/indexRoutes';
import autenticacionRoutes from './routes/autenticacionRoutes';

export class Servidor {

    app: express.Application;
    multerMid: any;
    multiPartMid: any;
    //cloudStorage: any;

    //Con esto funciona la comunicación e CORS para el login, pero aún no sé porque, ya que lo quito y sigue funcionando.
    //INVESTIGAR. Despues cambiar la linea donde se indica a la app que usa cors.
    private corsOption = {
        origin: ['http://localhost', 'capacitor://localhost','http://localhost:8100','http://localhost:4200', 'http://vivid-motif-271914.appspot.com','https://localhost:4200', 'https://vivid-motif-271914.appspot.com'],
        //origin: '*',
        methods: ['HEAD', 'GET', 'PUT', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
        allowedHeaders: ['Origin', 'Content-Type', 'X-Requested-With','Authorization', 'X-Auth-Token'],
        credentials: true
    };

    constructor (private port?: string | number) {
        this.app = express();
        this.configuracion();
        this.middlewares();
        this.routes();
        this.tareasCron();
    }

    private configuracion() {
        /*  Si se ha creado el objeto y se le ha pasado un puerto se asigna este a la variable 'port', 
        *   si no si existe un puerto definido en el sistema lo coge (lo puede indicar el proveedor), 
        *   en case contrario se usa el puerto 3000.
        */
        this.app.set('port', this.port || process.env.PORT || 3000);

    }

    private middlewares() {
        //Se desactiva esta cabecera para evitar posibles ataques
        this.app.disable('x-powered-by');
        //Muestra por consola las peticiones que se realizan al servidor
        this.app.use(morgan('dev'));
        //Angular puede solicitar los datos al servidor BackEnd desde fuera
        this.app.use(cors(this.corsOption));
        //Para que el servidor backEnd entienda los formatos json.
        this.app.use(express.json());
        //Configuración para enviar desde un formulario HTML
        this.app.use(express.urlencoded({ extended: false}));
        

        //Usada con express-session, pero se debe almacenar en la BD en el servidor
        /*this.app.use(session({ 
            cookie: {
                maxAge: 24*60*60*1000,
                httpOnly: true,
                sameSite: 'none',
                secure: true
            },
            secret: [keys.session.cookieKey], 
            resave: false, 
            saveUninitialized: false 
        }));*/

        /*this.app.use(cookieSession({
            name: 'sitbcn',
            keys: [keys.session.cookieKey],
            maxAge: 24*60*60*1000,
            httpOnly: true,
            //Funciona para local
            //secure: false,
            //sameSite: "strict"
            //No Funciona para local
            //Creo que es por el secure: true. Si esta a false, todos los sameSite funcionan correctamente.
            secure: false, //secure: true,
            sameSite: "none"
        }));*/

        //this.app.use(cookieParser());

        //Se inicializa passport
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        //Se indica que passport usará la estrategía de Google (oauth20).
        passport.use('google', passportStrategies.GoogleStrategy());

        /*this.multerMid = multer({
            storage: multer.memoryStorage(),
            limits: {
                fileSize: 1*1024*1024
            }
        });*/
       //this.app.use(this.multerMid.array('uploads[]'));

        /*this.multiPartMid = multipart({
            uploadDir: './tmp'
        });*/

        //Controlador de errores
        this.app.use(function(err: ErrorRequestHandler, req: Request, res: Response, next:NextFunction) {
            // logic
            console.log("Pasa por el control de errores");
            next(err);
            //return res.send(err);
        });
    }

    private routes() {
        //Se indica que la app usará el enrutador
        this.app.use('/', indexRoutes);
        this.app.use('/auth', autenticacionRoutes);
        /*this.app.use('/configuracion',  configuracionRoutes);
        this.app.use('/calendarios',  this.multerMid.array('uploads[]'), calendarioRoutes);
        this.app.use('/contactos', contactosRoutes);
        this.app.use('/documentos', documentosRoutes);
        this.app.use('/eventos', eventosRoutes);
        this.app.use('/notificaciones',  this.multerMid.array('uploads[]'), notificacionesRoutes);
        this.app.use('/cloudant/token', cloudantRoutes);*/
    }

    private tareasCron() {
        /*
        //Se ejecuta la tarea cron de generar los eventos del google calendar en el couchDB cada hora.
        cron.schedule("0 * * * *" , () => {
            googleCalendar.sincronizarEventosGoogleCalendar();
            console.log("Ejecutado cada hora");
        } );*/
    }

    //El servidor escucha el puerto indicado
    async start(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Servidor en el puerto ', this.app.get('port'));
    }
}