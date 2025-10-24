import Button from '@/components/ui/Button'
import { useAuth } from '@/auth'
import { GOOGLE_CLIENT_ID } from '@/constants/api.constant'
import { useEffect } from 'react'
import { gapi } from 'gapi-script'
import { apiGoogleOAuthSignUp } from '@/services/OAuthServices'

type OauthSignInProps = {
    setMessage?: (message: string) => void
    disableSubmit?: boolean
    label: string
}

const OauthSignUp = ({ setMessage, disableSubmit, label }: OauthSignInProps) => {
    const { oAuthSignIn } = useAuth()

    const handleGoogleSignUp = async () => {
        if (!disableSubmit) {
            oAuthSignIn(async ({ redirect, onSignIn }) => {
                const GoogleAuth = gapi.auth2.getAuthInstance();
                try {
                    const googleUser = await GoogleAuth.signIn({
                        prompt: 'consent',
                        scope: 'email profile',
                    });
                    const token = googleUser.getAuthResponse().id_token;
                    const resp = await apiGoogleOAuthSignUp({ token })
                    if (resp) {
                        const { user } = resp
                        onSignIn(user)
                        redirect()
                    }
                } catch (errors: any) {
                    setMessage?.(
                        errors?.response?.data?.message || errors.toString() || 'Google Sign in failed!'
                    )
                }
            })
        }
    }


    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: GOOGLE_CLIENT_ID,
                scope: 'profile email',
            }).then(() => {
                gapi.auth2.init({
                    client_id: GOOGLE_CLIENT_ID,
                });
            });
        }
        gapi.load('client:auth2', start);
    }, []);


    return (
        <div className="flex justify-center">
            <div className="max-w-[200px] w-full">
                <Button
                    className="flex-1"
                    type="button"
                    variant='default'
                    onClick={handleGoogleSignUp}
                >
                    <div className="flex items-center font-normal justify-center gap-2 ">
                        <img
                            className="h-[18px] w-[18px]"
                            src="/img/others/google.png"
                            alt="Google sign in"
                        />
                        <span>
                            {label}
                        </span>
                    </div>
                </Button>
            </div>
        </div>

    )
}

export default OauthSignUp
