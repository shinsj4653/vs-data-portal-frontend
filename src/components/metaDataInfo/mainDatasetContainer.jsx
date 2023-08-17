import React, { useEffect, useRef, useMemo } from 'react';

const MainDatasetContainer = ({ mainDataset, mainCategoryName, mainDatasetRef, handleMainDatasetColorChange }) => {

    return (<div className="flex flex-row overflow-x-auto scroll-smooth" ref={mainDatasetRef}>
			{Array.isArray(mainDataset) && mainDataset.map((child) => (
				<button
					className={`${
						mainCategoryName === child ? 'bg-blue-500 border border-[#0091FA] text-[#FFFFFF]' : 'bg-white border border-[#C0C0C0] text-[#C0C0C0]'
					} font-bold min-w-[9.5rem] shadow-md m-2 px-4 py-2 hover:bg-slate-100`}
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