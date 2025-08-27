import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { MemoizedReactMarkdown } from './Markdown/MemoizedReactMarkdown';
import { CodeBlock } from './Markdown/CodeBlock.tsx';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

const NotesModal = ({ note, isOpen, onClose }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const contentRef = useRef(null);
  const modalRef = useRef(null);

  // Focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  // Scroll listener for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollTop = contentRef.current.scrollTop;
        setShowBackToTop(scrollTop > 200);
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      if (isOpen && contentRef.current) {
        const contentEl = contentRef.current;
        contentEl.addEventListener('scroll', handleScroll);
        
        // Initial check
        handleScroll();
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (contentRef.current) {
        contentRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isOpen, note?.id]); // Re-run when note changes

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Navigation helpers
  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Markdown rendering components configuration
  const markdownComponents = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <CodeBlock
          language={match[1]}
          value={String(children).replace(/\n$/, '')}
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    // Enhanced styling for various elements with auto-generated IDs for anchor links
    h1: ({ children }) => {
      const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return (
        <h1 id={id} className="text-3xl font-bold mt-8 mb-6 text-gray-900 border-b border-gray-200 pb-2">
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return (
        <h2 id={id} className="text-2xl font-bold mt-6 mb-4 text-gray-900">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return (
        <h3 id={id} className="text-xl font-semibold mt-5 mb-3 text-gray-900">
          {children}
        </h3>
      );
    },
    h4: ({ children }) => {
      const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return (
        <h4 id={id} className="text-lg font-semibold mt-4 mb-2 text-gray-900">
          {children}
        </h4>
      );
    },
    p: ({ children }) => (
      <p className="mb-4 text-gray-800 leading-relaxed">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-gray-800 leading-relaxed">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic bg-blue-50 py-2 text-gray-700">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-50">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="bg-white divide-y divide-gray-200">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-gray-50">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {children}
      </td>
    ),
    a: ({ href, children }) => {
      // Handle internal links (anchors) differently from external links
      if (href && href.startsWith('#')) {
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              const targetId = href.substring(1);
              const targetElement = contentRef.current?.querySelector(`#${CSS.escape(targetId)}`);
              
              if (targetElement && contentRef.current) {
                // Calculate the position relative to the modal content container
                const containerRect = contentRef.current.getBoundingClientRect();
                const targetRect = targetElement.getBoundingClientRect();
                const scrollTop = contentRef.current.scrollTop;
                const targetPosition = targetRect.top - containerRect.top + scrollTop - 20; // 20px offset
                
                contentRef.current.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
                });
              } else {
                // If ID not found, try to find by text content
                const headingElements = contentRef.current?.querySelectorAll('h1, h2, h3, h4, h5, h6');
                if (headingElements) {
                  for (const heading of headingElements) {
                    if (heading.textContent?.toLowerCase().includes(targetId.toLowerCase().replace(/-/g, ' '))) {
                      const containerRect = contentRef.current.getBoundingClientRect();
                      const targetRect = heading.getBoundingClientRect();
                      const scrollTop = contentRef.current.scrollTop;
                      const targetPosition = targetRect.top - containerRect.top + scrollTop - 20;
                      
                      contentRef.current.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                      });
                      break;
                    }
                  }
                }
              }
            }}
            className="text-blue-600 hover:text-blue-800 underline cursor-pointer bg-transparent border-none p-0 font-inherit hover:bg-blue-50 px-1 py-0.5 rounded transition-colors"
          >
            {children}
          </button>
        );
      }
      
      // External links
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-800">
        {children}
      </em>
    ),
  };

  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-lg shadow-xl max-w-full w-full max-h-[95vh] flex flex-col outline-none mx-2 md:mx-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-gray-900 truncate">
              {note.topic}
            </h2>
            {note.isSystemDesign && (
              <div className="flex items-center mt-2">
                <span className={`px-2 py-1 text-xs font-medium rounded mr-2 ${
                  note.designType === 'backend' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {note.designType === 'backend' ? '🔧 Backend' : '🎨 Frontend'}
                </span>
                {note.folderName && (
                  <span className="text-sm text-gray-600">
                    📁 {note.folderName}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold px-2"
            >
              ×
            </button>
          </div>
        </div>



        {/* Content */}
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto p-6 relative"
        >
          <div className="prose prose-lg max-w-none">
            <MemoizedReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeMathjax]}
              components={markdownComponents}
            >
              {note.content || ''}
            </MemoizedReactMarkdown>
          </div>

          {/* Back to Top Button */}
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
              title="Scroll to top"
            >
              ↑
            </button>
          )}
          
          {/* Debug: Scroll position indicator */}
          <div className="fixed bottom-6 left-6 bg-gray-800 text-white p-2 rounded text-xs z-50">
            BTT: {showBackToTop ? 'ON' : 'OFF'}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <span>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
            <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

NotesModal.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    isSystemDesign: PropTypes.bool,
    designType: PropTypes.string,
    folderName: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export { NotesModal };
