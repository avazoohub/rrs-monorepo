import App from "./App";

export default function Apps() {
    return (
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 lg:gap-x-2 gap-y-3 lg:gap-y-4 mt-10" >
            <App img="https://jellyfish-app-37fxs.ondigitalocean.app/_next/image?url=%2Fapps%2Fmatchit.png&w=256&q=75" label="MatchIt Game" />
            <App img="https://variety.com/wp-content/uploads/2016/02/nfl-logo.png" label="NFL" />
            <App img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjXbTpg5sNwORVYOalScFjlBRC5bQC7ZoCSWj0dc4BTw&s" label="NBA" />
            <App img="https://loodibee.com/wp-content/uploads/Major_League_Baseball_MLB_transparent_logo.png" label="MBL" />
            <App img="https://jellyfish-app-37fxs.ondigitalocean.app/_next/image?url=%2Fapps%2F360win.png&w=256&q=75" label="360 Win" />
        </div >
    )
}