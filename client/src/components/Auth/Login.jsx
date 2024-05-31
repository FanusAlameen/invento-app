import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../slices/auth/authSlice";
import AuthForm from "../reusables/AuthForm";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError } = useSelector((state) => state.auth);

  const onLogin = async (data) => {
    const resultAction = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/");
    } else {
      console.error(
        "Login Failed:",
        resultAction.payload || resultAction.error.message
      );
    }
  };

  return (
    <div className="min-h-screen w-full p-8 flex items-center justify-center bg-neutral">
      <AuthForm
        heading={"Login"}
        option={"Don't have an account?"}
        link={"/signup"}
        linkText={"Signup"}
        button={"Login"}
        action={onLogin}
        isLoading={isLoading}
        isError={isError}
        errorMessage="Incorrect username or password!"
      />
    </div>
  );
};

export default Login;
