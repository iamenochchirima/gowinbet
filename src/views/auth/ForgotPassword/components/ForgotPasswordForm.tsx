import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { apiGenerateOTP } from '@/services/AuthService'
import { useForm, Controller, set } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import { useSessionUser } from '@/store/authStore'

interface ForgotPasswordFormProps extends CommonProps {
    emailSent: boolean
    setEmailSent?: (compplete: boolean) => void
    setMessage?: (message: string) => void
}

type ForgotPasswordFormSchema = {
    email: string
}

const validationSchema: ZodType<ForgotPasswordFormSchema> = z.object({
    email: z.string().email().min(5),
})

const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
    const [isSubmitting, setSubmitting] = useState<boolean>(false)
    const { setUserEmail, } = useSessionUser((state) => state)

    const { className, setMessage, setEmailSent, emailSent, children } = props

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<ForgotPasswordFormSchema>({
        resolver: zodResolver(validationSchema),
    })

    const onForgotPassword = async (values: ForgotPasswordFormSchema) => {
        const { email } = values
        setSubmitting(true)

        try {
            const resp = await apiGenerateOTP<boolean>({ email })
            if (resp) {
                setUserEmail(email)
                setSubmitting(false)
                setEmailSent?.(true)
            }
        } catch (errors: any) {
            setMessage?.(
                errors?.response?.data?.message || errors.toString() || 'Some error occurred!'
            );
            setSubmitting(false)
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {!emailSent ? (
                <Form onSubmit={handleSubmit(onForgotPassword)}>
                    <FormItem
                        label="Email"
                        invalid={Boolean(errors.email)}
                        errorMessage={errors.email?.message}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    autoComplete="on"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <Button
                        block
                        loading={isSubmitting}
                        variant="solid"
                        type="submit"
                    >
                        {isSubmitting ? 'Submiting...' : 'Submit'}
                    </Button>
                </Form>
            ) : (
                <>{children}</>
            )}
        </div>
    )
}

export default ForgotPasswordForm
