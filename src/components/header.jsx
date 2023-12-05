import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logos/visang_logo.png';
import { useMain } from '../context/MainContext';
import { useSearchRank } from '../hooks/useDpMain';
import SearchRankBar from './main/searchRankBar';


const Header = () => {
	const { setIsSearch } = useMain();
	// const [theme, setTheme] = useState("pastel");
	// const toggleTheme = () => {
	//   setTheme(theme === "dracula" ? "pastel" : "dracula");
	// };

	// useEffect(() => {
	//   document.querySelector("html").setAttribute("data-theme", theme);
	// }, [theme]);

	// 데이터 활용 페이지 임시 대체용 사이트 링크
	const url = "https://tableauwiki.com/category/blog/tableau-tips/";

	// 실시간 검색어 순위 api에 필요한 변수들
	const apiType = "search";

	const currentDate = new Date();
	currentDate.setHours(currentDate.getHours() + 9); // 한국 시간으로 변경

	// 시작시간 gte : 현재시간 - 10분 -> "2023-12-05T15:50:00"
	// 끝 시간 lte : 현재시간 -> "2023-12-05T16:00:00"
	const [searchRankGte, setSearchRankGte] = useState(new Date(currentDate.getTime() - 10 * 60000).toISOString().slice(0, 19));
	const [searchRankLte, setSearchRankLte] = useState(currentDate.toISOString().slice(0, 19));
	const [searchRankResult, setSearchRankResult] = useState([]); // 실시간 검색어 순위 데이터 [

	const searchRankQuery = useSearchRank(apiType, searchRankGte, searchRankLte);

	useEffect(() => {
		

		const fetchRankData = async () => {

			console.log(searchRankGte)
			console.log(searchRankLte)
			
			const searchRankResult = await searchRankQuery.refetch(apiType, searchRankGte, searchRankLte);

			const searchRanks = searchRankResult.data.data;
			console.log(searchRanks);
			setSearchRankResult([...searchRanks]);
			
		};

		fetchRankData();

	}, [ searchRankGte, searchRankLte ]);

	return (
		<div className="bg-base-100">
			<div className="flex items-center gap-4 px-2 sm:px-4 lg:px-6">
				<Link
					className="block"
					to="/"
					onClick={() => {
						setIsSearch(false);
					}}
				>
					<span className="sr-only">Home</span>
					<img
						src={logo}
						alt="logo"
						className="h-16"
					/>
				</Link>

				<div className="flex flex-1 items-center justify-end lg:justify-between">
					<nav className="hidden lg:block">
						<ul className="flex items-center gap-6 text-slate-500 font-bold">
							{/* <li>
                <Link to="/">학(學),습(習) 데이터</Link>
              </li> */}

							<li className="hover:font-extrabold hover:text-slate-950">
								<Link to="/DataMap">비상교육 데이터 맵</Link>
							</li>

							<li className="hover:font-extrabold hover:text-slate-950">
								<Link to="/Orgchart">데이터 기반 조직도</Link>
							</li>

							<li className="hover:font-extrabold hover:text-slate-950">
								<Link to="/AiStatusMap">AI 현황맵</Link>
							</li>

							<li className="hover:font-extrabold hover:text-slate-950">
								<Link to="/MetaDataInfo">메타 데이터 정보</Link>
							</li>

							<li className="hover:font-extrabold hover:text-slate-950">
								<Link to="/SystemInfo">시스템 정보</Link>
							</li>

							<li className="hover:font-extrabold hover:text-slate-950">
								<Link onClick={()=>{window.open(url)}}>데이터 활용</Link>
							</li>
						</ul>
					</nav>
			  		<SearchRankBar searchRankResult={searchRankResult}/>
					{/* <div className="flex items-center gap-4">
            <div className="md:flex md:gap-4">
              <input
                id="checkTheme"
                type="checkbox"
                className="toggle"
                checked={theme == "pastel" ? true : false}
                onClick={toggleTheme}
              />
            </div>
          </div> */}
					<div className="drawer-end z-10 pl-2 lg:hidden float-right">
						<input
							id="my-drawer-4"
							type="checkbox"
							className="drawer-toggle"
						/>
						<div className="drawer-content">
							<label
								htmlFor="my-drawer-4"
								className="drawer-button btn"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="inline-block w-5 h-5 stroke-current"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									></path>
								</svg>
							</label>
						</div>
						<div className="drawer-side">
							<label
								htmlFor="my-drawer-4"
								className="drawer-overlay"
							></label>
							<ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
								<li className="hover:font-extrabold hover:text-slate-950">
									<Link to="/DataMap">비상교육 데이터 맵</Link>
								</li>

								<li className="hover:font-extrabold hover:text-slate-950">
									<Link to="/Orgchart">데이터 기반 조직도</Link>
								</li>

								<li className="hover:font-extrabold hover:text-slate-950">
									<Link to="/AiStatusMap">AI 현황맵</Link>
								</li>

								<li className="hover:font-extrabold hover:text-slate-950">
									<Link to="/MetaDataInfo">메타 데이터 정보</Link>
								</li>

								<li className="hover:font-extrabold hover:text-slate-950">
									<Link to="/SystemInfo">시스템 정보</Link>
								</li>

								<li className="hover:font-extrabold hover:text-slate-950">
									<Link onClick={()=>{window.open(url)}}>데이터 활용</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
