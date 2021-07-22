import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './database/entities/user.entity';
import { UserDTO } from './model/user.dto';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserRegisterDTO } from './model/user.register.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    async login({ email, password }: UserDTO) {
        const userExists = await this.userRepository.findOne({ email });

        if (!userExists) {
            throw new Error('User email/password incorrect!');
        }

        const passwordMatch = await compare(password, userExists.password)
        if (!passwordMatch) {
            throw new Error("Username of password incorrect!")
        }

        const token = sign(
            {
                id: userExists.id,
                name: userExists.name,
                email: userExists.email
            }, process.env.JWT_KEY,
            {
                subject: userExists.id,
                expiresIn: "1d"
            }
        );
        return token;
    }

    async register({ name, cpf, email, password }: UserRegisterDTO) {
        const userAlreadyExists = await this.userRepository.findOne({ email });
        if (userAlreadyExists) {
            throw new Error('User already exists!');
        }
        const passwordHash: string = await hash(password, 8)

        const user = this.userRepository.create({
            name,
            email,
            cpf,
            password: passwordHash
        })

        await this.userRepository.save(user);

        return user;
    }
}
