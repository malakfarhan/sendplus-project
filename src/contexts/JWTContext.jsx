import PropTypes from 'prop-types';
import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import { jwtDecode } from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';

const chance = new Chance();

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken = (serviceToken) => {
    // Laravel token JWT nahi hota, isliye yahan sirf existence check karein
    return !!serviceToken;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                if (serviceToken) { // JWT decode ki zarurat nahi
                    setSession(serviceToken);
                    // Optionally user info fetch karein
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user: null // ya user info agar fetch kar rahe hain
                        }
                    });
                } else {
                    dispatch({ type: LOGOUT });
                }
            } catch (err) {
                dispatch({ type: LOGOUT });
            }
        };

        init();
    }, []);
const login = async (email, password) => {
  try {
    const response = await axios.post("/login", { email, password });
    const { data } = response;
    if (data?.status === 200) {
      setSession(data.token);
      localStorage.setItem("role", data.role);
      window.localStorage.setItem("LoginData", JSON.stringify(data));
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: data.user, // ya data, jo backend bhej raha ho
        },
      });
      window.location.href = "/customers/dashboard"; 
      return { status: data.status, success: data.message };
    } else {
      setSession(null);
      dispatch({ type: LOGOUT });
      return {
        errorMessage: data.message,
        errorStatus: data.status,
        validate_error: data.validate_error || null,
      };
    }
  } catch (error) {
    setSession(null);
    dispatch({ type: LOGOUT });
    return {
      errorMessage: error.message,
      errorStatus: 500,
    };
  }
};
    const register = async (email, password, firstName, lastName) => {
        // todo: this flow need to be recode as it not verified
        const id = chance.bb_pin();
        const response = await axios.post('/api/account/register', {
            id,
            email,
            password,
            firstName,
            lastName
        });
        let users = response.data;

        if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
            const localUsers = window.localStorage.getItem('users');
            users = [
                ...JSON.parse(localUsers),
                {
                    id,
                    email,
                    password,
                    name: `${firstName} ${lastName}`
                }
            ];
        }

        window.localStorage.setItem('users', JSON.stringify(users));
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    const resetPassword = async (email) => {
        console.log(email);
    };

    const updateProfile = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
