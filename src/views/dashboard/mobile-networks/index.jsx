import React, { useState, useEffect } from "react";
import { Button, Grid, IconButton, Box, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import AddIcon from "@mui/icons-material/Add";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
// import {
//   getAbstractCategory,
//   getAbstractCategoryShow,
//   getAbstractCategoryDelete,
// } from "store/slices/abstractCategory";
import { useTheme } from "@mui/material/styles";
import { ThemeMode } from "config";
import AddCategoryForm from "./AddCategoryForm";
import AbstractCategoryViewModel from "./AbstractCategoryViewModel";
import EditCategoryForm from "./EditCategoryForm";

const CategoryTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  // const { abstractCategory } = useSelector((state) => state.abstractCategory);

  const [openAddIssueForm, setOpenAddIssueForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [viewModelOpen, setViewModelOpen] = useState(false);
  const [abstractCategoryShowId, setAbstractCategoryShowId] = useState(null); 

  // useEffect(() => {
  //   const eventid = localStorage.getItem("eventId");
  //   dispatch(getAbstractCategory(eventid));
  // }, [dispatch]);

  const handleOpenAddCategoryForm = () => {
    setOpenAddIssueForm(true);
  };

  const handleOpenEditForm = (id) => {
    setSelectedItemId(id);
    setOpenEditForm(true);
  };

  const handleCloseAddForm = () => {
    setOpenAddIssueForm(false);
  };

  const handleDeleteClick = (id) => {
    dispatch(getAbstractCategoryDelete(id));
  };

  const handleViewClick = (id) => {
    setAbstractCategoryShowId(id);
    setViewModelOpen(true);
    dispatch(getAbstractCategoryShow(id));
  };

  const handleCloseEditForm = () => {
    setOpenEditForm(false);
  };

  const handleCloseCategoryViewModel = () => {
    setViewModelOpen(false);
    setAbstractCategoryShowId(null);
  };

  const columns = [
    { name: "id", label: "ID" },
    { name: "title", label: "Title" },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value}
            size="small"
            sx={{
              bgcolor:
                value === "Active"
                  ? theme.palette.mode === ThemeMode.DARK
                    ? "dark.main"
                    : "success.light"
                  : theme.palette.mode === ThemeMode.DARK
                    ? "dark.main"
                    : "error.light",
              color:
                value === "Active"
                  ? theme.palette.mode === ThemeMode.DARK
                    ? "success.main"
                    : "success.dark"
                  : theme.palette.mode === ThemeMode.DARK
                    ? "error.main"
                    : "error.dark",
              borderRadius: "20px",
              padding: "0 10px",
              textAlign: "center",
            }}
          />
        ),
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta) => (
          <Box display="flex" justifyContent="left">
            <IconButton
              color="primary"
              size="large"
              aria-label="View"
              onClick={() => handleViewClick(tableMeta.rowData[0])}
            >
              <VisibilityTwoToneIcon sx={{ fontSize: "1.rem" }} />
            </IconButton>
            <IconButton
              color="secondary"
              size="large"
              aria-label="Edit"
              onClick={() => handleOpenEditForm(tableMeta.rowData[0])}
            >
              <EditTwoToneIcon sx={{ fontSize: "1.3rem" }} />
            </IconButton>
            <IconButton
              color="primary"
              size="large"
              aria-label="item-Delete"
              onClick={() => handleDeleteClick(tableMeta.rowData[0])}
            >
              <DeleteTwoToneIcon />
            </IconButton>
          </Box>
        ),
      },
    },
  ];

  const options = {
    filterType: "checkbox",
  };

  // const data = abstractCategory.map((item) => ({
  //   id: item.id,
  //   title: item.title,
  //   status: item.status === 1 ? "Active" : "Inactive",
  // }));

  return (
    <div>
      <Grid container spacing={2} justifyContent="flex-end" mb={3}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenAddCategoryForm}
          >
            ADD NEW
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Grid>
      </Grid>
      <MUIDataTable
        title={<span style={{ fontWeight: "bold",fontSize:"29px"}}>Abstracts Categories</span>}
        // data={data}
        columns={columns}
        options={options}
      />
      {openAddIssueForm && (
        <AddCategoryForm
          open={openAddIssueForm}
          handleClose={handleCloseAddForm}
        />
      )}
      {viewModelOpen && (
        <AbstractCategoryViewModel
          open={viewModelOpen}
          handleClose={handleCloseCategoryViewModel}
          abstractCategoryShowId={abstractCategoryShowId}
        />
      )}
      {openEditForm && (
        <EditCategoryForm
          open={openEditForm}
          handleClose={handleCloseEditForm}
          abstractCategoryShowId={selectedItemId}
        />
      )}
    </div>
  );
};

export default CategoryTable;
