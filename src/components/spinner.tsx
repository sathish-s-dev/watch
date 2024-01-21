const LoadingSpinner = () => {
	return (
		<div className='w-full h-screen flex justify-center items-center'>
			<div className='lds-ripple'>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default LoadingSpinner;
