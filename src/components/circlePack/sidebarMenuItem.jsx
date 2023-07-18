import React, { useEffect, useState } from 'react';

const SidebarMenuItem = ({ item, onMenuClick }) => {
	const [isOpen, setIsOpen] = useState(item.depth === 0);
	const handleItemClick = (itemId) => {
		setIsOpen(item.depth === 0);
		onMenuClick(itemId);
	};

	return (
		<li
			className={`pl-4 py-2 text-xs font-semibold text-gray-800 uppercase transition-colors duration-300 cursor-pointer`}
		>
			{item.depth < 2 ? (
				<details open={isOpen}>
					<summary
						className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700"
						onClick={() => handleItemClick(item.id)}
					>
						<span className="text-sm font-medium">- {item.name}</span>
					</summary>
					<ul className="mt-2 space-y-1">
						{item.children
							.filter((child) => child.depth < 3)
							.map((child) => (
								<SidebarMenuItem
									key={child.id}
									item={child}
									onMenuClick={handleItemClick}
								/>
							))}
					</ul>
				</details>
			) : (
				<div
					className="block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-700"
					onClick={() => handleItemClick(item.id)}
				>
					- {item.name}
				</div>
			)}
		</li>
	);
};

export default SidebarMenuItem;
