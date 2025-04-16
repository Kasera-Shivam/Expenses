import React from "react";

const FormContailer = ({ children }) => {
  return (
    <section className="w-9/10 md:w-1/2 lg:w-2/5 xl:w-3/10">{children}</section>
  );
};

export default FormContailer;
