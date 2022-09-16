import React, { useEffect, useState } from "react";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-wrap w-full justify-between">
        <div className="w-[40%] px-2"></div>
        <div className="w-[50%] px-2"></div>
      </div>
    </div>
  );
};

export default App;
