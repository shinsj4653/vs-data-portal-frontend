import React from 'react';
import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {
    return (
        <>
            <div className="bg-primary">
                <Header />
                <div className='bg-gray-100'>
                    <section className="flex min-h-screen  items-center justify-center text-gray-600 body-font">
                        <div className="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
                            {children}
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Layout;