"use client";

import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: replace with real auth in later chapter
    router.push("/dashboard");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full rounded border p-2"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full rounded border p-2"
        required
      />
      <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
      >
        Log in
      </button>
    </form>
  );
}
