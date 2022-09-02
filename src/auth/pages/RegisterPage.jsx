import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Link, Typography, TextField, Button } from "@mui/material";
import { Link as IconLink } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";

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

    const [formSubmitted, setFormSubmitted] = useState(false);
    
    const {
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm( formData, formValidations );
    
    const onSubmit = ( event ) => {
        event.preventDefault();
        setFormSubmitted(true);
        console.log(formState);
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
                        <Grid item xs={ 12 } sm={ 12 }>
                            <Button 
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
                        <Link component={ RouterLink } color='inherit' to="/auth/register" ml={ 1 }>
                        Do you have an account?
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
