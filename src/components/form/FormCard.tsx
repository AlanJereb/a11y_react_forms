import React from "react";

const FormCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={[
        "rounded-[1rem]",
        "bg-neutral-50",
        "p-[1rem]",
        "mx-auto",
        "min-w-[400px]",
        "max-w-[600px]",
        "text-center",
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default FormCard;
