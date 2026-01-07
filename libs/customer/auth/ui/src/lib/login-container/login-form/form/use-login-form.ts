import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useIntl, IntlShape } from 'react-intl';
import { useMemo } from 'react';

const createLoginFormSchema = (intl: IntlShape) =>
    z.object({
        email: z
            .email({
                message: intl.formatMessage({
                    id: 'customer.auth.login.error.email.invalid',
                    defaultMessage: 'Invalid email address'
                })
            })
            .min(1, {
                message: intl.formatMessage({
                    id: 'customer.auth.login.error.email.required',
                    defaultMessage: 'Email is required'
                })
            }),

        password: z
            .string({
                message: intl.formatMessage({
                    id: 'customer.auth.login.error.password.required',
                    defaultMessage: 'Password is required'
                })
            })
            .min(1, {
                message: intl.formatMessage({
                    id: 'customer.auth.login.error.password.required',
                    defaultMessage: 'Password is required'
                })
            })
            .min(8, {
                message: intl.formatMessage({
                    id: 'customer.auth.login.error.password.min',
                    defaultMessage:
                        'Password must be at least 8 characters long'
                })
            })
    });

export const useLoginForm = () => {
    const intl = useIntl();

    const loginFormSchema = useMemo(() => createLoginFormSchema(intl), [intl]);

    const { register, control, handleSubmit, formState } = useForm<
        z.infer<typeof loginFormSchema>
    >({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onTouched'
    });

    return {
        register,
        control,
        handleSubmit,
        formState
    };
};
