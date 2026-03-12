const fs = require('fs');
const path = 'client/src/pages/home.tsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /<div id="elevate-your-business" className="(.*?)bg-white\/90 dark:bg-\[#0f1f3d\] dark:opacity-95 shadow-\[inset_0_4px_8px_rgba\(0,0,0,0\.2\),inset_0_-4px_8px_rgba\(255,255,255,0\.7\)\] dark:shadow-\[inset_0_8px_16px_rgba\(2,6,23,0\.96\),inset_0_-4px_8px_rgba\(148,163,184,0\.04\)\]"(.*?)\/>/g;

content = content.replace(regex, '<div id="elevate-your-business" className="$1bg-white/90 dark:bg-[#0f1f3d]/95 shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-4px_8px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_4px_8px_rgba(2,6,23,0.96),inset_0_-4px_8px_rgba(148,163,184,0.04)]"$2/>');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed elevate!');
