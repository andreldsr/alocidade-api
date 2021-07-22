import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from './model/user.dto';
import { UserRegisterDTO } from './model/user.register.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    login(@Body() userDTO: UserDTO) {
        return this.authService.login(userDTO);
    }

    @Post('register')
    register(@Body() userRegisterDTO: UserRegisterDTO) {
        return this.authService.register(userRegisterDTO);
    }
}
