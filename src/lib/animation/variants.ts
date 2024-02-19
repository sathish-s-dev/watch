export const movieContainerVariants = {
	initial: {
		opacity: 0,
		y: 50,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			when: 'beforeChildren',
			staggerChildren: 0.05,
			delayChildren: 1,
		},
	},
	whileInView: {
		opacity: 1,
		y: 0,
	},
};
