export default function NoDataFound({ title }) {
  return (
    <div className="p-6 space-y-6   w-full">
      <div className="flex flex-col items-center justify-center">
        <span className="mt-4 text-lg font-semibold text-gray-500">
          No {title} found !
        </span>
      </div>
    </div>
  );
}
