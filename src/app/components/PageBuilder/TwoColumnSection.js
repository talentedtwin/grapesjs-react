import Image from "next/image";
const TwoColumnSection = ({ imageUrl, heading, paragraph, buttonText }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <Image
          src={imageUrl || `https://picsum.photos/500.webp`}
          alt="Section image"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 p-6">
        <h2 className="text-2xl font-bold mb-4">{heading}</h2>
        <p className="mb-4">{paragraph}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default TwoColumnSection;
