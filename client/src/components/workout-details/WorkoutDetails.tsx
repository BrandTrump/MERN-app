import React from "react";

interface workoutProps {
  title: string;
  reps: number;
  load: number;
  createdAt: string;
}

const WorkoutDetails: React.FC<workoutProps> = ({
  title,
  reps,
  load,
  createdAt,
}) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>
        <strong>reps: </strong>
        {reps}
      </p>
      <p>
        <strong>Load (kg): </strong>
        {load}
      </p>
      <p>{createdAt}</p>
    </div>
  );
};

export default WorkoutDetails;
