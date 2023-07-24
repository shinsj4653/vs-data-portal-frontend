import React from 'react';

const CustomNodeContent = (props) => {
	return (
		<>
			<div
				className="h-36 flex flex-col items-center rounded-2xl text-2xl justify-center shadow-2xl border-2 border-gray-400 font-bold"
				style={{backgroundColor : props.data.color}}
			>
				<div>
					{props.data.imageUrl ? (
						<div>
							<img
								className="node-img"
								src={props.data.imageUrl}
								alt="Profile"
							/>
							<div className="node-name">{props.data.name}</div>
						</div>
					) : (
						<div className="font-">
							<div className="node-name">{props.data.name}</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default CustomNodeContent;
