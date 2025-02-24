import React from 'react';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Education from './Education';

const Resume = () => {
    return (
        <div className="text-white p-4">
            <h2 className="text-xl font-bold">Resume</h2>
            <About />
            <Skills />
            <Projects />
            <Education />
        </div>
    );
};

export default Resume