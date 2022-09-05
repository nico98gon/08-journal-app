import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Link, Typography, TextField, Button, Alert } from "@mui/material";
import { Google, Link as IconLink } from "@mui/icons-material";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";

const formData = {
    email: '',
    password: ''
}

const formValidations = {
    email: [ (value) => value.includes('@'), 'Mail should include @'],
    password: [ (value) => value.length >= 6, 'Password should include 6 letters']
}

export const LoginPage = () => {
    
    const dispatch = useDispatch();

    const { status, errorMessage } = useSelector( state => state.auth );
    const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);

    const { formState, email, password, onInputChange, isFormValid } = useForm( formData, formValidations );

    const onGoogleSignIn = ( event ) => {
        event.preventDefault();
        dispatch( startGoogleSignIn() );
    }

    const onSubmit = ( event ) => {
        event.preventDefault();
        if ( !isFormValid ) return;
        dispatch( startLoginWithEmailPassword( formState ) );
    }

    return (
        <AuthLayout title="login">
            <form onSubmit={ onSubmit }>
                <Grid container>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Email"
                            type="email"
                            placeholder="email@google.com"
                            fullWidth
                            name="email"
                            value={ email }
                            onChange={ onInputChange }
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Password"
                            type="password"
                            autoComplete="current-passsword"
                            placeholder="Password"
                            fullWidth
                            name="password"
                            value={ password }
                            onChange={ onInputChange }
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

                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                                disabled={ isCheckingAuthentication }
                                type='submit' 
                                variant="contained" 
                                fullWidth
                                >
                                    Login
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button
                                disabled={ isCheckingAuthentication }
                                variant="contained" 
                                fullWidth
                                onClick={ onGoogleSignIn }
                            >
                            <Google />
                            <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction={'row'} justifyContent='end'>
                        <IconLink></IconLink>
                        <Link component={ RouterLink } color='inherit' to="/auth/register" ml={ 1 }>
                        Create account
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
