import Grid from '../grid/Grid';
import CustomBorder from '../ui/customBorder';

function HeroSection() {
  return (
    <>
      <HeroText />
      <div>
        <p className="font-semibold mb-4">hot deals for you</p>
        <CustomBorder />
        <Grid />
      </div>
    </>
  );
}

export function HeroText() {
  return (
    <div className="w-full md:w-[548px] flex justify-center items-center p-5 text-center mb-8 md:mb-0">
      <h1 className="text-6xl md:text-7xl text-black lg:eading-snug">
        We peek some <span className="font-bold text-7xl text-orange">cool things </span>
        for you!
      </h1>
    </div>
  );
}

export default HeroSection;
