import { useEffect } from "react";
import WorkoutForm from "../components/forms/WorkoutForm";
import WorkoutDetails from "../components/workout-details/WorkoutDetails";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  interface workoutProps {
    _id: string;
    title: string;
    reps: number;
    load: number;
    createdAt: string;
  }

  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout: workoutProps, id: any) => {
            return (
              <div key={id}>
                <WorkoutDetails
                  _id={workout._id}
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
