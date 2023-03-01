import React from "react";
import { useWorkoutsContext } from "../../hooks/useWorkoutContext";

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

  const handleClick = async () => {
    const url = "http://localhost:4000/api/workouts/";
    const response = await fetch(url + _id, { method: "DELETE" });
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
      <p>{createdAt}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default WorkoutDetails;
