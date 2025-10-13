'use client';
import { useTheme } from '@riffy/hooks';
import { Icon } from '@riffy/components';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-lg dark:bg-base-600 bg-base-400 dark:hover:bg-base-500 hover:bg-base-400 transition-colors"
      aria-label="Toggle theme"
      title={
        theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
      }
    >
      <span className="text-xl">
        {theme === 'dark' ? (
          <Icon name="sun" className="text-lg text-base-300" />
        ) : (
          <Icon name="moon" className="text-lg text-base-300" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
