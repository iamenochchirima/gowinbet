import Alert from '@/components/ui/Alert'
import SignUpForm from './components/SignUpForm'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Button } from '@/components/ui'

type SignUpProps = {
    disableSubmit?: boolean
    signInUrl?: string
}

export const SignUpBase = ({
    signInUrl = '/sign-in',
    disableSubmit,
}: SignUpProps) => {
    const [message, setMessage] = useTimeOutMessage()

    return (
        <>
            <div className="mb-10">
                <h2 className="mb-2 text-center">Sign up to GowinBet</h2>
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
                    <p className="font-normal heading-text text-sm">
                        Or sign up with
                    </p>
                    <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
                </div>
                <div className="space-y-3">
                    <Button
                        block
                        type="button"
                        variant='default'
                        className="bg-gray-700 hover:bg-gray-600 text-white border-none"
                    >
                        <div className="flex items-center font-normal justify-center gap-2">
                            <img
                                className="h-[18px] w-[18px]"
                                src="/google_icon.png"
                                alt="Google sign up"
                            />
                            <span>Sign up with Google</span>
                        </div>
                    </Button>
                    <Button
                        block
                        type="button"
                        variant='default'
                        className="bg-gray-700 hover:bg-gray-600 text-white border-none"
                    >
                        <div className="flex items-center font-normal justify-center gap-2">
                            <img
                                className="h-[18px] w-[18px]"
                                src="/apple_icon.png"
                                alt="Apple sign up"
                            />
                            <span>Sign up with Apple</span>
                        </div>
                    </Button>
                </div>
            </div>
            <div>
                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-400">Already have an account? </span>
                    <ActionLink
                        to={signInUrl}
                        className="text-orange-500 hover:text-orange-600 font-semibold underline"
                        themeColor={false}
                    >
                        Sign In
                    </ActionLink>
                    <span className="text-gray-400"> now</span>
                </div>
            </div>
        </>
    )
}

const SignUp = () => {
    return <SignUpBase />
}

export default SignUp
