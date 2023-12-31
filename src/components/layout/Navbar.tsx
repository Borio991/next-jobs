import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function Navbar() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          daisyUI
        </Link>
        <div className="flex flex-row gap-x-8">
          <Link href="/dashboard">Protected</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/authPages/RegisterPage">Sign Up</Link>
        </div>
      </div>

      {session ? (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/favicon.ico" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={() => signOut()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  );
}

export default Navbar;
