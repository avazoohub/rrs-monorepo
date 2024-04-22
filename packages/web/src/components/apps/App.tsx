type Props = {
    img: string,
    label: string
}

export default function App({ img, label }: Props) {
    return (
        <div className="flex flex-col items-center justify-center">
            <button className="w-[6.5rem] h-[6.5rem] rounded-full overflow-hidden border border-[#302f3f] p-1">
                <img src={img} alt={label} className="block w-full h-full rounded-full mx-auto object-cover bg-white" />
            </button>
            <p className="font-light text-sm text-center heading mt-1 lg:mt-2">{label}</p>
        </div>
    )
}