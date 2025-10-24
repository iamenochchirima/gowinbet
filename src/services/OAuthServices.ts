import endpointConfig from "@/configs/endpoint.config";
import ApiService from "./ApiService";
import { GoogleOauthSignInParams, SignInResponse } from "@/@types/auth";

export async function apiGoogleOauthSignIn<T>(data: GoogleOauthSignInParams) {
    return ApiService.fetchDataWithAxios<SignInResponse>({
        url: endpointConfig.googleOauth,
        method: 'post',
        data,
    })
}

export async function apiGoogleOAuthSignUp<T>(data: GoogleOauthSignInParams) {
    return ApiService.fetchDataWithAxios<SignInResponse>({
        url: endpointConfig.googleOauth,
        method: 'post',
        data,
    })
}

export async function apiGithubOauthSignIn() {
    // return await signInWithFirebaseGithub()
}
