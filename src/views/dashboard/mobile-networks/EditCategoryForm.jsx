import React, { useEffect } from "react";
import {
  Button,
  Typography,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import AnimateButton from "ui-component/extended/AnimateButton";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "store/slices/snackbar";
import { gridSpacing } from "store/constant";
// import {
//   getAbstractCategoryShow,
//   updateAbstractCategory,
//   getAbstractCategory,
// } from "store/slices/abstractCategory";

// Validation schema using Yup
const validationSchema = yup.object({
  addCategory: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  status: yup.string().required("Status is required"),
});

const EditCategoryForm = ({
  open,
  handleClose,
  abstractCategoryShowId,
}) => {
  const dispatch = useDispatch();

  const abstractCategoryShow = useSelector(
    (state) => state.abstractCategory.abstractCategoryShow
  );

  useEffect(() => {
    if (abstractCategoryShowId) {
      dispatch(getAbstractCategoryShow(abstractCategoryShowId));
    }
  }, [dispatch, abstractCategoryShowId]);

  const formik = useFormik({
    enableReinitialize: true, // Enable reinitialization to update form values
    initialValues: {
      addCategory: abstractCategoryShow?.title || "",
      description: abstractCategoryShow?.descriptions || "",
      status: abstractCategoryShow?.status === 1 ? "active" : "inactive",
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = {
        id: abstractCategoryShowId,
        title: values.addCategory,
        descriptions: values.description,
        status: values.status === "active" ? 1 : 0,
      };

      try {
        await dispatch(updateAbstractCategory(data));
        dispatch(
          openSnackbar({
            open: true,
            message: "Category Updated successfully",
            variant: "alert",
            alert: {
              color: "success",
            },
            close: false,
          })
        );
        const eventId = localStorage.getItem("eventId");
        dispatch(getAbstractCategory(eventId));
        handleClose();
      } catch (error) {
        dispatch(
          openSnackbar({
            open: true,
            message: "Error: Category not Updated!",
            variant: "alert",
            alert: {
              color: "error",
            },
            close: false,
          })
        );
      }
    },
  });

  if (!open || !abstractCategoryShow || !abstractCategoryShowId) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle sx={{fontSize:"29px", fontWeight:"bold"}}>Abstract Categories</DialogTitle>
      <DialogContent>
        <Paper elevation={3} sx={{ p: 3, backgroundColor: "white" }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={gridSpacing}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                Edit Record of ID {abstractCategoryShowId}
              </Typography>
              <Typography variant="h5">
                Title: {abstractCategoryShow.title}
              </Typography>
              <Typography variant="body1">
                Please, edit the AbstractCategory of your requirements.
              </Typography>

              <TextField
                fullWidth
                id="addCategory"
                name="addCategory"
                label="Add Category"
                placeholder="Category *"
                value={formik.values.addCategory}
                onChange={formik.handleChange}
                error={
                  formik.touched.addCategory &&
                  Boolean(formik.errors.addCategory)
                }
                helperText={
                  formik.touched.addCategory && formik.errors.addCategory
                }
              />

              <TextField
                fullWidth
                id="description"
                name="description"
                label="Add Description"
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

              <FormControl fullWidth>
                <InputLabel id="status-label">Status *</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
                {formik.touched.status && formik.errors.status && (
                  <Typography variant="body2" color="error">
                    {formik.errors.status}
                  </Typography>
                )}
              </FormControl>

              <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 3 }}
                justifyContent="center"
              >
                <AnimateButton>
                  <Button variant="contained" type="submit" color="primary">
                    Update
                  </Button>
                </AnimateButton>
                <AnimateButton>
                  <Button variant="outlined" onClick={handleClose}>
                    Cancel
                  </Button>
                </AnimateButton>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryForm;
