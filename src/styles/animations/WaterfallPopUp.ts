import { Variants } from 'framer-motion';

type Waterfall = {
  container: Variants;
  item: Variants;
};

export const WaterfallPopUp: Waterfall = {
  container: {
    hidden: { opacity: 0, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 0.02,
      },
    },
  },
  item: {
    hidden: { y: -2, scale: 0 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
  },
};