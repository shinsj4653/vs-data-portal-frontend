import React from 'react';

const Header = () => {
    return (
        <>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a href="#!" className="flex font-extrabold items-center text-gray-900 mb-4 md:mb-0">
                        <img src="https://www.visang.com/images/visang_og.jpg" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-20 h-10" viewBox="0 0 24 24" />
                        <span className="ml-3 text-xl">데이터 서비스</span>
                    </a>
                    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
                        <a href="#!" className="mr-5 hover:text-gray-900 hover:underline">Home</a>
                        <a href="#!" className="mr-5 hover:text-gray-900 hover:underline">데이터기반 조직도</a>
                        <a href="#!" className="mr-5 hover:text-gray-900 hover:underline">DataSet 목록</a>
                        <a href="#!" className="mr-5 hover:text-gray-900 hover:underline">Table 목록</a>
                        <a href="#!" className="mr-5 hover:text-gray-900 hover:underline">시스템 정보</a>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;