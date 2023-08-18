import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { asyncFetchUser, getUser } from "../store/user.reducer";
import { useDispatch } from "react-redux";

const useFetchUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useSelector((state: RootState) => getUser(state));
  const [isFetched, setIsFetched] = useState(false);
  const isSignedIn = !!userId;
  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(asyncFetchUser());
      setIsFetched(true);
    };
    if (!isSignedIn) {
      fetchUser();
    }
  }, [dispatch, isSignedIn]);
  return { isFetched, isSignedIn };
};

export default useFetchUser;
