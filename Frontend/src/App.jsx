import NavBar from "./components/layout/NavBar";
import { Outlet , Navigate } from "react-router-dom";
import { setUser, logOutUser } from "./store/authSlice";
import { fetchCurrentUser } from "./api/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Footer from "./components/layout/Footer";
import Loader from "./components/common/Loader";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.auth.loading);
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await fetchCurrentUser();
        if (user) dispatch(setUser(user));
        else dispatch(logOutUser());
      } catch (error) {
        dispatch(logOutUser());
      }
    };
    getUser();
  }, [dispatch]);
  const user = useSelector((store) => store.auth.user);

  if (user?.role === "admin") return <Navigate to="/admin" replace />;
  if (loading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
