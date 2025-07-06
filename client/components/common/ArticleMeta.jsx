import React from "react";

const ArticleMeta = ({ date, sources }) => {
  return (
    <aside className="space-y-5 text-sm text-gray-600 p-3 rounded-2xl">
      <div>
        <p className="font-semibold text-black">Date</p>
        <p>{date}</p>
      </div>

      {sources?.length > 0 && (
        <div>
          <p className="font-semibold text-black">Sources</p>
          <ul className="space-y-1">
            {sources.map((source, index) => (
              <li key={index}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-words"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default ArticleMeta;
