import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Link, Typography, TextField, Button, Alert } from "@mui/material";
import { Link as IconLink } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { startCreatingUserWithEmailPassword } from "../../store/auth";

const formData = {
    email: 'nicoh@gmail.com',
    password: '123456',
    displayName: 'Nicoh'
}

const formValidations = {
    email: [ (value) => value.includes('@'), 'Mail should include @'],
    password: [ (value) => value.length >= 6, 'Password should include 6 letters'],
    displayName: [ (value) => value.length >= 1, 'Name required'],
}

export const RegisterPage = () => {

    const dispatch = useDispatch();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector( state => state.auth );
    const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );

    const {
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm( formData, formValidations );

    const onSubmit = ( event ) => {
        event.preventDefault();
        setFormSubmitted(true);
        if ( !isFormValid ) return;
        dispatch( startCreatingUserWithEmailPassword( formState ) );
    }

    return (
        <AuthLayout title="Register">
            <form onSubmit={ onSubmit }>
                <Grid container>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                        label="Name"
                        type="text"
                        placeholder="Your Name"
                        fullWidth
                        name="displayName"
                        value={ displayName }
                        onChange={ onInputChange }
                        error={ !!displayNameValid && formSubmitted }
                        helperText={ displayNameValid }
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                        label="Email"
                        type="email"
                        placeholder="email@google.com"
                        fullWidth
                        name="email"
                        value={ email }
                        onChange={ onInputChange }
                        error={ !!emailValid && formSubmitted }
                        helperText={ emailValid }
                        />
                    </Grid>
                    
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                        label="Password"
                        type="current-password"
                        placeholder="Password"
                        fullWidth
                        name="password"
                        value={ password }
                        onChange={ onInputChange }
                        error={ !!passwordValid && formSubmitted }
                        helperText={ passwordValid }
                        />
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                        <Grid 
                            item 
                            xs={ 12 } 
                            display={ !!errorMessage ? '' : 'none' }
                        >
                            <Alert severity='error'>{ errorMessage }</Alert>
                        </Grid>
                        
                        <Grid item xs={ 12 } sm={ 12 }>
                            <Button
                                disabled={ isCheckingAuthentication }
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Create account
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction={'row'} justifyContent='end'>
                        <IconLink></IconLink>
                        <Link component={ RouterLink } color='inherit' to="/auth/login" ml={ 1 }>
                        Do you have an account?
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
