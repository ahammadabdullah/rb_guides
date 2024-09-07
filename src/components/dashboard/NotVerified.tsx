import React from "react";

const NotVerified = () => {
  return (
    <div>
      <div className="bg-primary/[0.07] rounded-[12px] flex  flex-col justify-center  w-full p-10  h-[293px] items-center font-inter">
        <h3 className="text-4xl text-center font-bold font-clash">
          Your account is not verified yet. Please wait for the admin to verify
          your account.
        </h3>
      </div>
    </div>
  );
};

export default NotVerified;
