import { startNewNote } from "../../../src/store/journal";

describe('testing journalThunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('should create a new note', async() => {

        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid: uid } });

        await startNewNote()( dispatch, getState );
    });
});