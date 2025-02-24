import React, { useState, useRef, useEffect } from 'react';
import { VscTerminalUbuntu } from "react-icons/vsc";
import { BsFillFolderFill } from "react-icons/bs";

import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Resume from './sections/Resume';

function Terminal() {
    const [route, setRoute] = useState('/');
    const [inputValue, setInputValue] = useState('');
    const [output, setOutput] = useState([]);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [suggestions, setSuggestions] = useState([]); // State for autosuggestions
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const inputRef = useRef(null);
    const outputRef = useRef(null);

    const routes = {
        "/": { rname: "~", page: null },
        "/about": { rname: "$about/", page: <About /> },
        "/skills": { rname: "$skills/", page: <Skills /> },
        "/projects": { rname: "$projects/", page: <Projects /> },
        "/education": { rname: "$education/", page: <Education /> },
        "/resume": { rname: "$resume/", page: <Resume /> },
    };

    const commands = {
        list: "Available routes: about, skills, projects, education, resume",
        select: "Usage: select <route> - Navigates to the specified route",
        clear: "Clears the terminal and resets to the root route",
        show: "Renders the current route's component",
        help: "Available commands: list, select, clear, show, help",
        home: "Navigates back to the home route without clearing the terminal.",
    };

    // Load command history from localStorage on initial render
    useEffect(() => {
        const savedHistory = localStorage.getItem('commandHistory');
        if (savedHistory) {
            setCommandHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Save command history to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('commandHistory', JSON.stringify(commandHistory));
    }, [commandHistory]);

    // Handle command execution
    const handleCommand = (command) => {
        const args = command.split(' ');
        const cmd = args[0];
        const param = args[1];

        switch (cmd) {
            case 'list':
                setOutput((prev) => [
                    ...prev,
                    <div>
                        <span className="font-bold">{cmd}</span> {commands.list}
                    </div>,
                ]);
                break;

            case 'select':
                if (param && routes[`/${param}`]) {
                    setRoute(`/${param}`);
                    setOutput((prev) => [
                        ...prev,
                        <div>
                            <span className="font-bold">{cmd}</span> {param} - Navigated to {param}
                        </div>,
                    ]);
                } else {
                    setOutput((prev) => [
                        ...prev,
                        <div>
                            <span className="font-bold">{cmd}</span> {param} - Invalid route
                        </div>,
                    ]);
                }
                break;

            case 'clear':
                setRoute('/');
                setOutput([]);
                break;

            case 'home':
                setRoute('/');
                setOutput((prev) => [
                    ...prev,
                    <div>
                        <span className="font-bold">{cmd}</span> - Navigated back to home
                    </div>,
                ]);
                break;

            case 'show':
                if (routes[route].page) {
                    setOutput((prev) => [
                        ...prev,
                        <div>
                            <span className="font-bold">{cmd}</span> - Rendering {routes[route].rname}
                        </div>,
                        routes[route].page,
                    ]);
                } else {
                    setOutput((prev) => [
                        ...prev,
                        <div>
                            <span className="font-bold">{cmd}</span> - No component to show for the current route
                        </div>,
                    ]);
                }
                break;

            case 'help':
                setOutput((prev) => [
                    ...prev,
                    <div>
                        <span className="font-bold">{cmd}</span> Available commands:
                        <ul>
                            {Object.entries(commands).map(([command, description]) => (
                                <li key={command}>
                                    <span className="font-bold">{command}</span>: {description}
                                </li>
                            ))}
                        </ul>
                    </div>,
                ]);
                break;

            default:
                setOutput((prev) => [
                    ...prev,
                    <div>
                        <span className="font-bold">{cmd}</span> - Command not found. Type 'help' for a list of commands.
                    </div>,
                ]);
                break;
        }

        // Add the command to the history
        if (command.trim()) {
            setCommandHistory((prev) => [...prev, command]);
            setHistoryIndex(commandHistory.length); // Reset index to the end
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Update suggestions based on input
        if (value.trim()) {
            const matchingCommands = Object.keys(commands).filter((cmd) =>
                cmd.startsWith(value)
            );
            setSuggestions(matchingCommands);
        } else {
            setSuggestions([]);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        const args = inputValue.split(' ');
        const cmd = args[0];
        const v = args[1];
        setOutput((prev) => [
            ...prev,
            <div className="flex items-center gap-2 text-white text-[12px]">
                <span className="rotate-infinite text-lg text-white">
                    <VscTerminalUbuntu />
                </span>
                mrityunjaymaharana@Mrityunjays-Portfolio ~ % {routes[route].rname}{' '}
                <span className="text-white"><span className='text-yellow-500 font-bold'>{cmd}</span> {v}</span>
            </div>,
        ]);
        handleCommand(inputValue);
        setInputValue('');
        setSuggestions([]); // Clear suggestions after submission
    };

    // Handle Up and Down Arrow Keys
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp') {
                // Move to the previous command in history
                if (historyIndex > 0) {
                    const newIndex = historyIndex - 1;
                    setHistoryIndex(newIndex);
                    setInputValue(commandHistory[newIndex]);
                }
            } else if (e.key === 'ArrowDown') {
                // Move to the next command in history
                if (historyIndex < commandHistory.length - 1) {
                    const newIndex = historyIndex + 1;
                    setHistoryIndex(newIndex);
                    setInputValue(commandHistory[newIndex]);
                } else if (historyIndex === commandHistory.length - 1) {
                    // Clear the input when reaching the end
                    setHistoryIndex(commandHistory.length);
                    setInputValue('');
                }
            } else if (e.key === 'Tab') {
                // Autocomplete command
                e.preventDefault();
                if (suggestions.length > 0) {
                    setInputValue(suggestions[0]);
                }
            }
        };

        const inputElement = inputRef.current;
        inputElement.addEventListener('keydown', handleKeyDown);

        return () => {
            inputElement.removeEventListener('keydown', handleKeyDown);
        };
    }, [commandHistory, historyIndex, inputValue, suggestions]);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [output]);

    // Parse the input to bold the main command
    const renderStyledCommand = (input) => {
        const args = input.split(' ');
        const cmd = args[0];
        const param = args.slice(1).join(' ');

        return (
            <span>
                <span className="font-bold">{cmd}</span> {param}
            </span>
        );
    };

    return (
        <div className="main_terminal min-h-[93vh] rounded-2xl border-1 border-slate-500 bg-slate-950 shadow-2xl shadow-slate-900 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-[12px] h-[12px] rounded-full bg-red-400"></div>
                    <div className="w-[12px] h-[12px] rounded-full bg-amber-400"></div>
                    <div className="w-[12px] h-[12px] rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-blue-400">
                        <BsFillFolderFill />
                    </span>
                    <span className="text-slate-500 font-bold">
                        mrityunjays-terminal-.portfolio - {windowSize.width} x {windowSize.height}
                    </span>
                </div>
            </div>

            <div className='terminal mb-5 mt-5'>
                <div className=' text-white'>
                    -- mrityunjays <span className='font-bold text-yellow-500'>terminal</span> --
                    <br />
                    -- run <span className='font-bold text-yellow-500'>help</span> command to see all available commands --
                </div>
            </div>

            <div className="terminal h-full flex flex-col gap-3">
                {/* Output Area */}
                <div ref={outputRef} className="output-area max-h-[65vh] flex-1 overflow-y-auto overflow-x-auto">
                    {output.map((line, index) => (
                        <div key={index} className="text-white text-[12px]">
                            {line}
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2 w-full">
                    <div className="flex items-center gap-2 text-[12px] text-white whitespace-nowrap flex-shrink-0">
                        <span className="rotate-infinite text-lg text-pink-600">
                            <VscTerminalUbuntu />
                        </span>
                        <span className="hidden sm:inline">mrityunjaymaharana@Mrityunjays-Portfolio ~ %</span>
                        <span className="sm:hidden">~ %</span>
                        <span className="font-bold">{routes[route].rname}</span>
                    </div>

                    <div className="relative flex-1 min-w-[150px]">
                        <div className="absolute top-1 left-0 text-yellow-500 text-[12px] pointer-events-none whitespace-nowrap">
                            {renderStyledCommand(inputValue)}
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="w-full terminal-input text-transparent text-[12px] outline-none caret-amber-50 bg-transparent"
                            autoFocus
                        />
                        {suggestions.length > 0 && (
                            <div className="absolute top-6 left-0 bg-slate-800 border border-slate-700 rounded-md w-full max-h-[100px] overflow-y-auto z-10">
                                {suggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="p-1 text-white text-[12px] hover:bg-slate-700 cursor-pointer"
                                        onClick={() => {
                                            setInputValue(suggestion);
                                            setSuggestions([]);
                                        }}
                                    >
                                        {suggestion}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Terminal;