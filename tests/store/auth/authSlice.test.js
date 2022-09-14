
import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { demoUser, initialState, authenticatedState, notauthenticatedState } from "../../fixtures/authFixtures";

describe('testing authSlice', () => {

    test('should return the initial state and call "auth"', () => {

        // console.log(authSlice);

        expect( authSlice.name ).toBe('auth');
        const state = authSlice.reducer( initialState, {} );
        // console.log( state );

        expect( state ).toEqual( initialState );

    });

    test('should realize the authentication', () => {

        // console.log( login( demoUser ) );
        const state = authSlice.reducer( initialState, login( demoUser ) );
        // console.log( state );

        expect( state ).toEqual( authenticatedState );

    });

    test('should realize the logout without arguments', () => {

        const state = authSlice.reducer( initialState, logout( demoUser ) );
        // console.log( state );

        expect( state ).toEqual( notauthenticatedState );

    });

    test('should realize the logout and show an error message', () => {

        const errorMessage = 'Wrong credentials';
        const state = authSlice.reducer( initialState, logout({ errorMessage }) );
        // console.log( state );

        // expect( state.errorMessage ).toEqual( errorMessage );

    });

    test('should change the state to checking', () => {

        const state = authSlice.reducer( authenticatedState, checkingCredentials() );
        // console.log( state );

        expect( state.status ).toEqual( 'checking' );

    });
});