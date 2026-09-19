export default function Header() {
  return (
    <header
      className="
        flex
        h-16
        items-center
        justify-between
        border-b
        px-6
      "
    >
      <h1 className="font-semibold">Admin Dashboard</h1>

      <div
        className="
        rounded-full
        bg-muted
        px-4
        py-2
        text-sm
      "
      >
        Yekta
      </div>
    </header>
  );
}
