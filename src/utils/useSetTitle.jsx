import React, { useEffect } from "react";

function useSetTitle(title) {
  useEffect(() => {
    document.title = `${title} - Comfort++`;
  }, []);
}

export default useSetTitle;
