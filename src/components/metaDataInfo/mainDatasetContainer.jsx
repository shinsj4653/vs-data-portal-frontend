import React, { useEffect, useRef, useMemo } from 'react';

const MainDatasetContainer = ({ mainDataset, mainCategoryName, mainDatasetRef, handleMainDatasetColorChange }) => {

    return (<div className="flex flex-row overflow-x-auto scroll-smooth" ref={mainDatasetRef}>
			{Array.isArray(mainDataset) && mainDataset.map((child) => (
				<button
					className={`${
						mainCategoryName === child ? 'bg-blue-500' : 'bg-white'
					}  shadow-md m-2 px-4 py-2 hover:bg-slate-100`}
					
					style={{
						fontWeight: "700",
						minWidth: '9.5rem',
						borderColor: mainCategoryName === child ? '#0091FA' : '#C0C0C0',
						color: mainCategoryName === child ? '#ffffff' : '#C0C0C0'}}
					key={child}
					data-child={child}
					onClick={() => {
						handleMainDatasetColorChange(child);
					}}
				>
					#{child}
				</button>
			))
		}
		</div>)
}

export default React.memo(MainDatasetContainer);