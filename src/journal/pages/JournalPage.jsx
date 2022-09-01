import { AddOutlined } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView } from '../views';
import { NoteView } from '../views';

export const JournalPage = () => {
    return (
        <JournalLayout>
            {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro at iure ratione laboriosam id inventore blanditiis optio saepe exercitationem pariatur, tempore animi placeat suscipit sit, repellendus eos ex veniam molestiae.</Typography> */}
            
            <NothingSelectedView />

            <IconButton
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined  sx={{ fontSize: 30 }}/>
            </IconButton>
            {/* <NoteView /> */}
        </JournalLayout>
    )
}
