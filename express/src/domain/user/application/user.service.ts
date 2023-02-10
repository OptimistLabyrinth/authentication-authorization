import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

export interface IUserService {
  signUp: (signUpDto: SignUpDto) => SignUpDto
  signIn: (signInDto: SignInDto) => SignInDto
}

export default class UserService implements IUserService {
  signUp(signUpDto: SignUpDto) {
    console.dir({
      location: 'UserService-signUp()',
      signUpDto,
    })
    return signUpDto
  }

  signIn(signInDto: SignInDto) {
    console.dir({
      location: 'UserService-signIn()',
      signInDto,
    })
    return signInDto
  }
}
