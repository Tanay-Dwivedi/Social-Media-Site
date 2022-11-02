import React, { useEffect } from "react";
function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
    console.log();
  }, []);

  return (
    <div>
      <h1>Thanks for Logging In</h1>
      <br />
      <p>Redirecting back to HI-CON</p>
    </div>
  );
}

export default LoginSuccess;
