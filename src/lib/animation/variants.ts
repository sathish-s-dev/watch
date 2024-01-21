export const movieContainerVariants = {
	initial: {},
	animate: {
		transition: {
			duration: 0.5,
			when: 'beforeChildren',
			staggerChildren: 0.05,
			delayChildren: 1,
		},
	},
};
