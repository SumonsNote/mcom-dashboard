const BannerTitle = ({ title }) => {
  return (
    <div className="bg-blue-950 rounded-md my-5 text-white w-full flex justify-center items-center">
      <div className="w-1/2">
        <h2 className="text-2xl font-semibold text-center py-2">{title}</h2>
      </div>
    </div>
  );
};

export default BannerTitle;
