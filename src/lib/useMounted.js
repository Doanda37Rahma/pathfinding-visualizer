import * as React from "react";

import { usePreloadState } from "./PreloadContext";

export default function useMounted() {
  const preloaded = usePreloadState();
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (preloaded) {
      setIsLoaded(true);
    } else {
      setTimeout(() => {
        setIsLoaded(true);
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloaded]);

  return isLoaded;
}
