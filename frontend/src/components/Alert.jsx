import React from "react";

function Alert({ alert }) {
  const captalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{ height: "50px" }}>
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissable fade show`}
          role="alert"
        >
          <strong>{captalize(alert.type)}</strong>:{alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
