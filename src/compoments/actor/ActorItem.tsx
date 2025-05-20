import type { FC } from "react";

type ActorItemProps = {
  name: string;
  image: string;
};

const ActorItemCompoment: FC<ActorItemProps> = ({ name, image }) => {
  return (
    <div className="relative">
      <img
        src={image}
        alt={name}
        className="w-90 h-70 object-cover rounded-lg cursor-pointer bg-gray-600"
      />
      <div className="absolute bottom-0 left-0 w-full h-10 rounded-b-lg bg-gradient-to-t from-black/90 to-transparent"></div>
      <div className="absolute bottom-0 w-full flex justify-center">
        <span className="text-white text-center"> {name}</span>
      </div>
    </div>
  );
};

export default ActorItemCompoment;
