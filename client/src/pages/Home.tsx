import { useEffect, useState } from "react";
import WorkoutForm from "../components/forms/WorkoutForm";
import WorkoutDetails from "../components/workout-details/WorkoutDetails";

const Home = () => {
  interface workoutProps {
    title: string;
    reps: number;
    load: number;
    createdAt: string;
  }

  const [workouts, setWorkouts] = useState<workoutProps[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts");
      const json = await response.json();

      if (response.ok) setWorkouts(json);
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts.map((workout: workoutProps, id) => {
          return (
            <div>
              <WorkoutDetails
                key={id}
                title={workout.title}
                reps={workout.reps}
                load={workout.load}
                createdAt={workout.createdAt}
              />
            </div>
          );
        })}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
