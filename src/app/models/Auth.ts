export interface AuthLogin {
    email: string,
    password: string
}

export interface AuthRegister {
    firstname: string
    lastname: string
    email: string
    password: string
    phone: string
}

export interface AuthResponse {
    uid: string
    firstname: string
    lastname: string
    email: string
    phone: string
    role: string
    createdAt: string
}

export interface AuthUpdate {
    firstname: string
    lastname: string
    phone: string
}

export interface AuthResetPass {
    actualPassword: string
    newPassword: string
}