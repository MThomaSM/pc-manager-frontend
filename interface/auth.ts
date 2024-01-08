
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAd: string;
    updatedAd: string;
    passwordChangedAt?: string;
    passwordResetToken?: string;
}

export interface AuthUser extends User {
    jwt: jwt;
}

export interface jwt {
    expiresAt: number;
    token: string;
}

export interface UserState {
    jwt: jwt;
    user: User | null;
}

export interface SignupFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export interface UpdateUserFormValues {
    firstName?: string;
    lastName?: string;
    password?: string;
    passwordConfirm?: string;
}

export interface PasswordResetFormValues {
    password: string;
    passwordConfirm: string;
}

export interface RequestPasswordResetFormValues {
    email: string;
    feUrl: string;
}

export interface LoginFormValues {
    email: string;
    password: string;
}