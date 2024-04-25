import Apps from "./components/apps/Apps";
import Stats from "./components/stats/Stats";
import Banners2 from "./components/banners/Banners";

export default function Home() {
    return (
        <div className="flex flex-col space-y-4">
            <Apps />
            <Stats />
            <Banners2 />
        </div>
    );
}
