import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function Index() {
  const [initKey] = useState("initKey");
  const initList = useDebouncedCallback(() => {
    console.log(123);
  }, 0);
  useEffect(() => {
    initList();
  }, [initKey, initList]);
  return <div></div>;
}

export default Index;
