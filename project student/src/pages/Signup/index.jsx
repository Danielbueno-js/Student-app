import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  Backdrop,
  Box,
  Button,
  Container,
  CircularProgress,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { initialValues, Schema } from "./schema";
import Password from "../../components/Password";
import { Required } from "../../components/Required";


const Signup = () => {
  const [error, setError] = useState("");
  const { signup } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(Schema),
    defaultValues: initialValues,

  });

  const onSubmit = async (value) => {
    const { response } = await signup(value);
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
      <Box component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}>
        <Container maxWidth="sm">
          <Box component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <Box sx={{ my: 3, pt: 8 }}>
              <Typography
                color="textPrimary"
                variant="h4"
                align="center"
              >
                SISTEMA DE LOGIN
              </Typography>
            </Box>
            <div>
              <TextField
                fullWidth
                // Nome + <Required />
                label={<Required text={'Nome'} />}
                type="text"
                error={errors.name}
                helperText={errors.name && errors.name.message}
                {...register('name')}
              />
              {Boolean(error) && (
                <FormHelperText error>{error}</FormHelperText>
              )}
            </div>
            <Password
              type="text"
              label={<Required text={'Senha'} />}
              error={errors.password}
              helperText={errors.password && errors.password.message}
              register={register('password')}
            />
            <Password
              type="password"
              label={<Required text={'Confirmar senha'} />}
              error={errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              register={register('confirmPassword')}
            />
            <Box sx={{ my: 2 }}>
              <Typography color="textSecondary" variant="body1">
                Já tem uma conta? <Link to="/">&nbsp;Entrar</Link>
              </Typography>
            </Box>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={isSubmitting}

            >
              Inscrever-se
            </Button>
          </Box>

        </Container>

      </Box>
    </>

  );
};

export default Signup;
