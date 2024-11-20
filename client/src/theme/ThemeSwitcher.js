import { useState, useEffect } from "react";
// import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { SunIcon } from "./SunIcon";
import { MoonIcon } from "./MoonIcon";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  // const { theme, setTheme } = useTheme();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div>
      <div>
        <Switch
          defaultSelected={theme === "dark"}
          size="sm"
          color="secondary"
          startContent={<SunIcon />}
          endContent={<MoonIcon />}
          onChange={toggleTheme}
        ></Switch>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
