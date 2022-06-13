import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Backdrop,
  Box,
  Button,
  Container,
  CircularProgress,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { initialValues, Schema } from "./schema";
import { getStudentById } from "../../store/user";
import { Course, School } from "./utils.js";
import { registerStudent } from "../../store/user";
import { getAPIClient } from "../../data/service/axios";

const Signup = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [course, setCourse] = React.useState([]);
  const [school, setSchool] = React.useState([]);

  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitted }, setValue } = useForm({
    mode: 'all',
    shouldUnregister: false,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(Schema),
    defaultValues: initialValues,

  });

  useEffect(() => {
    (async () => {
      const studentNew = await getStudentById(id);
      if (studentNew?.statusText === "OK") {
        const { data } = studentNew;
        setValue("name", data?.name);
        setValue("age", data?.age);
        setCourse(data?.course);
        setSchool(data?.school);
      }
    })()
  }, [id, setValue]);

  const onSubmit = async (body) => {
    const { name, age } = body;
    let newBody = { name, age, course, school }
    if (id) {
      const api = getAPIClient();

      try {
        const data = await api.patch(`/${id}`, newBody);
       
        if (data.statusText === "OK") {
          navigate("/home");
        }
      } catch (error) {
        return error;
      }
    } else { createStudent(newBody) }
  };

  const createStudent = async (body) => {
    const response = await registerStudent(body);

    if (response.statusText === "Created") {
      navigate("/home");
    }
  }


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
            <Box >
              <Typography
                color="textPrimary"
                variant="h4"
                align="center"
              >
                {id ? `Editar` : "Cadastrar "}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: '20px'
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "90%",
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Nome"
                  type="text"
                  error={errors.name}
                  helperText={errors.name && errors.name.message}
                  {...register('name')}
                />
                {/* {Boolean(error) && (
                  <FormHelperText error>{error}</FormHelperText>
                )} */}
              </Box>
              <TextField
                placeholder={'Age'}
                type="number"
                error={errors.age}
                helperText={errors.age && errors.age.message}
                {...register('age')}
              />

            </Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Course</InputLabel>

              <Select
                label="Course"
                name="course"
                error={isSubmitted && course === ""}
                value={course}
                defaultValue={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                {
                  Course?.map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))
                }
              </Select>

              {isSubmitted && course === "" &&
                <FormHelperText color="red" sx={{ color: 'red' }}>
                  {'Campo obrigatório'}
                </FormHelperText>
              }
            </FormControl>

            <FormControl >
              <InputLabel id="demo-simple-select-label">School</InputLabel>


              <Select
                defaultValue={school}
                label="School"
                name="school"
                error={isSubmitted && school === ""}
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              >
                {
                  School?.map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))
                }
              </Select>
              {isSubmitted && school === "" &&
                <FormHelperText color="red" sx={{ color: 'red' }}>
                  {'Campo obrigatório'}
                </FormHelperText>
              }

            </FormControl>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={isSubmitting}

            >
              Cadastrar
            </Button>
          </Box>

        </Container>

      </Box>
    </>

  );
};

export default Signup;
