import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useWorkoutsContext } from "../../hooks/useWorkoutContext";
import { useAuthContext } from "../../hooks/useAuthContext";

interface workoutProps {
  _id: string;
  title: string;
  reps: number;
  load: number;
  createdAt: string;
}

const WorkoutDetails: React.FC<workoutProps> = ({
  _id,
  title,
  reps,
  load,
  createdAt,
}) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const url = "http://localhost:4000/api/workouts/";
    const response = await fetch(url + _id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {load}
      </p>
      <p>
        <strong>reps: </strong>
        {reps}
      </p>
      <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-rounded" onClick={handleClick}>
        delete_forever
      </span>
    </div>
  );
};

export default WorkoutDetails;
