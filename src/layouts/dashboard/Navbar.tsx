export default function Navbar() {
  return (
    <header className="
      flex h-16 items-center justify-between
      border-b bg-white px-6
    ">

      <h1 className="font-semibold">
        Dashboard
      </h1>


      <div className="
        flex items-center gap-4
      ">

        <button>
          🔔
        </button>


        <div className="
          flex h-9 w-9 items-center justify-center
          rounded-full bg-black text-white
        ">
          Y
        </div>

      </div>

    </header>
  );
}