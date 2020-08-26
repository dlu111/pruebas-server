import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';


import keys from '../config/keys';

class PassportStrategies {

    constructor() {
        this.configuracion();
    }

    public GoogleStrategy() : Strategy {

        return new Strategy({
            callbackURL: '/auth/google/callback',
            passReqToCallback: true,
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret
        }, (request, accessToken, refreshToken, profile,  done) => {
            let blnUsuarioCorrecto: boolean = false;
            if (profile.emails == null || profile.emails == undefined || profile.emails.length == 0) {
                return done("No se puede verificar el usuario introducido", undefined);
            }
            for (let email of profile.emails) {
                if (email.value == 'sitbcnbus@gmail.com') {
                    blnUsuarioCorrecto = true;
                }
            }
            if (!blnUsuarioCorrecto) {
                return done("Usuario incorrecto", undefined);
            } else {
                return done(undefined, profile);
            }
        });
    }

    private configuracion() {
        passport.serializeUser((user: any, done: any) => {
            return done(null, user.id);
        });
        
        passport.deserializeUser(async (id:any , done:any ) => {
            return done(null, id);
        });
    }
}

export default new PassportStrategies();
