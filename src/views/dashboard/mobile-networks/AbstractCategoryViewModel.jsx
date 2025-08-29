import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
// import { getAbstractCategoryShow } from "store/slices/abstractCategory";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AbstractCategoryViewModel = ({
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

  if (!abstractCategoryShow || !abstractCategoryShowId) return null;

  return (
    <BootstrapDialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ maxWidth: 500, padding: 2 }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 5, top: 5 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h2"
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            ID: {abstractCategoryShow.id}
          </Typography>
          <Typography
            variant="h3"
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            Title: {abstractCategoryShow.title}
          </Typography>
          <Typography variant="h5" sx={{ marginTop: 2, marginBottom: 1 }}>
            Descriptions: {abstractCategoryShow.description}
          </Typography>
        </Card>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default AbstractCategoryViewModel;
