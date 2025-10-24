import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
    GenerateOTP,
} from '@/@types/auth'

export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchDataWithAxios<SignInResponse>({
        url: endpointConfig.signIn,
        method: 'post',
        data,
    })
}

export async function apiMe() {
    return ApiService.fetchDataWithAxios<SignInResponse>({
        url: endpointConfig.me,
        method: 'get'
    })
}


export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchDataWithAxios<SignUpResponse>({
        url: endpointConfig.signUp,
        method: 'post',
        data,
    })
}

export async function apiSignOut() {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.signOut,
        method: 'post',
    })
}

export async function apiForgotPassword<T>(data: ForgotPassword) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.forgotPassword,
        method: 'post',
        data,
    })
}

export async function apiResetPassword<T>(data: ResetPassword) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.resetPassword,
        method: 'put',
        data,
    })
}

export async function apiGenerateOTP<T>(data: GenerateOTP) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.generateOTP,
        method: 'post',
        data,
    })
}

export async function apiVerifyOTP<T>(data: { email: string; otp: string }) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.verifyOTP,
        method: 'post',
        data,
    })
}

