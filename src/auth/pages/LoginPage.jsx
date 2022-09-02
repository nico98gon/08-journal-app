import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Link, Typography, TextField, Button } from "@mui/material";
import { Google, Link as IconLink } from "@mui/icons-material";
import { checkingAuthentication, startGoogleSignIn } from "../../store/auth";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";

export const LoginPage = () => {

    const { status } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const { email, password, onInputChange } = useForm({
        email: 'nicodevelo@gmail.com',
        password: '123456'
    });

    const isAuthenticating = useMemo( () => status === 'checking', [status] );

    const onSubmit = ( event ) => {
        event.preventDefault();
        dispatch( checkingAuthentication() );
        // console.log({ email, password });
    }

    const onGoogleSignIn = () => {
        dispatch( startGoogleSignIn() );
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
                            type="current-password"
                            placeholder="Password"
                            fullWidth
                            name="password"
                            value={ password }
                            onChange={ onInputChange }
                        />
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                                disabled={ isAuthenticating }
                                type='submit' 
                                variant="contained" 
                                fullWidth
                                >
                                    Login
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button
                                disabled={ isAuthenticating }
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
