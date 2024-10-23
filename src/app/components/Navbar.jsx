import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-lg font-bold">
          <Link href="/" className="hover:text-gray-400">
            MyLogo
          </Link>
        </div>

        {/* Links */}
        <div className="space-x-4">
          <Link href="/login" className="text-white hover:text-gray-400">
            Login
          </Link>
          <Link href="/register" className="text-white hover:text-gray-400">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};