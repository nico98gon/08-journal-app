import { Link as RouterLink } from "react-router-dom";
import { Grid, Link, Typography, TextField, Button } from "@mui/material";
import { Google, Link as IconLink } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
    return (
        <AuthLayout title="Register">
            <form>
                <Grid container>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                        label="Name"
                        type="text"
                        placeholder="Your Name"
                        fullWidth
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                        label="Email"
                        type="email"
                        placeholder="email@google.com"
                        fullWidth
                        />
                    </Grid>
                    
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                        label="Password"
                        type="current-password"
                        placeholder="Password"
                        fullWidth
                        />
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button variant="contained" fullWidth>
                                Create account
                            </Button>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button variant="contained" fullWidth>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
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
