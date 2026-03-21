import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const useBlockedGuard = () => {
  const { user } = useSelector((state) => state.auth);
  const isBlocked = user?.isBlocked === true;

  const guardAction = (callback) => {
    if (isBlocked) {
      toast.error("Your account is blocked. You cannot perform this action.");
      return;
    }
    callback();
  };

  return { isBlocked, guardAction };
};

export default useBlockedGuard;