import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (path: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

let changedFiles = 0;
walkDir('client/src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    const initial = content;

    // Replace text-white with text-foreground
    content = content.replace(/text-white\/(\d+)/g, 'text-foreground/$1');
    content = content.replace(/text-white\b/g, 'text-foreground');
    
    // Replace border-white with border-foreground
    content = content.replace(/border-white\/(\d+)/g, 'border-foreground/$1');
    content = content.replace(/border-white\b/g, 'border-foreground');

    // Replace bg-white with bg-foreground
    content = content.replace(/bg-white\/(\d+)/g, 'bg-foreground/$1');

    if (content !== initial) {
      fs.writeFileSync(filePath, content);
      changedFiles++;
    }
  }
});
