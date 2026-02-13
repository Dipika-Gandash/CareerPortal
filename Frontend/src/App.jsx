import NavBar from "./components/layout/NavBar";
import { Outlet } from "react-router-dom";
import { setUser, logOutUser } from "./store/authSlice";
import { fetchCurrentUser } from "./api/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.auth.loading);

  useEffect(() => {
    const getUser = async () => {
      const user = await fetchCurrentUser();
      if (user) dispatch(setUser(user));
      else dispatch(logOutUser());
    };
    getUser();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>; 

  return (
    <div>
      <NavBar />
      <Outlet /> 
    </div>
  );
}

export default App;
