export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-accent animate-spin"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-accent/10 animate-spin-slow"></div>
      </div>
    </div>
  );
}
