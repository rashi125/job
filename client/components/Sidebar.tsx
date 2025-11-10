import React from "react";

interface Resource {
  title: string;
  type: string;
  url: string;
}

interface Node {
  id: string;
  label: string;
  resources?: Resource[];
}

interface SidebarProps {
  node: Node;
  onClose: () => void;
}

export default function Sidebar({ node, onClose }: SidebarProps) {
  return (
    <>
      {/* Background overlay */}
      <div
        className=" inset-0 bg-white bg-opacity-40 backdrop-blur-md z-20"
        onClick={onClose}
      ></div>

      {/* Sidebar panel */}
      <div
        className="fixed right-0 top-0 h-full w-[300px] md:w-[350px] bg-white shadow-2xl 
                   border-l border-slate-200 p-6 z-50 flex flex-col 
                   transform transition-transform duration-300 ease-in-out"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 text-xl"
        >
          ✕
        </button>

        {/* Node title */}
        <h2 className="text-2xl font-semibold text-slate-800 mb-6 border-b pb-2">
          {node.label}
        </h2>

        {/* Node resources */}
        {node.resources && node.resources.length > 0 ? (
          <ul className="space-y-3">
            {node.resources.map((res, i) => (
              <li key={i}>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-slate-50 rounded-lg border border-slate-200 
                             hover:bg-slate-100 hover:border-slate-300 transition"
                >
                  <p className="font-medium text-slate-800">{res.title}</p>
                  <p className="text-sm text-slate-500">{res.type}</p>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 mt-4">
            No resources available for this topic.
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-slate-200 text-sm text-slate-500">
          💡 Click a node on the roadmap to view related resources.
        </div>
      </div>
    </>
  );
}
