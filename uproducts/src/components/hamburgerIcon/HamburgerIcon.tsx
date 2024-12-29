import { motion } from 'motion/react';

type HamburgerIconProps = {
  isOpen: boolean;
  toggle: () => void;
};

function HamburgerIcon({ isOpen, toggle }: HamburgerIconProps): React.JSX.Element {
  return (
    <motion.button
      onClick={toggle}
      className="relative flex flex-col items-center justify-center w-10 h-10 bg-transparent border-none cursor-pointer md:hidden gap-1"
      aria-label="Toggle menu"
    >
      <motion.div
        className="bg-slate-500 w-6 h-[2px] rounded"
        animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="bg-slate-500 w-6 h-[2px] rounded"
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="bg-slate-500 w-6 h-[2px] rounded"
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}

export default HamburgerIcon;
