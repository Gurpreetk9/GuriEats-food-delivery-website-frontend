import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="container mx-auto bg-seeGreen flex flex-col md:flex-row gap-5  items-center md:justify-between p-10">
      <Link className="font-bold text-3xl text-white" to="/">
        GuriEats
      </Link>
      <div className="flex flex-row gap-5 text-white">
        <span>Privacy policy</span>
        <span>Terms of service</span>
      </div>
    </div>
  );
}

export default Footer;
