import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Grid, IconButton, TextField, Typography, useFormControl } from "@mui/material"
import { DeleteOutline, SaveOutlined, UploadFileOutlined, UploadOutlined } from "@mui/icons-material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from "../../hooks/useForm"
import { ImageGallery } from "../components"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active:note, messageSaved, notes, isSaving } = useSelector( state => state.journal); // active now change to note

    const { body, title, date, onInputChange, formState } = useForm( note )

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    },[date])

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch( setActiveNote( formState ) );
    }, [ formState ])

    useEffect(() => {
        if ( messageSaved.length > 0 ) {
            Swal.fire('Note actualized', messageSaved, 'success');
        }
    }, [ messageSaved ])

    // useEffect(() => {
    //     if ( notes = [] ) {
    //         Swal.fire('Note deleted', messageSaved, 'error');
    //     }
    // }, [ notes ])

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ( { target }) => {
        if ( target.files === 0 ) return;
        dispatch( startUploadingFiles( target.files ) );
    }

    const onDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch( startDeletingNote() );
                Swal.fire(
                    'Deleted!',
                    `Your note ${ note.title } has been deleted`,
                    'success'
                )
            }
        })
    }

    return (
        <Grid 
            className="animate__animated animate__fadeIn animate__faster"
            container 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center' sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='ligth' >{ dateString }</Typography>
            </Grid>

            <Grid item>

                <input 
                    type="file"
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />
                
                <IconButton
                    color="primary"
                    disabled= { isSaving }
                    onClick={ () => fileInputRef.current.click() } // simulate a click on input
                >
                    <UploadFileOutlined />
                </IconButton>
                
                <Button
                    disabled={ isSaving }
                    onClick={ onSaveNote }
                    color="primary" 
                    sx={{ padding: 2 }}
                    >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1}} />
                    Save
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Insert a title"
                    label="Title"
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={ title }
                    onChange= { onInputChange }
                />

                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="What happend today?"
                    minRows={ 8 }
                    name='body'
                    value={ body }
                    onChange= { onInputChange }
                />
            </Grid>

            <Grid container justifyContent='end' >
                <Button
                    disabled= { isSaving }
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                        Delete
                </Button>
            </Grid>

            <ImageGallery images={ note.imageUrls } />

        </Grid>
    )
}
