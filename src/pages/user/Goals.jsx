// src/pages/user/Goals.jsx
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { 
  TextField, 
  Button, 
  Stack, 
  Typography, 
  MenuItem, 
  Card, 
  CardContent, 
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Chip
} from "@mui/material";
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Close as CloseIcon 
} from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import goalsApi, { fetchGoals, createGoal, updateGoal, deleteGoal } from "../../api/goalsApi";
import { useState } from "react";

// ✅ Validation schema
const schema = yup.object({
  goalType: yup
    .mixed()
    .oneOf(["weight loss", "muscle gain", "maintenance"], "Invalid goal type")
    .required("Goal type is required"),
  targetValue: yup.number().required("Target value is required").positive(),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().required("End date is required"),
  progress: yup.array().of(
    yup.object({
      date: yup.string().required(),
      weight: yup.number().required(),
      bodyFatPercentage: yup.number().required(),
      muscleMass: yup.number().required(),
      notes: yup.string().nullable(),
    })
  ),
});

export default function Goals() {
  const queryClient = useQueryClient();
  const [editingGoal, setEditingGoal] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);

  const { register, control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      goalType: "weight loss",
      targetValue: "",
      startDate: "",
      endDate: "",
      progress: [
        { date: "", weight: "", bodyFatPercentage: "", muscleMass: "", notes: "" }
      ],
    },
  });

  // ✅ Field array for progress
  const { fields, append, remove } = useFieldArray({
    control,
    name: "progress",
  });

  // ✅ GET goals query
  const { data: goals, isLoading, isError } = useQuery({
    queryKey: ["goals"],
    queryFn: fetchGoals,
  });

  // ✅ Create mutation
  const createMutation = useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      toast.success("Goal created successfully!");
      queryClient.invalidateQueries(["goals"]);
      reset();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to create goal");
    },
  });

  // ✅ Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateGoal(id, data),
    onSuccess: () => {
      toast.success("Goal updated successfully!");
      queryClient.invalidateQueries(["goals"]);
      setEditingGoal(null);
      reset();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update goal");
    },
  });

  // ✅ Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteGoal,
    onSuccess: () => {
      toast.success("Goal deleted successfully!");
      queryClient.invalidateQueries(["goals"]);
      setDeleteConfirmOpen(false);
      setGoalToDelete(null);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to delete goal");
    },
  });

  // ✅ Handle form submission (create or update)
  const onSubmit = (data) => {
    if (editingGoal) {
      updateMutation.mutate({ id: editingGoal._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  // ✅ Handle edit button click
  const handleEdit = (goal) => {
    setEditingGoal(goal);
    
    // Populate form with existing data
    setValue("goalType", goal.goalType);
    setValue("targetValue", goal.targetValue);
    setValue("startDate", goal.startDate.split('T')[0]); // Format date for input
    setValue("endDate", goal.endDate.split('T')[0]);
    setValue("progress", goal.progress || []);
  };

  // ✅ Handle cancel edit
  const handleCancelEdit = () => {
    setEditingGoal(null);
    reset();
  };

  // ✅ Handle delete confirmation
  const handleDeleteClick = (goal) => {
    setGoalToDelete(goal);
    setDeleteConfirmOpen(true);
  };

  // ✅ Confirm delete
  const handleConfirmDelete = () => {
    if (goalToDelete) {
      deleteMutation.mutate(goalToDelete._id);
    }
  };

  // ✅ Get goal type color
  const getGoalTypeColor = (goalType) => {
    switch (goalType) {
      case "weight loss": return "error";
      case "muscle gain": return "success";
      case "maintenance": return "primary";
      default: return "default";
    }
  };

  return (
    <Stack spacing={3} maxWidth={800} mx="auto" mt={5}>
      <Typography variant="h4" align="center">
        {editingGoal ? "Edit Goal" : "Create Goal"}
      </Typography>

      <Card sx={{ p: 2 }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {editingGoal && (
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Editing Goal</Typography>
                  <IconButton onClick={handleCancelEdit}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}

              <TextField
                select
                label="Goal Type"
                {...register("goalType")}
                error={!!errors.goalType}
                helperText={errors.goalType?.message}
                fullWidth
              >
                <MenuItem value="weight loss">Weight Loss</MenuItem>
                <MenuItem value="muscle gain">Muscle Gain</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
              </TextField>

              <TextField
                label="Target Value"
                type="number"
                {...register("targetValue")}
                error={!!errors.targetValue}
                helperText={errors.targetValue?.message}
                fullWidth
              />

              <TextField
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("startDate")}
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
                fullWidth
              />

              <TextField
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("endDate")}
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
                fullWidth
              />

              <Typography variant="h6">Progress Entries</Typography>
              {fields.map((field, index) => (
                <Card key={field.id} variant="outlined" sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1">Entry {index + 1}</Typography>
                      {fields.length > 1 && (
                        <Button 
                          size="small" 
                          color="error" 
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </Box>

                    <TextField
                      label="Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      {...register(`progress.${index}.date`)}
                      error={!!errors.progress?.[index]?.date}
                      helperText={errors.progress?.[index]?.date?.message}
                    />

                    <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={2}>
                      <TextField
                        label="Weight (kg)"
                        type="number"
                        {...register(`progress.${index}.weight`)}
                        error={!!errors.progress?.[index]?.weight}
                        helperText={errors.progress?.[index]?.weight?.message}
                      />

                      <TextField
                        label="Body Fat %"
                        type="number"
                        {...register(`progress.${index}.bodyFatPercentage`)}
                        error={!!errors.progress?.[index]?.bodyFatPercentage}
                        helperText={errors.progress?.[index]?.bodyFatPercentage?.message}
                      />

                      <TextField
                        label="Muscle Mass (kg)"
                        type="number"
                        {...register(`progress.${index}.muscleMass`)}
                        error={!!errors.progress?.[index]?.muscleMass}
                        helperText={errors.progress?.[index]?.muscleMass?.message}
                      />
                    </Box>

                    <TextField
                      label="Notes"
                      multiline
                      rows={2}
                      {...register(`progress.${index}.notes`)}
                    />
                  </Stack>
                </Card>
              ))}

              <Button
                variant="outlined"
                onClick={() => append({ 
                  date: new Date().toISOString().split('T')[0], 
                  weight: "", 
                  bodyFatPercentage: "", 
                  muscleMass: "", 
                  notes: "" 
                })}
              >
                Add Progress Entry
              </Button>

              <Box display="flex" gap={2}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                  fullWidth
                >
                  {createMutation.isPending || updateMutation.isPending 
                    ? "Saving..." 
                    : editingGoal 
                      ? "Update Goal" 
                      : "Create Goal"
                  }
                </Button>
                {editingGoal && (
                  <Button 
                    variant="outlined" 
                    onClick={handleCancelEdit}
                    fullWidth
                  >
                    Cancel
                  </Button>
                )}
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>

      {/* ✅ List Goals */}
      <Typography variant="h5">Your Goals ({goals?.length || 0})</Typography>
      
      {isLoading && (
        <Card>
          <CardContent>
            <Typography>Loading goals...</Typography>
          </CardContent>
        </Card>
      )}
      
      {isError && (
        <Card>
          <CardContent>
            <Typography color="error">Failed to load goals</Typography>
          </CardContent>
        </Card>
      )}
      
      {goals?.length === 0 && (
        <Card>
          <CardContent>
            <Typography color="text.secondary" align="center">
              No goals found. Create your first goal above!
            </Typography>
          </CardContent>
        </Card>
      )}

      {goals?.map((goal) => (
        <Card key={goal._id} sx={{ border: editingGoal?._id === goal._id ? '2px solid' : '1px solid', borderColor: editingGoal?._id === goal._id ? 'primary.main' : 'divider' }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  {goal.goalType.charAt(0).toUpperCase() + goal.goalType.slice(1)}
                </Typography>
                <Chip 
                  label={goal.goalType} 
                  color={getGoalTypeColor(goal.goalType)}
                  size="small"
                />
              </Box>
              <Box display="flex" gap={1}>
                <IconButton 
                  size="small" 
                  onClick={() => handleEdit(goal)}
                  disabled={editingGoal?._id === goal._id}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  size="small" 
                  color="error"
                  onClick={() => handleDeleteClick(goal)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>

            <Typography><strong>Target Value:</strong> {goal.targetValue}</Typography>
            <Typography>
              <strong>Duration:</strong> {new Date(goal.startDate).toLocaleDateString()} → {new Date(goal.endDate).toLocaleDateString()}
            </Typography>

            {goal.progress && goal.progress.length > 0 && (
              <Box mt={2}>
                <Typography variant="subtitle2" gutterBottom>
                  Progress Entries ({goal.progress.length})
                </Typography>
                <Stack spacing={1}>
                  {goal.progress.slice(0, 3).map((entry, index) => (
                    <Card key={index} variant="outlined" sx={{ p: 1 }}>
                      <Typography variant="caption" display="block">
                        {new Date(entry.date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        Weight: {entry.weight}kg | Body Fat: {entry.bodyFatPercentage}% | Muscle: {entry.muscleMass}kg
                      </Typography>
                      {entry.notes && (
                        <Typography variant="caption" color="text.secondary">
                          Notes: {entry.notes}
                        </Typography>
                      )}
                    </Card>
                  ))}
                  {goal.progress.length > 3 && (
                    <Typography variant="caption" color="text.secondary">
                      ... and {goal.progress.length - 3} more entries
                    </Typography>
                  )}
                </Stack>
              </Box>
            )}
          </CardContent>
          
          <CardActions>
            <Button 
              size="small" 
              startIcon={<EditIcon />}
              onClick={() => handleEdit(goal)}
              disabled={editingGoal?._id === goal._id}
            >
              {editingGoal?._id === goal._id ? "Editing..." : "Edit"}
            </Button>
            <Button 
              size="small" 
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteClick(goal)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* ✅ Delete Confirmation Dialog */}
      <Dialog 
        open={deleteConfirmOpen} 
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the goal "{goalToDelete?.goalType}"? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteConfirmOpen(false)}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete}
            color="error"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}