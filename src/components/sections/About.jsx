import React from 'react';

const About = () => {
    return (
        <div className="text-white p-4">
            <h2 className="text-xl font-bold">Mrityunjay Maharana</h2>
            <p>Email: <a href="mailto:mrityunjaymaharana8@gmail.com" className="text-blue-400">mrityunjaymaharana8@gmail.com</a></p>
            <p>Phone: +91 9692650975</p>
            <p>
                LinkedIn: <a href="https://www.linkedin.com/in/mrityunjay-maharana/" target="_blank" rel="noopener noreferrer" className="text-blue-400">LinkedIn</a>
            </p>
            <p>
                GitHub: <a href="https://github.com/MrityunjayMaharana" target="_blank" rel="noopener noreferrer" className="text-blue-400">GitHub</a>
            </p>
            <p>
                LeetCode: <a href="https://leetcode.com/u/MrityunjayMaharana/" target="_blank" rel="noopener noreferrer" className="text-blue-400">LeetCode</a>
            </p>
        </div>
    );
};

export default About;