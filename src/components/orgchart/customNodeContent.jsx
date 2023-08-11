import React from 'react';

const CustomNodeContent = (props) => {

	// console.log("Node:", props.servicesByTarget);
	// let isServiceIncluded = props.servicesByTarget.includes(props.data.name);
	// console.log(isServiceIncluded);

	return (
		<>
			{props.servicesByTarget.includes(props.data.name) ? (
				<div>
					{/* <img className="node-img" src={props.data.imageUrl} alt="Profile"/> */}
					<div className={`h-36 flex flex-col items-center rounded-2xl text-3xl justify-center font-bold node-name`}
					style={{backgroundColor: '#0091FA', color: 'white'}}>{props.data.name}</div>
				</div>
			) : (
				<div className='h-1'>
					<div className={`h-36 flex flex-col items-center rounded-2xl text-3xl justify-center font-bold node-name`}
					style={{backgroundColor: props.data.color}}>{props.data.name}</div>
				</div>
			)}
		</>
	);
};

export default CustomNodeContent;
