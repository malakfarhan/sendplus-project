import React from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const networkOptions = ["Zong", "Telenor", "Ufone", "Jazz"];

const validationSchema = Yup.object({
  network: Yup.string().required("Select a network"),
  packageName: Yup.string().required("Package name is required"),
  packagePrice: Yup.string().required("Price is required"),
  details: Yup.string().required("Details are required"),
});

const MobileNetworkPackageForm = () => {
  const formik = useFormik({
    initialValues: {
      network: "",
      packageName: "",
      packagePrice: "",
      details: ""
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    }
  });

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Mobile Network Package Form
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              {/* Network Select */}
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Select Network</InputLabel>
                  <Select
                    name="network"
                    label="Select Network"
                    value={formik.values.network}
                    onChange={formik.handleChange}
                    error={formik.touched.network && Boolean(formik.errors.network)}
                  >
                    {networkOptions.map((network) => (
                      <MenuItem key={network} value={network}>
                        {network}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.network && formik.errors.network && (
                    <Typography color="error" variant="body2">
                      {formik.errors.network}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {/* Package Name */}
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  label="Package Name"
                  name="packageName"
                  value={formik.values.packageName}
                  onChange={formik.handleChange}
                  error={formik.touched.packageName && Boolean(formik.errors.packageName)}
                  helperText={formik.touched.packageName && formik.errors.packageName}
                />
              </Grid>

              {/* Package Price */}
              <Grid item  xs={12}>
                <TextField
                  fullWidth
                  label="Package Price"
                  name="packagePrice"
                  value={formik.values.packagePrice}
                  onChange={formik.handleChange}
                  error={formik.touched.packagePrice && Boolean(formik.errors.packagePrice)}
                  helperText={formik.touched.packagePrice && formik.errors.packagePrice}
                />
              </Grid>

              {/* Details */}
              <Grid item  xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Details"
                  name="details"
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  error={formik.touched.details && Boolean(formik.errors.details)}
                  helperText={formik.touched.details && formik.errors.details}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MobileNetworkPackageForm;
