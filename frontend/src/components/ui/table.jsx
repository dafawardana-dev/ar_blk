export default function Table({ children, className = "", tableClassName = "" }) {
  return (
    <div className={`bg-white rounded-lg shadow overflow-x-auto ${className}`}>
      <table className={`min-w-full divide-y divide-gray-200 ${tableClassName}`}>
        {children}
      </table>
    </div>
  );
}