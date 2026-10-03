import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/stores/theme.store';

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}
