import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export const UserButton = () => {
  const { data: session } = useSession();

  return session ? (
    <div
      onClick={() => signOut()}
      className="flex cursor-pointer flex-row items-center space-x-2"
    >
      <div className="flex w-20 flex-row justify-end">
        <Image
          src={session.user!.image!}
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
      className="w-20 rounded-md border-2 border-white py-1.5 transition duration-150 hover:bg-white hover:text-black"
      onClick={() => signIn("google")}
    >
      Login
    </button>
  );
};
