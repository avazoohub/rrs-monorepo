import Link from "next/link";

type Props = {
  img: string;
  label: string;
  url: string;
  status: boolean;
};

export default function App({ img, label, url, status }: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${!status ? "grayscale pointer-events-none opacity-40" : ""}`}
    >
      <Link
        prefetch
        href={url}
        className="w-[5.8rem] md:w-[6.5rem] h-[5.8rem] md:h-[6.5rem] rounded-full overflow-hidden border border-[#302f3f] p-1 active:scale-[0.96] transition"
      >
        <img
          src={img}
          alt={label}
          className="block w-full h-full rounded-full mx-auto object-cover bg-white"
        />
      </Link>
      <p className="font-light text-center heading mt-1 lg:mt-3">{label}</p>
    </div>
  );
}
