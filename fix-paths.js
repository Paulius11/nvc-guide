const fs = require('fs');
const path = require('path');

// Fix the HTML file paths for GitHub Pages
const htmlFile = path.join(__dirname, 'dist', 'index.html');

if (fs.existsSync(htmlFile)) {
  let content = fs.readFileSync(htmlFile, 'utf8');
  
  // Replace absolute paths with relative paths
  content = content.replace(/href="\/favicon\.ico"/g, 'href="./favicon.ico"');
  content = content.replace(/src="\/_expo/g, 'src="./_expo');
  
  fs.writeFileSync(htmlFile, content);
  console.log('✅ Fixed HTML paths for GitHub Pages');
} else {
  console.log('❌ HTML file not found');
}

// Fix JavaScript bundle paths for fonts and assets
try {
  const jsDir = path.join(__dirname, 'dist', '_expo/static/js/web');
  
  if (fs.existsSync(jsDir)) {
    const files = fs.readdirSync(jsDir);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    
    for (const file of jsFiles) {
      const jsFile = path.join(jsDir, file);
      let content = fs.readFileSync(jsFile, 'utf8');
      
      // Replace absolute font paths with relative paths
      // This handles paths like "/assets/node_modules/@expo/vector-icons/..." 
      content = content.replace(/\"\/assets\/node_modules\/@expo\/vector-icons/g, '"./node_modules/@expo/vector-icons');
      content = content.replace(/\"\/assets\/node_modules\/@react-navigation/g, '"./node_modules/@react-navigation');
      // Also handle direct "/node_modules/" paths
      content = content.replace(/\"\/node_modules\/@expo\/vector-icons/g, '"./node_modules/@expo/vector-icons');
      content = content.replace(/\"\/node_modules\/@react-navigation/g, '"./node_modules/@react-navigation');
      
      fs.writeFileSync(jsFile, content);
    }
    
    console.log('✅ Fixed JavaScript bundle paths for GitHub Pages');
  }
} catch (error) {
  console.log('⚠️ Could not fix JavaScript paths');
  console.log('Error:', error.message);
}