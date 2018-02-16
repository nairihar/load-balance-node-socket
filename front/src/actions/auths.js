import { ApiSdk } from '../sdk';
import { MESSAGE, USER_LOGIN } from '../configs/actionTypes';

export const signIn = data => async dispatch => {
  try {
    const { status, message, token, name } = await ApiSdk.signIn(data);
    if (status) {
      localStorage.accessToken = token;
      return dispatch({
        type: USER_LOGIN,
        user: {
          name,
        },
      });
    }
    throw new Error(message);
  } catch (err) {
    dispatch({
      type: MESSAGE,
      message: err.message
    });
  }
};

export const signUp = data => async dispatch => {
  try {
    const { status, message } = await ApiSdk.signUp(data);
    if (!status) {
      throw new Error(message);
    }

    dispatch({
      type: MESSAGE,
      message: 'Success! please Login.'
    });
    return { redirect: true };
  } catch (err) {
    dispatch({
      type: MESSAGE,
      message: err.message
    });
  }
};
