import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../slices/auth/authSlice";
import AuthForm from "../reusables/AuthForm";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const resultAction = await dispatch(signupUser(data));

    if (signupUser.fulfilled.match(resultAction)) {
      navigate("/login");
    } else {
      console.error(
        "Signup Failed:",
        resultAction.payload || resultAction.error.message
      );
    }
  };

  return (
    <div className="min-h-screen w-full p-8 flex items-center justify-center bg-neutral">
      <AuthForm
        heading={"Sign Up"}
        option={"Already have an account?"}
        link={"/login"}
        linkText={"Login"}
        button={"Signup"}
        action={onSubmit}
        isLoading={isLoading}
        isError={isError}
        errorMessage="User already exists! Please Login."
      />
    </div>
  );
};

export default Signup;
