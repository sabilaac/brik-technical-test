import ProducList from '../components/ProducList';
import Preloader from '../components/Preloader';

function Home() {

  return (
    <>
        <Preloader content={<ProducList />} />
    </>
  );
}

export default Home;
