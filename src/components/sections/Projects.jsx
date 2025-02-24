import React from 'react';

const Projects = () => {
    return (
        <div className="text-white p-4">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>

            <div className="mb-6">
                <h3 className="text-xl font-semibold">Sorting Visualizer</h3>
                <p className="text-sm text-gray-300">React / Sorting Algorithms / JavaScript / CSS / Git (September 2024)</p>
                <p className="mt-2">
                    Developed an interactive sorting visualizer using React to demonstrate various sorting algorithms with real-time animations.  
                    Implemented Bubble Sort, Merge Sort, and Quick Sort while managing state for dynamic updates.  
                    Designed a user-friendly interface with customizable settings to improve the learning experience.  
                    Enhanced user interaction with controls for sorting actions (start, pause, reset) and clear visual feedback.
                </p>
            </div>

            <div>
                <h3 className="text-xl font-semibold">ATS Resume Tracker</h3>
                <p className="text-sm text-gray-300">Python / Streamlit / LLM(GenAI) / Gemini API (August 2024)</p>
                <p className="mt-2">
                    Built an ATS resume analysis tool using Streamlit with an intuitive UI.  
                    Integrated Google Generative AI for resume evaluation and implemented PDF processing with pdf2image.  
                    Designed multiple analysis features that visually display resumes, provide skill improvement suggestions,  
                    and evaluate the percentage match against job descriptions.
                </p>
            </div>
        </div>
    );
};

export default Projects;
