import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast, Toaster } from "sonner";

import "./styles.css";

export default function RegForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = Array.from(
    { length: 120 },
    (_, i) => new Date().getFullYear() - i
  );

  const onSubmit = (data) => {
    const { day, month, year } = data;
    const dateOfBirth = `${day} ${month} ${year}`;

    const postData = {
      ...data,
      date_of_birth: dateOfBirth,
    };
    try {
      axios.post(
        `https://fullstack-test-navy.vercel.app/api/users/create`,
        postData
      );
      //console.log("POST request successful:", response.data);

      toast.success("User Account Successfully created", {
        position: "top-right",
        style: {
          background: "#CDFADC",
        },
        className: "class",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("There was an error creating the account", {
        position: "top-right",
        style: {
          background: "#FFC0C0",
        },
        className: "class",
      });
    }
  };

  const handleCancel = () => {
    reset();
  };
  return (
    <>
      <Toaster />
      <h3>Create User Account</h3>
      <div className="container">
        <div className="innercontainer">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <label>First Name</label>
            <TextField
              sx={{ minWidth: "100%", marginBottom: "10px" }}
              variant="outlined"
              label="Full Name"
              fullWidth
              autoFocus
              {...register("full_name", {
                required: "Full Name is required",
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: "Only letters and spaces are allowed",
                },
              })}
              error={!!errors?.full_name}
              helperText={errors?.full_name ? errors.full_name.message : null}
            ></TextField>
            <label>Contact Number</label>
            <TextField
              sx={{ minWidth: "100%", marginBottom: "10px" }}
              varient="outlined"
              label="Contact Number"
              fullWidth
              autoFocus
              {...register("contact_number", {
                required: "Contact Number is required",
                pattern: {
                  value:
                    /^(\+?1[-.\s]?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})[-.\s]?[2-9][0-9]{2}[-.\s]?[0-9]{4}$/,
                  message: "Invalid phone number",
                },
              })}
              error={!!errors?.contact_number}
              helperText={
                errors?.contact_number ? errors.contact_number.message : null
              }
            ></TextField>
            <label>Birth Date</label>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Day</InputLabel>
                  <Controller
                    name="day"
                    control={control}
                    rules={{ required: "Day is required" }}
                    render={({ field }) => (
                      <Select {...field} defaultValue="" fullWidth>
                        {days.map((day) => (
                          <MenuItem key={day} value={day}>
                            {day}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Month</InputLabel>
                  <Controller
                    name="month"
                    control={control}
                    rules={{ required: "Month is required" }}
                    render={({ field }) => (
                      <Select {...field} defaultValue="" fullWidth>
                        {months.map((month, index) => (
                          <MenuItem key={index} value={month}>
                            {month}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Year</InputLabel>
                  <Controller
                    name="year"
                    control={control}
                    rules={{ required: "Year is required" }}
                    render={({ field }) => (
                      <Select {...field} defaultValue="" fullWidth>
                        {years.map((year) => (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <label>Email</label>
            <TextField
              sx={{ minWidth: "100%", marginBottom: "10px" }}
              varient="outlined"
              label="Email"
              fullWidth
              autoFocus
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message:
                    "Sorry, this email address is notvalid, please try again later",
                },
              })}
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
            ></TextField>
            <label>Password</label>
            <TextField
              sx={{ minWidth: "100%", marginBottom: "10px" }}
              variant="outlined"
              label="Password"
              type="password"
              fullWidth
              autoFocus
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, // Password pattern
                  message:
                    "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long",
                },
              })}
              error={!!errors?.password}
              helperText={errors?.password ? errors.password.message : null}
            ></TextField>
            <label>Confirm Password</label>
            <TextField
              sx={{ minWidth: "100%", marginBottom: "10px" }}
              variant="outlined"
              label="Confirm Password"
              type="password"
              fullWidth
              autoFocus
              {...register("confirm_password", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={!!errors?.confirm_password}
              helperText={
                errors?.confirm_password
                  ? errors.confirm_password.message
                  : null
              }
            ></TextField>

            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} lg={3}>
                <Button
                  type="submit"
                  sx={{ width: "100%" }}
                  variant="outlined"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} lg={3}>
                <Button
                  type="submit"
                  sx={{ width: "100%" }}
                  variant="contained"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
}
