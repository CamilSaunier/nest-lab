import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from '../utils/password.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Méthode dédiée pour l'authentification
  async validateUser(email: string, password: string) {
    // Utilise une méthode qui retourne le user complet (avec password)
    const user = await this.usersService.userRepository.findOneBy({ email });
    console.log('user trouvé:', user);
    console.log('password fourni:', password);
    console.log('hash en base:', user?.password);

    if (!user || !user.password) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    return user;
  }

  async login(loginDto: { email: string; password: string }) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
