import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="container justify-center content-center flex pt-48">
      <div className="content content-center">
        Oh, no this page doens't found
        <div className="buttonGoHome content-center">
          <Link to="/">go to home</Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
