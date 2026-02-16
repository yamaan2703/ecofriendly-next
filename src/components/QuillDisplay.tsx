import React, { useEffect } from "react";

interface QuillDisplayProps {
  content: string;
  className?: string;
}

const QuillDisplay: React.FC<QuillDisplayProps> = ({
  content,
  className = "",
}) => {
  // Dynamically import Quill CSS only when component is used
  useEffect(() => {
    import("quill/dist/quill.snow.css").catch(() => {
      // CSS import failed, styles may already be loaded
    });
  }, []);

  return (
    <div className={`quill-content ${className}`}>
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default QuillDisplay;
