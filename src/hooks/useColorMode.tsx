'use client'

import { useModeTheme } from "@/storage";
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");
  const { setIsDarck } = useModeTheme();

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);

      setIsDarck ( colorMode === "dark" ? true : false )

  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
