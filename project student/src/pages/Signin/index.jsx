

import { Backdrop, Box, Button, CircularProgress, Container, FormHelperText, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { initialValues, Schema } from './schema';
import { yupResolver } from "@hookform/resolvers/yup";
import Password from '../../components/Password';
import { Required } from '../../components/Required';


const Login = () => {
  const { signin } = useAuth();
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: initialValues,
  });

  const onSubmit = async (value) => {
    const { response } = await signin(value)
    if (response?.data) {
      setError(response?.data?.msg);
    }
  };


  return (
    <>
      <Backdrop
        sx={{ color: '#1100ff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container maxWidth="sm">
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <Box sx={{ my: 3, pt: 15 }}>
              <Typography
                color="textPrimary"
                variant="h4"
                align="center"
              >
                Entrar
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
                align="center"
              >
                Faça login na plataforma interna
              </Typography>
            </Box>
            <TextField
              fullWidth
              label={<Required text={'Nome de usuário'} />}
              margin="normal"
              error={errors.name}
              helperText={errors.name?.message}
              {...register('name')}
              type="text"
              variant="outlined"
            />
            {Boolean(error) && (
              <FormHelperText error>{error}</FormHelperText>
            )}
            <Password
              fullWidth
              label={<Required text={'Senha'} />}
              margin="normal"
              register={register('password')}
              error={errors.password}
              helperText={errors.password?.message}
              type="password"
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              >
                Entrar
              </Button>
            </Box>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Não tem uma conta? {' '}
              <Link to="/signup">
                Inscrever-se
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
