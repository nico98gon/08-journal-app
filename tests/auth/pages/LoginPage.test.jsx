import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice, startLoginWithEmailPassword } from "../../../src/store/auth";
import { startGoogleSignIn } from "../../../src/store/auth";
import { notauthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password });
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notauthenticatedState
    }
})

describe('testing <LoginPage />', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('should show the component', () => {

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        // screen.debug();

        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
    });

    test('Google button should call startGoogleSignIn', () => {

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');

        fireEvent.click( googleBtn );

        // console.log(googleBtn);
        expect( mockStartGoogleSignIn ).toHaveBeenCalled();
    });

    test('Submit should call startLoginWithEmailPassword', () => {

        const email = 'nicoh@google.com';
        const password = '123456';

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Email' });
        
        // console.log(emailField);
        // screen.debug();
        
        fireEvent.change( emailField, { target: { name: 'email', value: email } });
        
        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value: password } });

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email,
            password
        })

    });
});