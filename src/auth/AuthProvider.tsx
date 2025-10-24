import { useRef, useImperativeHandle, forwardRef, useEffect } from 'react'
import AuthContext from './AuthContext'
import appConfig from '@/configs/app.config'
import { useSessionUser } from '@/store/authStore'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import type {
    SignInCredential,
    SignUpCredential,
    AuthResult,
    OauthSignInCallbackPayload,
    User
} from '@/@types/auth'
import type { ReactNode } from 'react'
import type { NavigateFunction } from 'react-router-dom'

type AuthProviderProps = { children: ReactNode }

export type IsolatedNavigatorRef = {
    navigate: NavigateFunction
}

const IsolatedNavigator = forwardRef<IsolatedNavigatorRef>((_, ref) => {
    const navigate = useNavigate()

    useImperativeHandle(ref, () => {
        return {
            navigate,
        }
    }, [navigate])

    return <></>
})
function AuthProvider({ children }: AuthProviderProps) {
    const signedIn = useSessionUser((state) => state.session.signedIn)
    const { setSelectedPackage} = useSessionUser((state) => state);
    const user = useSessionUser((state) => state.user)
    const setUser = useSessionUser((state) => state.setUser)
    const setSessionSignedIn = useSessionUser(
        (state) => state.setSessionSignedIn,
    )

    const authenticated = Boolean(signedIn)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const storedUser = localStorage.getItem('gowinbet_user')
            if (storedUser) {
                const user = JSON.parse(storedUser)
                handleSignIn(user)
            } else {
                handleSignOut()
            }
        } catch (error) {
            handleSignOut()
        }
    }

    const navigatorRef = useRef<IsolatedNavigatorRef>(null)

    const redirect = () => {
        const search = window.location.search
        const params = new URLSearchParams(search)
        const redirectUrl = params.get(REDIRECT_URL_KEY)

        navigatorRef.current?.navigate(
            redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath,
        )
    }

    const handleSignIn = (user?: User) => {
        setSessionSignedIn(true)
        if (user) {
            setUser(user)
        }
    }

    const handleSignOut = () => {
        setUser({} as User)
        setSessionSignedIn(false)
    }

    const signIn = async (values: SignInCredential): AuthResult => {
        try {
            const storedUsers = localStorage.getItem('gowinbet_users')
            const users = storedUsers ? JSON.parse(storedUsers) : []

            const user = users.find((u: any) =>
                u.email === values.email && u.password === values.password
            )

            if (user) {
                const mockUser: User = {
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    avatar: '',
                    authority: ['USER'],
                    subscription: null,
                    isEmailVerified: true,
                }

                localStorage.setItem('gowinbet_user', JSON.stringify(mockUser))
                handleSignIn(mockUser)
                redirect()
                return {
                    status: 'success',
                    message: '',
                }
            }

            return {
                status: 'failed',
                message: 'Invalid email or password',
            }
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.toString() || 'Unable to sign in',
            }
        }
    }

    const signUp = async (values: SignUpCredential): AuthResult => {
        try {
            const storedUsers = localStorage.getItem('gowinbet_users')
            const users = storedUsers ? JSON.parse(storedUsers) : []

            const existingUser = users.find((u: any) => u.email === values.email)
            if (existingUser) {
                return {
                    status: 'failed',
                    message: 'Email already registered',
                }
            }

            const newUser = {
                id: Date.now().toString(),
                email: values.email,
                password: values.password,
                firstname: values.firstname,
                lastname: values.lastname,
            }

            users.push(newUser)
            localStorage.setItem('gowinbet_users', JSON.stringify(users))

            const mockUser: User = {
                email: newUser.email,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                avatar: '',
                authority: ['USER'],
                subscription: null,
                isEmailVerified: true,
            }

            localStorage.setItem('gowinbet_user', JSON.stringify(mockUser))
            handleSignIn(mockUser)
            redirect()

            return {
                status: 'success',
                message: '',
            }
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.toString() || 'Unable to sign up',
            }
        }
    }

    const signOut = async () => {
        try {
            setSelectedPackage(null)
            localStorage.removeItem('gowinbet_user')
        } finally {
            handleSignOut()
            navigatorRef.current?.navigate(appConfig.unAuthenticatedEntryPath)
        }
    }
    const oAuthSignIn = (
        callback: (payload: OauthSignInCallbackPayload) => void,
    ) => {
        callback({
            onSignIn: handleSignIn,
            redirect,
        })
    }
    return (
        <AuthContext.Provider
            value={{
                authenticated,
                user,
                signIn,
                signUp,
                signOut,
                oAuthSignIn,
            }}
        >
            {children}
            <IsolatedNavigator ref={navigatorRef} />
        </AuthContext.Provider>
    )
}

IsolatedNavigator.displayName = 'IsolatedNavigator'

export default AuthProvider
