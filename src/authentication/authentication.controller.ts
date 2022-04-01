import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import express, { Request, Response } from "express"; 
import JwtAuthenticationGuard from './jwt-authentication.guard';
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}
 
  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }
 
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser,@Res() response:Response) {
    const {user} = request;
    console.log('from here ',request)
    const cookie=await this.authenticationService.getCookieWithJwtToken(user.id as number)
     await response.setHeader('Set-Cookie', cookie);

    user.password = '';
    return  response.send(user)
  }
  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return response.sendStatus(200);

  }


  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = '';
    return user;
  }

  // @Post()
  // create(@Body() createAuthenticationDto: CreateAuthenticationDto) {
  //   return this.authenticationService.create(createAuthenticationDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authenticationService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authenticationService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthenticationDto: UpdateAuthenticationDto) {
  //   return this.authenticationService.update(+id, updateAuthenticationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authenticationService.remove(+id);
  // }
}
