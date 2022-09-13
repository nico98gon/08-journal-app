import { fileUpload } from "../../helpers/fileUpload";

describe('test on fileUpload', () => {

    test('should upload the file to cloudinary', async() => {

        // the next direction could be not found on future
        const imageUrl = 'https://images.unsplash.com/photo-1484591974057-265bb767ef71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');
    });
});