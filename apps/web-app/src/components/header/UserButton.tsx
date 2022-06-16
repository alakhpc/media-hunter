import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export const UserButton = () => {
  const { data: session } = useSession();

  return session ? (
    <div className="flex flex-row items-center space-x-2">
      <div className="w-[48px]">
        <Image
          layout="responsive"
          src={session.user!.image!}
          width={1}
          height={1}
          alt="User profile picture"
          className="rounded-full"
        />
      </div>
      <div className="hidden lg:block">{session.user!.email!}</div>
    </div>
  ) : (
    <button
      className="rounded-md border-2 py-1.5 px-4 transition duration-150 hover:bg-white hover:text-black"
      onClick={() => signIn("google")}
    >
      Login
    </button>
  );
};
