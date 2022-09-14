import { checkingCredentials } from "../../../src/store/auth/authSlice";
import { checkingAuthentication } from "../../../src/store/auth/thunks";

jest.mock('../../../src/firebase/providers'); // need to add transformIgnorePatterns: [], on jest.config.js, this make that ignore the modules of firebase  

describe('testing at AuthThunks', () => {

    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('should call checkingCredentials', async() => {

        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

    });

});