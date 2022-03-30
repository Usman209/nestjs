"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var Joi = require("@hapi/joi");
var database_module_1 = require("./database/database.module");
var users_module_1 = require("./users/users.module");
var authentication_module_1 = require("./authentication/authentication.module");
var authentication_service_1 = require("./authentication/authentication.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    validationSchema: Joi.object({
                        POSTGRES_HOST: Joi.string().required(),
                        POSTGRES_PORT: Joi.number().required(),
                        POSTGRES_USER: Joi.string().required(),
                        POSTGRES_PASSWORD: Joi.string().required(),
                        POSTGRES_DB: Joi.string().required(),
                        PORT: Joi.number(),
                        JWT_SECRET: Joi.string().required(),
                        JWT_EXPIRATION_TIME: Joi.string().required()
                    })
                }),
                database_module_1.DatabaseModule,
                users_module_1.UsersModule,
                authentication_module_1.AuthenticationModule,
            ],
            controllers: [],
            providers: [authentication_service_1.AuthenticationService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
