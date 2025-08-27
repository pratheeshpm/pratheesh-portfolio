const fs = require('fs');
const path = require('path');

// Enhanced keyword extraction focused on algorithms and technical terms
function extractTechnicalKeywords(content) {
  const keywords = new Set();
  
  // Algorithm and data structure terms
  const algorithmTerms = [
    'dijkstra', 'bellman-ford', 'floyd-warshall', 'dfs', 'bfs', 'binary-search',
    'merge-sort', 'quick-sort', 'heap-sort', 'radix-sort', 'counting-sort',
    'hash-table', 'hash-map', 'binary-tree', 'b-tree', 'red-black-tree', 'avl-tree',
    'trie', 'suffix-tree', 'bloom-filter', 'skip-list', 'segment-tree', 'fenwick-tree',
    'union-find', 'disjoint-set', 'graph', 'tree', 'heap', 'stack', 'queue',
    'priority-queue', 'deque', 'linked-list', 'array', 'matrix', 'adjacency-list',
    'adjacency-matrix', 'topological-sort', 'tarjan', 'kosaraju', 'articulation-points',
    'bridges', 'shortest-path', 'minimum-spanning-tree', 'kruskal', 'prim',
    'ford-fulkerson', 'edmonds-karp', 'bipartite-matching', 'hungarian-algorithm',
    'knapsack', 'dynamic-programming', 'greedy', 'divide-conquer', 'backtracking',
    'two-pointers', 'sliding-window', 'prefix-sum', 'suffix-array'
  ];

  // System design terms
  const systemTerms = [
    'load-balancer', 'microservices', 'api-gateway', 'caching', 'redis', 'memcached',
    'database', 'sql', 'nosql', 'mongodb', 'postgresql', 'mysql', 'cassandra',
    'elasticsearch', 'kafka', 'rabbitmq', 'message-queue', 'pub-sub', 'websocket',
    'rest-api', 'graphql', 'grpc', 'oauth', 'jwt', 'authentication', 'authorization',
    'cdn', 'scaling', 'horizontal-scaling', 'vertical-scaling', 'sharding',
    'replication', 'master-slave', 'consistency', 'cap-theorem', 'acid', 'base',
    'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'serverless', 'lambda',
    'monitoring', 'logging', 'metrics', 'alerting', 'prometheus', 'grafana'
  ];

  // Frontend terms
  const frontendTerms = [
    'react', 'vue', 'angular', 'svelte', 'nextjs', 'nuxtjs', 'gatsby',
    'webpack', 'vite', 'rollup', 'babel', 'typescript', 'javascript',
    'css', 'scss', 'sass', 'tailwindcss', 'styled-components',
    'spa', 'ssr', 'ssg', 'hydration', 'code-splitting', 'lazy-loading',
    'state-management', 'redux', 'mobx', 'vuex', 'context-api',
    'virtual-dom', 'component', 'hook', 'lifecycle', 'props', 'state'
  ];

  const allTerms = [...algorithmTerms, ...systemTerms, ...frontendTerms];
  
  // Convert content to lowercase for case-insensitive matching
  const lowerContent = content.toLowerCase();
  
  // Find algorithm and technical terms
  allTerms.forEach(term => {
    const regex = new RegExp(`\\b${term.replace('-', '[-\\s]?')}\\b`, 'gi');
    if (regex.test(lowerContent)) {
      keywords.add(term);
    }
  });
  
  // Extract custom keywords from headers and emphasis
  const customMatches = [
    ...content.matchAll(/#{1,6}\s+([^#\n]+)/g),
    ...content.matchAll(/\*\*([^*]+)\*\*/g),
    ...content.matchAll(/`([^`]+)`/g),
  ];
  
  customMatches.forEach(match => {
    const text = match[1].trim().toLowerCase();
    if (text.length > 2 && text.length < 30 && !text.includes(' ')) {
      keywords.add(text);
    }
  });
  
  return Array.from(keywords).slice(0, 20);
}

function loadSystemDesignNotes() {
  const notes = [];
  
  // Helper function to read README files from a directory
  function readNotesFromDirectory(dirPath, designType) {
    try {
      if (!fs.existsSync(dirPath)) {
        console.log(`Directory does not exist: ${dirPath}`);
        return;
      }
      
      const folders = fs.readdirSync(dirPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
      
      folders.forEach(folderName => {
        const readmePath = path.join(dirPath, folderName, 'README.md');
        
        if (fs.existsSync(readmePath)) {
          try {
            const content = fs.readFileSync(readmePath, 'utf-8');
            
            // Extract title from first heading or use folder name
            const titleMatch = content.match(/^#\s+(.+)$/m);
            const topic = titleMatch ? titleMatch[1].trim() : folderName.replace(/-/g, ' ').replace(/^\d+\s*/, '');
            
            // Generate keywords from content
            const keywords = extractTechnicalKeywords(content);
            
            const note = {
              id: `${designType}-${folderName}`,
              topic: topic,
              content: content,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              keywords: keywords,
              isSystemDesign: true,
              designType: designType,
              folderName: folderName
            };
            
            notes.push(note);
          } catch (error) {
            console.error(`Error reading ${readmePath}:`, error);
          }
        }
      });
    } catch (error) {
      console.error(`Error reading directory ${dirPath}:`, error);
    }
  }
  
  // Define the paths relative to the function's location
  const functionsDir = __dirname;
  const projectRoot = path.join(functionsDir, '..', '..');
  const backendDir = path.join(projectRoot, 'src', 'components', 'pages', 'notes', 'api', 'backend-system-design');
  const frontendDir = path.join(projectRoot, 'src', 'components', 'pages', 'notes', 'api', 'frontend-system-design');
  
  // Load backend system design notes
  readNotesFromDirectory(backendDir, 'backend');
  
  // Load frontend system design notes  
  readNotesFromDirectory(frontendDir, 'frontend');
  
  return notes;
}

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Return all system design notes
      const notes = loadSystemDesignNotes();
      
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: true,
          data: notes
        })
      };
    }
    
    if (event.httpMethod === 'PUT') {
      // Handle updating a system design note
      const updatedNote = JSON.parse(event.body);
      
      if (!updatedNote.id || !updatedNote.folderName || !updatedNote.designType) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Missing required fields: id, folderName, designType'
          })
        };
      }
      
      // Construct the path to the README file
      const functionsDir = __dirname;
      const projectRoot = path.join(functionsDir, '..', '..');
      const designDir = updatedNote.designType === 'backend' ? 'backend-system-design' : 'frontend-system-design';
      const readmePath = path.join(
        projectRoot, 
        'src', 
        'components', 
        'pages', 
        'notes', 
        'api', 
        designDir,
        updatedNote.folderName,
        'README.md'
      );
      
      // Write the updated content to the README file
      fs.writeFileSync(readmePath, updatedNote.content, 'utf-8');
      
      // Update the timestamp
      updatedNote.updatedAt = new Date().toISOString();
      
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: true,
          data: updatedNote
        })
      };
    }
    
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Method not allowed'
      })
    };
    
  } catch (error) {
    console.error('Error in system-design-notes function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        details: error.message
      })
    };
  }
};
