import Header from '../../componets/CommonComponets/Header/Header';
import Footer from '../../componets/ComponentsHome/Footer/Footer';
import FrontImg from '../../componets/ComponentsHome/FrontImg/FrontIng';
import HomeCard from '../../componets/ComponentsHome/HomeCards/HomeCard';

function Home() {
    return (
        <div className="body">
            <Header/>
            <FrontImg/>
            <HomeCard/>
            <Footer/>
        </div>
    );
}

export default Home;