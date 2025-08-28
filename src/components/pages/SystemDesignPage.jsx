import { useState, useEffect } from 'react';
import SystemDesignNavbar from './systemdesign-comps/SystemDesignNavbar';
import { NotesModal } from './notes/NotesModal';

const SystemDesignPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [designTypeFilter, setDesignTypeFilter] = useState('all'); // 'all', 'backend', 'frontend'
  const [searchFilters, setSearchFilters] = useState({
    includeContent: true,
    includeKeywords: true,
    includeFilenames: true,
    caseSensitive: false,
  });

  useEffect(() => {
    fetchSystemDesignNotes();
    
    // Initialize search from URL parameters
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const searchParam = urlParams.get('search');
      if (searchParam) {
        setSearchTerm(searchParam);
      }
    }
  }, []);

  const fetchSystemDesignNotes = async () => {
    try {
      // Try local development first (for Vite dev server)
      let response;
      let result;
      
      try {
        response = await fetch('/api/system-design-notes.json');
        if (response.ok) {
          result = await response.json();
          console.log('✅ Loaded system design notes from local JSON');
        }
      } catch (localError) {
        console.log('Local JSON not found, trying Netlify function...');
        // Fall back to Netlify Functions (for production)
        response = await fetch('/.netlify/functions/system-design-notes');
        if (response.ok) {
          result = await response.json();
          console.log('✅ Loaded system design notes from Netlify function');
        }
      }
      
      if (result && result.success) {
        setNotes(result.data || []);
      } else {
        console.error('Failed to fetch system design notes');
        setNotes([]);
      }
    } catch (error) {
      console.error('Error fetching system design notes:', error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };







  // Handle search term change with URL updating  
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    updateSearchInURL(value);
  };

  // Update search in URL (optional for better UX)
  const updateSearchInURL = (searchValue) => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      if (searchValue.trim()) {
        url.searchParams.set('search', searchValue);
      } else {
        url.searchParams.delete('search');
      }
      window.history.replaceState({}, '', url);
    }
  };

  // Handle search filter change
  const handleFilterChange = (newFilters) => {
    setSearchFilters(newFilters);
  };

  const filteredNotes = notes.filter(note => {
    // Filter by design type
    if (designTypeFilter !== 'all' && note.designType !== designTypeFilter) {
      return false;
    }

    if (!searchTerm.trim()) {
      return true;
    }

    const searchText = searchFilters.caseSensitive ? searchTerm : searchTerm.toLowerCase();
    const noteText = searchFilters.caseSensitive ? note.topic : note.topic.toLowerCase();
    const contentText = searchFilters.caseSensitive ? note.content : note.content.toLowerCase();
    
    let matches = false;

    // Search in title/topic (always included)
    if (noteText.includes(searchText)) {
      matches = true;
    }

    // Search in content
    if (!matches && searchFilters.includeContent && contentText.includes(searchText)) {
      matches = true;
    }

    // Search in keywords
    if (!matches && searchFilters.includeKeywords && note.keywords) {
      const keywordMatches = note.keywords.some(keyword => {
        const keywordText = searchFilters.caseSensitive ? keyword : keyword.toLowerCase();
        return keywordText.includes(searchText);
      });
      if (keywordMatches) matches = true;
    }

    // Search in filename/folder
    if (!matches && searchFilters.includeFilenames && note.folderName) {
      const folderText = searchFilters.caseSensitive ? note.folderName : note.folderName.toLowerCase();
      if (folderText.includes(searchText)) {
        matches = true;
      }
    }

    return matches;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SystemDesignNavbar />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading system design...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SystemDesignNavbar />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">System Design</h1>
              <p className="text-lg text-gray-600">Comprehensive guides for backend and frontend system architecture</p>
              {/* Search Results Indicator */}
              {searchTerm && (
                <div className="mt-2 text-sm text-blue-600">
                  🔍 Searching for: "{searchTerm}" ({filteredNotes.length} results)
                </div>
              )}
            </div>
            
            {/* Search and Controls */}
            <div className="space-y-4" style={{ pointerEvents: 'auto' }}>
              <div className="flex flex-col md:flex-row gap-4 items-center" style={{ pointerEvents: 'auto' }}>
                <div className="flex-1 w-full relative">
                  <input
                    id="system-design-search"
                    type="text"
                    placeholder="Search system design topics, concepts, keywords..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 relative z-10 bg-white"
                    autoComplete="off"
                    spellCheck="false"
                    tabIndex="0"
                  />
                  {/* Simple indicator that input is working */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                    {searchTerm.length > 0 ? `${searchTerm.length} chars` : '🔍'}
                  </div>
                </div>
                
                {/* Design Type Filter */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1 relative z-10">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('All button clicked');
                      setDesignTypeFilter('all');
                    }}
                    onMouseEnter={() => console.log('All button mouse enter')}
                    onMouseLeave={() => console.log('All button mouse leave')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer relative z-20 ${
                      designTypeFilter === 'all' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                    style={{ 
                      pointerEvents: 'auto', 
                      cursor: 'pointer',
                      border: '2px solid transparent',
                      userSelect: 'none'
                    }}
                    type="button"
                  >
                    All
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Backend button clicked');
                      setDesignTypeFilter('backend');
                    }}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer relative z-20 ${
                      designTypeFilter === 'backend' 
                        ? 'bg-green-100 text-green-800 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                  >
                    🔧 Backend
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Frontend button clicked');
                      setDesignTypeFilter('frontend');
                    }}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer relative z-20 ${
                      designTypeFilter === 'frontend' 
                        ? 'bg-purple-100 text-purple-800 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                  >
                    🎨 Frontend
                  </button>
                </div>
                
                {/* View Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1 relative z-10">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Grid view button clicked');
                      setViewMode('grid');
                    }}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors cursor-pointer relative z-20 ${
                      viewMode === 'grid' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                  >
                    🔲 Grid
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('List view button clicked');
                      setViewMode('list');
                    }}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors cursor-pointer relative z-20 ${
                      viewMode === 'list' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                  >
                    📝 List
                  </button>
                </div>
                
                <div className="text-sm text-gray-600">
                  {filteredNotes.length} of {notes.length} docs
                  <div className="mt-1 text-xs text-blue-600 font-mono">
                    Current Filter: "{designTypeFilter}" | View Mode: "{viewMode}"
                  </div>
                </div>
              </div>

              {/* Advanced Search Filters */}
              {searchTerm && (
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-700">Search Options</h3>
                    <button
                      onClick={() => handleFilterChange({
                        includeContent: true,
                        includeKeywords: true,
                        includeFilenames: true,
                        caseSensitive: false,
                      })}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Reset Filters
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={searchFilters.includeContent}
                        onChange={(e) => handleFilterChange({...searchFilters, includeContent: e.target.checked})}
                        className="rounded border-gray-300"
                      />
                      <span>Search Content</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={searchFilters.includeKeywords}
                        onChange={(e) => handleFilterChange({...searchFilters, includeKeywords: e.target.checked})}
                        className="rounded border-gray-300"
                      />
                      <span>Search Keywords</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={searchFilters.includeFilenames}
                        onChange={(e) => handleFilterChange({...searchFilters, includeFilenames: e.target.checked})}
                        className="rounded border-gray-300"
                      />
                      <span>Search Filenames</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={searchFilters.caseSensitive}
                        onChange={(e) => handleFilterChange({...searchFilters, caseSensitive: e.target.checked})}
                        className="rounded border-gray-300"
                      />
                      <span>Case Sensitive</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>



          {/* System Design Documents Display */}
              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredNotes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 relative group border-l-4 border-blue-500 cursor-pointer"
                      onClick={() => handleNoteClick(note)}
                    >
                      {/* Design Type Badge */}
                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          note.designType === 'backend' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {note.designType === 'backend' ? '🔧 Backend' : '🎨 Frontend'}
                        </span>
                      </div>



                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 pr-8 pt-6">
                        {note.topic}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {note.content.substring(0, 150)}...
                      </p>
                      
                      {/* Keywords */}
                      {note.keywords && note.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {note.keywords.slice(0, 3).map((keyword, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600"
                            >
                              {keyword}
                            </span>
                          ))}
                          {note.keywords.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              +{note.keywords.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      {note.folderName && (
                        <div className="text-xs text-gray-500 mb-2">
                          📁 {note.folderName}
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-500">
                        Updated: {new Date(note.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <div className="space-y-4">
                  {filteredNotes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 relative group border-l-4 border-blue-500 cursor-pointer"
                      onClick={() => handleNoteClick(note)}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Icon/Type Indicator */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                          <span className="text-xl">
                            {note.designType === 'backend' ? '🔧' : '🎨'}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                                {note.topic}
                              </h3>
                              
                              {/* System Design Info */}
                              <div className="flex items-center space-x-2 mb-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded ${
                                  note.designType === 'backend' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-purple-100 text-purple-800'
                                }`}>
                                  {note.designType === 'backend' ? 'Backend' : 'Frontend'}
                                </span>
                                {note.folderName && (
                                  <span className="text-xs text-gray-500">
                                    📁 {note.folderName}
                                  </span>
                                )}
                              </div>

                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {note.content.substring(0, 200)}...
                              </p>

                              {/* Keywords */}
                              {note.keywords && note.keywords.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {note.keywords.slice(0, 6).map((keyword, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600"
                                    >
                                      {keyword}
                                    </span>
                                  ))}
                                  {note.keywords.length > 6 && (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                      +{note.keywords.length - 6} more
                                    </span>
                                  )}
                                </div>
                              )}

                              <div className="text-xs text-gray-500">
                                Updated: {new Date(note.updatedAt).toLocaleDateString()} • 
                                Created: {new Date(note.createdAt).toLocaleDateString()}
                              </div>
                            </div>


                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

          {filteredNotes.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-500 text-lg">No system design documents found</p>
              {searchTerm ? (
                <p className="text-gray-400 mt-2">
                  Try adjusting your search terms or filters
                </p>
              ) : (
                <p className="text-gray-400 mt-2">
                  System design will appear here
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Notes Modal */}
      {selectedNote && (
        <NotesModal
          note={selectedNote}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default SystemDesignPage;
