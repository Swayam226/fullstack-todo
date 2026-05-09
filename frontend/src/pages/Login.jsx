import Navbar from "../components/Navbar";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow flex items-center justify-center pb-10">
        <div className="max-w-md w-full bg-white shadow-sm border hover:shadow-md transition duration-200 ease-in border-[#242323] rounded-xl p-8">
          <input
            type="text"
            placeholder="Enter username"
            className="w-full mb-6 p-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Enter password"
            className="w-full mb-16 p-2 border rounded-lg"
          />
          <button className="w-full mb-2 p-2 border rounded-lg bg-[rgb(245,245,220)] hover:hover:bg-[rgb(248,248,244)] shadow-sm transition duration-150 ease-in">
            Sign Up
          </button>
        </div>
      </main>
    </div>
  );
}
