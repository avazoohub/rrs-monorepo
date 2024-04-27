import App from "./App";

export default function Apps() {
  return (
    <div className=" bg-[#110e19] rounded-2xl p-8">
      <p className="text-[#8e869d] text-[1.1rem] md:text-lg leading-tight">
        Welcome To Your
      </p>
      <p className="text-[1.6rem] md:text-[1.7rem] font-medium leading-tight">
        RRS Dashboard
      </p>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-x-6 lg:gap-x-2 gap-y-3 lg:gap-y-4 mt-8">
        <App
          img="https://jellyfish-app-37fxs.ondigitalocean.app/_next/image?url=%2Fapps%2Fmatchit.png&w=256&q=75"
          label="MatchIt"
          url="#"
          status={false}
        />
        <App
          img="https://variety.com/wp-content/uploads/2016/02/nfl-logo.png"
          label="NFL"
          url="/nfl"
          status={true}
        />
        <App
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjXbTpg5sNwORVYOalScFjlBRC5bQC7ZoCSWj0dc4BTw&s"
          label="NBA"
          url="#"
          status={false}
        />
        <App
          img="https://loodibee.com/wp-content/uploads/Major_League_Baseball_MLB_transparent_logo.png"
          label="MBL"
          url="#"
          status={false}
        />
        <App
          img="https://jellyfish-app-37fxs.ondigitalocean.app/_next/image?url=%2Fapps%2F360win.png&w=256&q=75"
          label="360 Win"
          url="#"
          status={false}
        />
      </div>
    </div>
  );
}
