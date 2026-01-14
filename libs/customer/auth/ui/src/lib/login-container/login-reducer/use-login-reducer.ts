import { useReducer } from 'react';
import {
    ActionHandler,
    LoginAction,
    LoginState
} from './use-login-reducer.types';

export const useLoginReducer = (initialState: LoginState) => {
    const actionHandlers: Record<LoginAction['type'], ActionHandler> = {
        SWITCH_TO_OTP: (state) => ({
            ...state,
            mode: 'OTP_REQUEST',
            error: null
        }),
        SWITCH_TO_PASSWORD: () => ({
            ...initialState
        }),
        SWITCH_TO_OTP_REQUEST: (state) => ({
            ...state,
            mode: 'OTP_REQUEST',
            error: null,
            code: '' // Clear code when going back
        }),
        SET_EMAIL: (state, action) => ({
            ...state,
            email: (action as Extract<LoginAction, { type: 'SET_EMAIL' }>)
                .payload,
            error: null
        }),
        SET_CODE: (state, action) => ({
            ...state,
            code: (action as Extract<LoginAction, { type: 'SET_CODE' }>)
                .payload,
            error: null
        }),
        OTP_SENT_SUCCESS: (state) => ({
            ...state,
            mode: 'OTP_VERIFY',
            error: null
        }),
        SET_ERROR: (state, action) => ({
            ...state,
            error: (action as Extract<LoginAction, { type: 'SET_ERROR' }>)
                .payload
        }),
        CLEAR_ERROR: (state) => ({
            ...state,
            error: null
        })
    };

    const reducer = (state: LoginState, action: LoginAction): LoginState => {
        const handler = actionHandlers[action.type];
        return handler ? handler(state, action) : state;
    };

    const [state, dispatch] = useReducer(reducer, {
        ...initialState
    });

    return [state, dispatch] as const;
};
