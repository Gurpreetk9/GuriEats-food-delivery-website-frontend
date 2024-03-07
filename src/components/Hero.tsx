import hero from "../assets/hero.jpeg";

function Hero() {
  return (
    <div>
      <img src={hero} className="w-full max-h-[660px] object-cover"></img>
    </div>
  );
}
export default Hero;
