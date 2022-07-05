// this is for using hooks in class based components
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    let { state } = useLocation();
    let [param, setSearchParams] = useSearchParams();

    return <Component {...{ state, navigate, param }} {...props} />;
  };

  return Wrapper;
};
