import { SignIn } from "@clerk/nextjs";
import { Building2 } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex flex-col items-center justify-center px-4 py-20">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="w-10 h-10 bg-[#e04141] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <span className="text-2xl font-bold text-gray-900 tracking-tight">
          Real<span className="text-[#e04141]">Key</span>
        </span>
      </Link>

      <SignIn
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "shadow-xl border border-gray-100 rounded-2xl",
          },
        }}
      />
    </div>
  );
}
