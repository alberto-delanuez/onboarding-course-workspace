export interface LoginState {
  mode: 'PASSWORD' | 'OTP_REQUEST' | 'OTP_VERIFY';
  email: string;
  code: string;
  error: string | null;
}
export type LoginAction = 
  | { type: 'SWITCH_TO_OTP' }
  | { type: 'SWITCH_TO_PASSWORD' }
  | { type: 'SWITCH_TO_OTP_REQUEST' } // To go back from verify to request
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_CODE'; payload: string }
  | { type: 'OTP_SENT_SUCCESS' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };


export type ActionHandler = (state: LoginState, action: LoginAction) => LoginState;
