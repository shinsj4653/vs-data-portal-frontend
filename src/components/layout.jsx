import React from 'react';
import Header from './header';
import Footer from './footer';

const Layout = ({children}) => {
    return (
        <>
            <div className="bg-primary">
                <Header />
                <div className='bg-gray-100'>{children}</div>
                <Footer />
            </div>
        </>
    );
};

export default Layout;