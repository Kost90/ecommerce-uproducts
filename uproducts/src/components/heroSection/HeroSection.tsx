import FlexContainer from '../containers/FlexContainer';
import Grid from '../grid/Grid';

function HeroSection() {
  return (
    <>
      <HeroText />
      <Grid />
    </>
  );
}

export function HeroText() {
  return (
    <div className="w-full lg:w-1/3 flex justify-center items-center p-5 text-center">
      <h1 className="font-bold text-7xl text-black">
        We peek some <span className="font-bold text-7xl text-orange">cool things </span>
        for you!
      </h1>
    </div>
  );
}

export default HeroSection;
