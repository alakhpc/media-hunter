import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export const UserButton = () => {
  const { data: session } = useSession();

  return session ? (
    <div
      onClick={() => signOut()}
      className="flex cursor-pointer flex-row items-center justify-center space-x-2"
    >
      <div className="flex w-[48px] flex-row justify-end">
        <Image
          unoptimized
          src={session.user?.image || "https://http.cat/404"}
          width={48}
          height={48}
          alt="User profile picture"
          className="rounded-full"
        />
      </div>
      <div className="hidden lg:block">{session.user?.email}</div>
    </div>
  ) : (
    <button
      className="rounded-md border-2 border-white py-1.5 transition duration-150 hover:bg-white hover:text-black md:w-20"
      onClick={() => signIn("google")}
    >
      Login
    </button>
  );
};
