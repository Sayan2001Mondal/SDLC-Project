// src/pages/user/DailyLogs.jsx
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Stack, TextField, Button, Typography } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchLogs, createLog, updateLog, deleteLog } from "../../api/dailylogs";

// Validation schema
const schema = yup.object({
  date: yup.string().required("Date is required"),
  food: yup.array().of(
    yup.object({
      name: yup.string().required("Food name is required"),
      calories: yup.number().required().positive(),
      protein: yup.number().required().min(0),
      carbs: yup.number().required().min(0),
      fat: yup.number().required().min(0),
      mealType: yup.string().required("Meal type is required"),
    })
  ),
  waterIntake: yup.number().required().min(0),
  workout: yup.string().required("Workout is required"),
  mood: yup.string().required("Mood is required"),
});

export default function DailyLogs() {
  const queryClient = useQueryClient();

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: "",
      food: [{ name: "", calories: "", protein: "", carbs: "", fat: "", mealType: "" }],
      waterIntake: "",
      workout: "",
      mood: "",
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "food",
  });

  // GET logs
  const { data: logs, isLoading, isError } = useQuery({
    queryKey: ["logs"],
    queryFn: fetchLogs,
  });

  // POST log
  const createMutation = useMutation({
    mutationFn: createLog,
    onSuccess: () => {
      toast.success("Log created!");
      queryClient.invalidateQueries(["logs"]);
      reset();
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to create log"),
  });

  // UPDATE log
  const updateMutation = useMutation({
    mutationFn: updateLog,
    onSuccess: () => {
      toast.success("Log updated!");
      queryClient.invalidateQueries(["logs"]);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to update log"),
  });

  // DELETE log
  const deleteMutation = useMutation({
    mutationFn: deleteLog,
    onSuccess: () => {
      toast.success("Log deleted!");
      queryClient.invalidateQueries(["logs"]);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to delete log"),
  });

  return (
    <Stack spacing={3} maxWidth={600} mx="auto" mt={5}>
      <Typography variant="h4" align="center">Daily Logs</Typography>

      {/* Create Form */}
      <form onSubmit={handleSubmit((data) => createMutation.mutate(data))}>
        <Stack spacing={2}>
          <TextField
            type="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            {...register("date")}
            error={!!errors.date}
            helperText={errors.date?.message}
          />

          <Typography variant="h6">Food</Typography>
          {fields.map((field, index) => (
            <Stack key={field.id} spacing={1}>
              <TextField label="Name" {...register(`food.${index}.name`)} />
              <TextField label="Calories" type="number" {...register(`food.${index}.calories`)} />
              <TextField label="Protein" type="number" {...register(`food.${index}.protein`)} />
              <TextField label="Carbs" type="number" {...register(`food.${index}.carbs`)} />
              <TextField label="Fat" type="number" {...register(`food.${index}.fat`)} />
              <TextField label="Meal Type" {...register(`food.${index}.mealType`)} />
            </Stack>
          ))}

          <Button onClick={() => append({ name: "", calories: "", protein: "", carbs: "", fat: "", mealType: "" })}>
            Add Food Item
          </Button>

          <TextField
            label="Water Intake (L)"
            type="number"
            {...register("waterIntake")}
            error={!!errors.waterIntake}
            helperText={errors.waterIntake?.message}
          />

          <TextField
            label="Workout"
            {...register("workout")}
            error={!!errors.workout}
            helperText={errors.workout?.message}
          />

          <TextField
            label="Mood"
            {...register("mood")}
            error={!!errors.mood}
            helperText={errors.mood?.message}
          />

          <Button type="submit" variant="contained" disabled={createMutation.isPending}>
            {createMutation.isPending ? "Saving..." : "Save Log"}
          </Button>
        </Stack>
      </form>

      {/* Logs List */}
      <Typography variant="h5" mt={5}>Your Logs</Typography>
      {isLoading && <p>Loading logs...</p>}
      {isError && <p>Failed to load logs</p>}
      {logs?.length === 0 && <p>No logs yet.</p>}
      {logs?.map((log) => (
        <Stack key={log._id} p={2} border="1px solid #ddd" borderRadius={2} mt={2}>
          <Typography><strong>Date:</strong> {new Date(log.date).toLocaleDateString()}</Typography>
          <Typography><strong>Workout:</strong> {log.workout}</Typography>
          <Typography><strong>Mood:</strong> {log.mood}</Typography>
          <Typography><strong>Water Intake:</strong> {log.waterIntake} L</Typography>

          <Typography mt={1}><strong>Food:</strong></Typography>
          {log.food.map((f, i) => (
            <Typography key={i}>🍴 {f.name} ({f.calories} cal, P:{f.protein} C:{f.carbs} F:{f.fat}) – {f.mealType}</Typography>
          ))}

          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="outlined"
              onClick={() =>
                updateMutation.mutate({ id: log._id, updates: { mood: "Updated mood!" } })
              }
            >
              Update
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => deleteMutation.mutate(log._id)}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
