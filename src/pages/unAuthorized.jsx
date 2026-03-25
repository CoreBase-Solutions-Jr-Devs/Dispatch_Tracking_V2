import { Link } from "react-router-dom";

function UnAuthorized() {
  return (
    <div className="flex flex-col items-center justify-center grow h-max">
      <div className="mb-10">
        <img
          className="dark:hidden max-h-[160px]"
          alt="image"
          src={"/media/illustrations/19.svg"}
        />
        <img
          className="hidden dark:block max-h-[160px]"
          alt="image"
          src={"/media/illustrations/19-dark.svg"}
        />
      </div>
      <span className="badge badge-primary badge-outline mb-3">
        400 Unauthorized
      </span>
      <h3 className="text-2xl font-semibold text-mono text-center mb-2">
        You have no authority to view this page
      </h3>
      <div className="text-base text-center text-secondary-foreground mb-10">
        The requested page is missing. Check the URL or&nbsp;
        <Link
          className="text-primary font-medium hover:text-primary-active"
          to="/overview"
          data-discover="true"
        >
          Return Home
        </Link>
        .
      </div>
    </div>
  );
}

export default UnAuthorized;
