export const animations = {
  slideUpd: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
    viewport: { once: true },
  },
  menuVariants: {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  },
  iconRotation: {
    initial: { rotate: 0 },
    animateOpen: { rotate: 180 },
    animateClosed: { rotate: 0 },
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
  iconAppear: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 },
  },
};
