export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = User

export type GoogleOauthSignInParams = {
    token: string;
}
export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    firstname: string
    lastname: string
    email: string
    password: string
    confirmPassword: string
}

export type ForgotPassword = {
    email: string
}

export type GenerateOTP = {
    email: string
}

export type PlanType = "Starter" | "Professional" | "Enterprise";

type Duration = "monthly" | "yearly";

export type SubscriptionPlan = {
    type: PlanType;
    priceId: string;
    duration: Duration;
    amount: number;
    currency: string;
    timestamp: number;
  };

export type Role = "USER" | "ADMIN" | "STAFF"
  
  export interface User {
    firstname: string;
    lastname: string;
    email: string;
    avatar: string | null;
    authority: [Role];
    subscription : SubscriptionPlan | null;
    isEmailVerified: boolean;
  }

export type ResetPassword = {
    email: string
    password: string
    confirmPassword: string
}

export type AuthRequestStatus = 'success' | 'failed' | ''

export type AuthResult = Promise<{
    status: AuthRequestStatus
    message: string
}>

export type Token = {
    accessToken: string
    refereshToken?: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: ( user?: User) => void
    redirect: () => void
}

export type OTPResult = Promise<{
    status: AuthRequestStatus
    message: string
    code : string
}>
