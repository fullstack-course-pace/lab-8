// app/login/page.tsx
import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </div>

      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        {/* Left panel */}
        <div className="flex flex-col justify-center gap-4 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          {/* If your LoginForm isn’t wired yet, it can still push to /dashboard for now */}
          <LoginForm />
          <p className="text-sm text-gray-500">
            Don’t have access?{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Go back home
            </Link>
          </p>
        </div>

        {/* Right panel (optional art) */}
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add hero/illustration if you like */}
        </div>
      </div>
    </main>
  );
}
