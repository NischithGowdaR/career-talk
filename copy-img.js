const fs = require('fs');
const path = require('path');

const src = "C:\\Users\\nisch\\.gemini\\antigravity-ide\\brain\\06fe1fbf-baa0-45ad-b8f2-29081f7962b8\\ai_assistant_interviewing_candidate_1791097716420.jpg";
const dest1 = path.join(__dirname, 'public', 'ai_assistant_hero.jpg');
const dest2 = path.join(__dirname, 'public', 'hero_mockup.jpg');

fs.copyFileSync(src, dest1);
fs.copyFileSync(src, dest2);
console.log('Images successfully copied to public folder!');
