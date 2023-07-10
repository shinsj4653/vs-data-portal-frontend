import Layout from './components/layout';
import Main from './main';

function App() {
  return (
    <>
      <Layout>
        <section className="flex min-h-screen  items-center justify-center text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
            <Main/>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default App;
