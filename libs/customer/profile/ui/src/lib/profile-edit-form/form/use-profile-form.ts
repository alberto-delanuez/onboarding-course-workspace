import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { UserProfile } from '@onboarding-course/customer-profile-domain';
import { IntlShape, useIntl } from 'react-intl';

const createProfileFormSchema = (intl: IntlShape) =>
    z.object({
        firstName: z
            .string(
                intl.formatMessage({
                    id: 'customer.edit-profile.firstNameRequired',
                    defaultMessage: 'First Name is required'
                })
            )
            .min(
                1,
                intl.formatMessage({
                    id: 'customer.edit-profile.firstNameRequired',
                    defaultMessage: 'First Name is required'
                })
            ),
        lastName: z
            .string(
                intl.formatMessage({
                    id: 'customer.edit-profile.lastNameRequired',
                    defaultMessage: 'Last Name is required'
                })
            )
            .min(
                1,
                intl.formatMessage({
                    id: 'customer.edit-profile.lastNameRequired',
                    defaultMessage: 'Last Name is required'
                })
            ),
        phone: z
            .string(
                intl.formatMessage({
                    id: 'customer.edit-profile.phoneRequired',
                    defaultMessage: 'Phone is required'
                })
            )
            .min(
                1,
                intl.formatMessage({
                    id: 'customer.edit-profile.phoneRequired',
                    defaultMessage: 'Phone is required'
                })
            ),
        address: z.object({
            address: z.string(),
            city: z.string(),
            state: z.string(),
            postalCode: z.string()
        })
    });

export const useProfileForm = (defaultValues?: UserProfile) => {
    const intl = useIntl();
    const schema = createProfileFormSchema(intl);

    const { handleSubmit, control, formState } = useForm<
        z.infer<typeof schema>
    >({
        resolver: zodResolver(schema),
        defaultValues
    });

    return {
        handleSubmit,
        control,
        formState
    };
};
