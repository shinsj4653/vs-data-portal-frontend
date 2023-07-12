import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="text-gray-600 body-font bg-white">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to="/" className="flex font-extrabold items-center text-gray-900 mb-4 md:mb-0">
          <img
            src="https://www.visang.com/images/visang_og.jpg"
            alt="Logo"
            className="w-20 h-10"
          />
          <span className="ml-3 text-xl">데이터 서비스</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-gray-900 hover:underline">
            Home
          </Link>
          <Link to="/orgchart" className="mr-5 hover:text-gray-900 hover:underline">
            데이터기반 조직도
          </Link>
          <Link to="#" className="mr-5 hover:text-gray-900 hover:underline">
            DataSet 목록
          </Link>
          <Link to="#" className="mr-5 hover:text-gray-900 hover:underline">
            Table 목록
          </Link>
          <Link to="#" className="mr-5 hover:text-gray-900 hover:underline">
            시스템 정보
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
