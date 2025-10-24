import Alert from '@/components/ui/Alert'
import OtpVerificationForm from './components/OtpVerificationForm'
import sleep from '@/utils/sleep'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useSessionUser } from '@/store/authStore'
import { apiGenerateOTP } from '@/services/AuthService'
import { useState } from 'react'
import { Spinner } from '@/components/ui'

export const OtpVerificationBase = () => {
    const [otpVerified, setOtpVerified] = useTimeOutMessage()
    const [otpResend, setOtpResend] = useTimeOutMessage()
    const [message, setMessage] = useTimeOutMessage()
    const { userEmail } = useSessionUser((state) => state)
    const [isSubmitting, setSubmitting] = useState<boolean>(false)

    const handleResendOtp = async () => {

        setSubmitting(true)
        try {
            const resp = await apiGenerateOTP<boolean>({ email: userEmail })
            if (resp) {
                setOtpResend('We have sent you One Time Password.')
                setSubmitting(false)
            }
        } catch (errors : any) {
            setMessage?.(
                errors?.response?.data?.message || errors.toString() || 'Some error occurred!'
            )
            setSubmitting(false)
        }
    }
    return (
        <div>
            <div className="mb-8">
                <h3 className="mb-2">OTP Verification</h3>
                <p className="font-semibold heading-text">
                    We have sent you One Time Password to your email.
                </p>
            </div>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            {otpResend && (
                <Alert showIcon className="mb-4" type="info">
                    <span className="break-all">{otpResend}</span>
                </Alert>
            )}
            {otpVerified && (
                <Alert showIcon className="mb-4" type="success">
                    <span className="break-all">{otpVerified}</span>
                </Alert>
            )}
            <OtpVerificationForm
                setMessage={setMessage}
                setOtpVerified={setOtpVerified}
            />
            {isSubmitting ?
                <span className="flex items-center font-bold mt-4 gap-1 justify-center">
                    <Spinner enableTheme={false} className="mr" />
                    <span>
                        Resending OTP
                    </span>
                </span> :
                <div className="mt-4 text-center">
                    <span className="font-semibold">Din&apos;t receive OTP? </span>
                    <button
                        className="heading-text font-bold underline"
                        onClick={handleResendOtp}
                    >
                        Resend OTP
                    </button>
                </div>
            }
        </div>
    )
}

const OtpVerification = () => {
    return <OtpVerificationBase />
}

export default OtpVerification
