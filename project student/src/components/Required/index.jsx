import { Typography } from "@mui/material";

export const Required = ({ children, text }) => {
    return (
        <Typography>
            {text} {' '}
            <Typography variant="caption" component="span" sx={{ color: 'error.main', fontSize: '15px' }}>
                *
            </Typography>
        </Typography>
    );
}




