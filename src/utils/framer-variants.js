export const contentVariant = {
  hidden: {
    opacity: 0,
    y: 10,
  },

  visible: (i) => {
    return {
      y: 0,
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        duration: 0.4,
        delay: i * 0.1,
      },
    };
  },
};

export const imageVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

export const notifVariant = {
  hidden: { translateX: '-50%', translateY: '-45%', opacity: 0 },
  visible: { translateY: '-50%', opacity: 1, transition: { duration: 0.5 } },
  exit: { translateY: '-55%', opacity: 0, transition: { duration: 0.5 } },
};

export const textVariant = {
  hidden: { y: 5, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

export const spinnerVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

export const linkVariant = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
      delay: 0.06,
    },
  },

  exit: {
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
      delay: 0.1,
    },
  },
};

export const mobileLinkVariant = {
  hidden: {
    opacity: 0,
    y: -4,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.4,
    },
  },

  exit: {
    opacity: 0,
    y: -4,
    transition: {
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
};
