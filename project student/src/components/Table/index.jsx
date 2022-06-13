import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Button,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "./utils";
import { deleteStudentById, getUsers } from "../../store/user";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";
import CustomizedModal from "../Modal";
import useAuth from "../../hooks/useAuth";

export const TableCustom = ({ customers, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const { student } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [studenProps, setStudentProps] = useState([]);
  const [data, setData] = useState([]);

  const getData = async () => {
    const data = await getUsers();
    setData(data?.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (student) {
      setData([student]);
    }
  }, [student]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const deleteStudent = async (id) => {
    const data = await deleteStudentById(id);
    if (data?.statusText) {
      setOpen(false)
      getData()
    }
  }


  return (
    <Card {...rest}>
      <CustomizedModal
        open={open}
        data={studenProps}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onConfirm={() => deleteStudent(selected)}
        title="Delete"

      />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>School</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0, limit).map((user, key) => (
                <TableRow
                  hover
                  key={key}
                >

                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar src={""} sx={{ mr: 2 }}>
                        {getInitials(user?.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {user?.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user?.age}</TableCell>
                  <TableCell>{`${user?.course}`}</TableCell>
                  <TableCell>{user?.school}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button variant="outlined"
                        onClick={() => {
                          setOpen(true)
                          setSelected(user?._id)
                          setStudentProps(user)
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          navigate(`/student/${user?._id}`);
                        }}
                      >
                        <ModeEditIcon />
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={data?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

// TableCustom.propTypes = {
//   customers: PropTypes.array.isRequired,
// };
