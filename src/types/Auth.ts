interface AuthForm {
  password: string
  email: string
  user: {
    name: string
    email: string
    password: string
  }
}
interface RegisterForm {
  password: string
  email: string
  user: {
    name: string
    email: string
    password: string
  }
  name: string
}
interface responseModel {
  user: Array<string>
  token: string
}
