import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import * as React from 'react';
import { Seach } from "../../components/Seach";
import { TableCustom } from "../../components/Table";

const Home = () => {
    return (
        <Grid container spacing={1}>
            <Container maxWidth="xl">
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        //py: 8
                        mt: 2
                    }}
                >
                    <Container maxWidth={false}>
                        <Seach />
                    </Container>
                    <Box sx={{ mt: 1, pl: '24px', pr: '24px' }}>
                        <TableCustom />
                    </Box>
                </Box>
            </Container>
        </Grid>
    );
}

export default Home;




