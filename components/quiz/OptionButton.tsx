"use client";

interface OptionButtonProps {
  emoji?: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  multiSelect?: boolean;
}

export default function OptionButton({
  emoji,
  label,
  selected,
  onClick,
  multiSelect = false,
}: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-4 rounded-xl border-2 text-left
        transition-all duration-200 active:scale-[0.98]
        ${
          selected
            ? "border-purple-600 bg-purple-50 text-purple-900"
            : "border-gray-200 bg-white text-gray-800 hover:border-purple-300 hover:bg-purple-50/30"
        }
      `}
    >
      {multiSelect && (
        <div
          className={`
            w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2
            transition-all duration-200
            ${selected ? "bg-purple-600 border-purple-600" : "border-gray-300 bg-white"}
          `}
        >
          {selected && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      )}
      {emoji && <span className="text-xl flex-shrink-0">{emoji}</span>}
      <span className="text-sm font-medium leading-snug">{label}</span>
      {!multiSelect && (
        <div className="ml-auto">
          <div
            className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center
              transition-all duration-200
              ${selected ? "border-purple-600" : "border-gray-300"}
            `}
          >
            {selected && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
          </div>
        </div>
      )}
    </button>
  );
}
