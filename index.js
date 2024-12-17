const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

// Replace with your Crowdin API token and project ID
const CROWDIN_API_TOKEN = core.getInput('token');
const PROJECT_ID = core.getInput('project_id');

// Base API URL for Crowdin
const CROWDIN_API_URL = `https://api.crowdin.com/api/v2/projects/${PROJECT_ID}/languages/progress`;

// Get the output directory from an environment variable or use the default
const OUTPUT_DIR = core.getInput('output_path') || './';

// Parse the languageRenameMap from the environment variable or use a default
let languageRenameMap;
try {
    languageRenameMap = JSON.parse(core.getInput('language_rename_map') || '{}');
} catch (err) {
    console.error('Error parsing language_rename_map input:', err.message);
    languageRenameMap = {};
}

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Function to fetch approved progress from Crowdin
async function fetchApprovedLanguageProgress() {
    try {
        console.log('Fetching approved language progress from Crowdin...');

        const response = await fetch(CROWDIN_API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${CROWDIN_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Extract and format approved progress data
        const approvedLanguages = data.data.map((entry) => {
            const lang = entry.data;

            // Check if the language name exists in the rename map
            const renamedName = languageRenameMap[lang.language.name] || lang.language.name;

            return {
                name: renamedName,
                progress: lang.approvalProgress, // Use 'approvalProgress' as 'progress'
                url: `https://crowdin.com/project/${PROJECT_ID}/56/${lang.language.id}`,
            };
        });

        // Filter out languages with zero approved progress
        const filteredLanguages = approvedLanguages.filter(
            (lang) => lang.progress > 0
        );

        return { languages: filteredLanguages };
    } catch (error) {
        console.error('Error fetching approved language progress:', error.message);
        return { languages: [] };
    }
}

// Function to generate the SVG content
function generateSVG(data) {
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="448" height="${20 + data.languages.length * 20}" xml:lang="en">`;
    svgContent += `
<defs>
<style type="text/css">@import url(https://translate.jellyfin.org/static/vendor/font-source/source-sans-3.css);</style>
</defs>
<g id="layer1">
`;

    let yPosition = 20; // Starting Y-coordinate

    data.languages.forEach(lang => {
        const { name, progress, url } = lang;

        // Determine bar width and color
        const barWidth = (progress / 100) * 150; // Scale to 150px
        const barColor = progress >= 90 ? '#2eccaa' : progress >= 50 ? '#38f' : '#f6664c';

        svgContent += `
<a xlink:href="${url}" xlink:title="${name}">
  <text xml:space="preserve" x="238" y="${yPosition}" style="font-style:normal;font-weight:normal;font-size:11px;font-family:'Source Sans 3',sans-serif;fill:#808080;text-anchor:end;">${name}</text>
  <text xml:space="preserve" x="408" y="${yPosition}" style="font-style:normal;font-weight:normal;font-size:11px;font-family:'Source Sans 3',sans-serif;fill:#808080">${progress}%</text>
  <rect x="248" y="${yPosition - 6}" width="${barWidth}" height="6" rx="2" style="fill:${barColor};fill-opacity:1;stroke:none"></rect>
</a>
`;

        yPosition += 15; // Increment position for the next language
    });

    svgContent += `
</g>
</svg>`;
    return svgContent;
}

// Main function to fetch data, save JSON, and generate SVG
async function main() {
    try {
        // Step 1: Fetch approved progress data from Crowdin
        const progressData = await fetchApprovedLanguageProgress();

        // Step 2: Save to output.json
        const jsonFilePath = path.join(OUTPUT_DIR, 'output.json');
        fs.writeFileSync(jsonFilePath, JSON.stringify(progressData, null, 2), 'utf-8');
        console.log(`Approved language progress saved to ${jsonFilePath}`);

        // Step 3: Generate and save SVG
        const svgFilePath = path.join(OUTPUT_DIR, 'badge.svg');
        const svgOutput = generateSVG(progressData);
        fs.writeFileSync(svgFilePath, svgOutput, 'utf-8');
        console.log(`SVG file successfully generated: ${svgFilePath}`);
    } catch (err) {
        console.error('Error during execution:', err.message);
    }
}

// Execute the script
main();
