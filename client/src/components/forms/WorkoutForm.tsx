import { useState } from "react";
import { useWorkoutsContext } from "../../hooks/useWorkoutContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState<string>("");
  const [load, setLoad] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [error, setError] = useState<string | null>();
  const [emptyFields, setEmptyFields] = useState<Array<string>>([]);

  const { user } = useAuthContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!user) {
      setError("You must me logged in");
      return;
    }

    const workout = { title, load, reps };
    const url = "http://localhost:4000/api/workouts";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("new workout added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };
  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new workout</h3>

        <label>Excersize Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />
        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes("load") ? "error" : ""}
        />
        <label>Reps:</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes("reps") ? "error" : ""}
        />

        <button>Add workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default WorkoutForm;
