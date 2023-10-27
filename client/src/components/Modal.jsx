import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, useTheme } from "@mui/material";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import FlexBetween from "../components/FlexBetween";
import { MenuItem } from "@mui/material";

const ModalComponent = ({ open, onClose }) => {
  const theme = useTheme();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: theme.palette.background.default,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });
  const handleFormSubmit = (data) => {
    console.log("Form Data is", data);
  };

  const [newCategory, setNewCategory] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const categories = [
    {
      value: "Airtime",
      label: "Airtime",
    },
    {
      value: "Data",
      label: "Data",
    },
    {
      value: "Electricity",
      label: "Electricity",
    },
    {
      value: "Education",
      label: "Education",
    },
    {
      value: "Religion",
      label: "Religion",
    },
    {
      value: "Cooperatives",
      label: "Cooperatives",
    },
    {
      value: "Cable Subscription",
      label: "Cable Subscription",
    },
  ];

  return (
    <Modal open={open} onClose={onClose} style={{ overflow: "scroll" }}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Add New Bill Payment
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Please enter the necessary details.
        </Typography>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <FlexBetween>
            <TextField
              id="standard-select-currency"
              select
              label="Category"
              defaultValue="Airtime"
              helperText="Please select your Category"
              variant="outlined"
              sx={{ mb: "20px", mt: "20px" }}
              {...register("Category", { required: true, maxLength: 80 })}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              size="small"
              onClick={() => setNewCategory(!newCategory)}
              variant="contained"
              sx={{ mb: 4, backgroundColor: "orange" }}
            >
              Add New Category
            </Button>
          </FlexBetween>
          {newCategory && (
            <TextField
              required
              fullWidth
              id="payment"
              label="Category"
              name="payment"
              //   autoComplete=""
              autoFocus
              sx={{ mb: 2 }}
              {...register("Name of Biller", { required: true, maxLength: 80 })}
            />
          )}
          <Button
            onClick={() => setIsHidden(!isHidden)}
            variant="contained"
            fullWidth
            sx={{ mb: 2, backgroundColor: "orange" }}
          >
            Add Biller
          </Button>
          {isHidden && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="payment"
              label="Name of Biler"
              name="payment"
              autoFocus
              {...register("Name of Biller", { required: true, maxLength: 80 })}
            />
          )}
          <Button
            onClick={() => append({ option: "", amount: "" })}
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "orange", mb: "20px" }}
          >
            Add Options
          </Button>

          <ul>
            {fields.map((item, index) => (
              <li key={item.id}>
                <TextField
                  fullWidth
                  label="Option"
                  sx={{ mb: "20px" }}
                  {...register(`test.${index}.option`)}
                />
                <Controller
                  render={({ field }) => (
                    <TextField fullWidth label="Amount" {...field} />
                  )}
                  name={`test.${index}.amount`}
                  control={control}
                />
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "orange", mb: "10px", mt: "10px" }}
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
          <TextField
            margin="normal"
            required
            fullWidth
            id="desc"
            label="Transaction Description"
            name="desc"
            autoFocus
            {...register("Description", { required: true, maxLength: 80 })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "orange" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
