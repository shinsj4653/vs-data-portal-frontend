import React from 'react';
import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {
	return (
		<>
			<Header />
				<section>{children}</section>
			<Footer />
		</>
	);
};

export default Layout;
