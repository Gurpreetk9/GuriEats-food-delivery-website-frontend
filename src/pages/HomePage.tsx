import landingImage from "../assets/landingImage.png";
import appDownload from "../assets/appDownload.png";
import SearchBox, { SearchData } from "@/components/SearchBox";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  function handleSearchSubmit(formData: SearchData) {
    navigate({
      pathname: `/search/${formData.searchQuery}`,
    });
  }
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col text-center gap-5 -my-16">
        <h1 className="text-5xl font-bold tracking-tight text-seeGreen">
          Tuck into a takeaway today
        </h1>
        <span className="text-xl">Food is just click away</span>
        <SearchBox
          onSubmit={handleSearchSubmit}
          placeholder="Enter the city or town"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="flex justify-center mt-16">
          <img src={landingImage}></img>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 text-center">
          <span className="text-3xl font-bold tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the GuriEats App for faster orders and more offers.
          </span>
          <img src={appDownload}></img>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
