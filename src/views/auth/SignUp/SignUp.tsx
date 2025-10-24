import Alert from '@/components/ui/Alert'
import SignUpForm from './components/SignUpForm'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useThemeStore } from '@/store/themeStore'
import { Button } from '@/components/ui'
import { Link } from 'react-router-dom'
import OauthSignUp from './components/OauthSignUp'

type SignUpProps = {
    disableSubmit?: boolean
    signInUrl?: string
}

export const SignUpBase = ({
    signInUrl = '/sign-in',
    disableSubmit,
}: SignUpProps) => {
    const [message, setMessage] = useTimeOutMessage()

    const mode = useThemeStore((state) => state.mode)

    return (
        <>
            <div className="mb-8">
            <h2 className="mb-2 lg:text-start text-center">Welcome!</h2>
            </div>
            <div className="flex mb-10 p-1 font-semibold justify-between items-center border border-gray-600 rounded-2xl">
                <Link
                    to={signInUrl}
                    className='w-full  text-center'>
                    Log in
                </Link>
                <Button
                    block
                    variant="solid"
                    type="button"
                >

                    Register
                </Button>
            </div>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            <SignUpForm disableSubmit={disableSubmit} setMessage={setMessage} />
            <div className="mt-8">
                <div className="flex items-center gap-2 mb-6">
                    <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
                    <p className="font-normal heading-text">
                        Or
                    </p>
                    <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
                </div>
                <OauthSignUp
                    disableSubmit={disableSubmit}
                    setMessage={setMessage}
                    label = 'Sign up with Google'
                />
            </div>
            <div>
                <div className="mt-6 text-center">
                    <span>Already have an account? </span>
                    <ActionLink
                        to={signInUrl}
                        className="links-redirects"
                        themeColor={false}
                    >
                        Sign in
                    </ActionLink>
                </div>
            </div>
        </>
    )
}

const SignUp = () => {
    return <SignUpBase />
}

export default SignUp
