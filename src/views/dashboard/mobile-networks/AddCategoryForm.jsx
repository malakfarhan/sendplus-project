import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Grid,
  Button,
  TextField,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import AnimateButton from "ui-component/extended/AnimateButton";
import { useDispatch } from "react-redux";
// import {
//   postAbstractCategory,
//   getAbstractCategory,
// } from "store/slices/abstractCategory";
import { openSnackbar } from "store/slices/snackbar";
import { gridSpacing } from "store/constant";

// Validation schema using Yup
const validationSchema = yup.object({
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category  is required"),
});

const AddCategoryForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      description: "",
      category: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("values", values);
      const eventid = localStorage.getItem("eventId");
      if (!eventid) {
        dispatch(
          openSnackbar({
            open: true,
            message: "Event ID not found",
            variant: "alert",
            alert: {
              color: "error",
            },
            close: false,
          })
        );
        return;
      }

      const payload = {
        title: values.category,
        descriptions: values.description,
        eventid: eventid,
      };

      dispatch(postAbstractCategory(payload))
        .then(() => {
          dispatch(
            openSnackbar({
              open: true,
              message: "Category added successfully",
              variant: "alert",
              alert: {
                color: "success",
              },
              close: false,
            })
          );
          dispatch(getAbstractCategory(eventid));
          handleClose();
        })
        .catch((error) => {
          dispatch(
            openSnackbar({
              open: true,
              message: "Error adding category",
              variant: "alert",
              alert: {
                color: "error",
              },
              close: false,
            })
          );
        });
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle sx={{fontSize:"29px", fontWeight:"bold"}}>Add Category</DialogTitle>
      <DialogContent>
        <Paper elevation={3} sx={{ p: 3, backgroundColor: "white" }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="category"
                  name="category"
                  label="Add Category"
                  placeholder="Category *"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                  helperText={formik.touched.category && formik.errors.category}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Add Descriptions"
                  placeholder="Description *"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="center">
                  <AnimateButton>
                    <Button variant="contained" type="submit" color="primary">
                      Add Category
                    </Button>
                  </AnimateButton>
                  <AnimateButton>
                    <Button variant="outlined" onClick={handleClose}>
                      Cancel
                    </Button>
                  </AnimateButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryForm;
