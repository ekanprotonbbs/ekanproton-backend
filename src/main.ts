declare const module: any;

import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import Redis from "ioredis";
import * as passport from "passport";
import { PrismaErrorFilter } from "@common/exceptions/nouser/prisma.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    //app.useGlobalFilters(new NotFoundErrorFilter())

    const {httpAdapter} = app.get(HttpAdapterHost)
    app.useGlobalFilters(new PrismaErrorFilter(httpAdapter))

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            //        disableErrorMessages: true,
        })
    );

    const config = new DocumentBuilder()
        .setTitle("EkanProton Backend API")
        .setDescription("The EkanProton Backend API description")
        .setVersion("0.0.1")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/swagger", app, document);

    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.REDIS_URL);

    app.use(
        session({
            name: "SESSIONID",
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
//                secure: true,
//                sameSite: true,
//                httpOnly: true,
                maxAge: 1 * 24 * 60 * 60 * 1000,
            },
            store: new RedisStore({
                client: redis,
            }),
        })

        
    );
    app.use(passport.initialize())
    app.use(passport.session())


    await app.listen(3001);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
