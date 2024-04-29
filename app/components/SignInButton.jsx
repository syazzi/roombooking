"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";

export default function SignInButton() {
  const { status, data: session } = useSession();
  if (status === "authenticated") {
    return (
      <>
        <Link href="/">Home</Link>
        {session.user.user.userHasRole.filter(
          (item) => item.roleId == "clu7l0vyh000a11owwdn1umk1"
        ).length > 0 ? (
          <Link href="/dashboard/admin">Dashboard</Link>
        ) : null}
        <Link href="/timetable">Timetable</Link>
        <Link href="/history">History</Link>

        <button
          onClick={() => signOut()}
          className=" text-white bg-red-500 p-1 rounded border border-1 "
        >
          {" "}
          Sign Out
        </button>
      </>
    );
  }

  return (
    <button
      className="bg-gray-400 py-1 px-2 rounded border border-1 font-bold"
      onClick={() => signIn()}
    >
      Login
    </button>
  );
}
