
import React, { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const ThemeToggleButton: React.FC<{ theme: Theme; toggleTheme: () => void }> = ({ theme, toggleTheme }) => (
    <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-700/70 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle theme"
    >
        {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
    </button>
);

const App: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [piValue, setPiValue] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const root = window.document.documentElement;
        const isDark = theme === 'dark';
        root.classList.toggle('dark', isDark);
    }, [theme]);

    useEffect(() => {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleCalculatePi = useCallback(() => {
        setError(null);
        setPiValue(null);

        if (inputValue.trim() === '') {
            setError('Please enter a number.');
            return;
        }

        const n = Number(inputValue);

        if (isNaN(n) || !Number.isInteger(n) || n < 0 || n > 100) {
            setError('Please enter a whole number between 0 and 100.');
            return;
        }

        const calculatedPi = Math.PI.toFixed(n);
        setPiValue(calculatedPi);
    }, [inputValue]);
    
    return (
        <div className="font-poppins">
            <div className="relative min-h-screen w-full bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-blue-900/50 transition-colors duration-500">
                <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />

                <main className="flex items-center justify-center min-h-screen p-4">
                    <div className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/50">
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                                Pi Value Viewer
                            </h1>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                See π to your desired precision.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="decimal-places" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                    Decimal Places (0-100)
                                </label>
                                <input
                                    type="number"
                                    id="decimal-places"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleCalculatePi()}
                                    placeholder="e.g., 5"
                                    className="w-full px-4 py-2 text-gray-800 bg-white/70 dark:bg-gray-700/50 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>

                            <button
                                onClick={handleCalculatePi}
                                className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-transform duration-200 transform hover:scale-105"
                            >
                                Show π
                            </button>
                        </div>
                        
                        {error && (
                            <div className="p-3 text-center text-red-700 bg-red-100 dark:bg-red-900/50 dark:text-red-300 rounded-lg animate-fade-in">
                                {error}
                            </div>
                        )}

                        {piValue && (
                            <div key={piValue} className="pt-4 space-y-2 text-center animate-fade-in">
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Result</h2>
                                <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg break-all">
                                    <p className="text-xl md:text-2xl font-mono text-blue-800 dark:text-blue-300">
                                        {piValue}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                <footer className="text-centerabsolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Pi Value Viewer. All rights reserved.
                    <p>Developed by <a href="https://nihan-vp.me" target="_blank" rel="noopener noreferrer" className="text-gray-400 font-normal transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-teal-300">Nihan</a></p>
                </footer>
            </div>
        </div>
    );
};

export default App;
