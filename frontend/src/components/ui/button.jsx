// src/components/ui/Button.jsx
export default function Button({ children, onClick, variant = "primary", className = "" }) {
  const baseClasses = "px-4 py-2 rounded font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "<bg-gray-100></bg-gray-100> hover:bg-gray-700 text-white focus:ring-blue-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-500",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}