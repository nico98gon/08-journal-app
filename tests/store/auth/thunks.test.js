import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers'); // need to add transformIgnorePatterns: [], on jest.config.js, this make that ignore the modules of firebase  

describe('testing at AuthThunks', () => {

    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('should call checkingCredentials', async() => {

        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

    });

    test('startGoogleSignIn should call checkingCredentials and login - if result ok', async() => {

        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );

        //thunk
        await startGoogleSignIn() ( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startGoogleSignIn should call checkingCredentials and logout - if result !ok', async() => {

        const loginData = { ok: false, errorMessage: 'error on Google' };
        await signInWithGoogle.mockResolvedValue( loginData );

        //thunk
        await startGoogleSignIn() ( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

    });

    test('startLoginWithEmailPassword should call checkingCredentials and login - if result ok', async() => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startLoginWithEmailPassword should call checkingCredentials and logout - if result !ok', async() => {

        const loginData = { ok: false, errorMessage: 'Login error' };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

    });

    test('startLogout should call logoutFirebase, clearNotes and logout', async() => {

        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );

    });

});