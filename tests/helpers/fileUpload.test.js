import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dy58cbxhn',
    api_key: '266343885611768',
    api_secret: 'lkDITZBUobTQivgBV-hQbD6AUDs',
    secure: true
});

describe('test on fileUpload', () => {

    test('should upload the file to cloudinary', async() => {

        // the next direction could be not found on future
        const imageUrl = 'https://images.unsplash.com/photo-1484591974057-265bb767ef71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');
        // console.log( url );

        const segments = url.split('/');
        // console.log( segments );
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');
        // console.log({ imageId });

        const cloudResp = await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
            resource_type: 'image' // this ensures that what is going to delete is a type of image
        });
        // console.log({ cloudResp });

    });

    test('should return null', async() => {

        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );
        expect( url ).toBe( null );

    });
});