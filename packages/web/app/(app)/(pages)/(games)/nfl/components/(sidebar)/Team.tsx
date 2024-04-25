export default function UserTeam() {
    return (
        <div className=" bg-[#110e19] p-6 rounded-2xl flex items-center justify-between">
            <div>
                <p className="text-sm text-[#8e869d]"> Your Team </p>
                <p className="text-lg"> Las Vegas Raider </p>
                <p className="font-light text-sm text-[#aeaeae]">Home 5-3 (0.63) | Road: 2-7 (0.22)</p>
            </div>
            <img src="https://a.espncdn.com/i/teamlogos/nfl/500/lv.png" alt="" className="w-20 h-auto mx-6" />
        </div>
    )
}