import { authSlice } from "../../../store/auth/authSlice";
import { initialState } from "../../fixtures/authFixtures";

describe('testing authSlice', () => {
    test('should return the initial state and call "auth"', () => {
        
        // console.log(authSlice);

        expect( authSlice.name ).toBe('auth');
        const state = authSlice.reducer( initialState, {} );
        console.log( state );

        expect( state ).toEqual( initialState );

    });
});