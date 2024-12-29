import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useTranslation } from "react-i18next";
import weblogo from '../../img/web-logo.png'; // Ensure the image path is correct

const useCountUpHook = (targetNumber: number, duration: number): number => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const increment = targetNumber / (duration / 10);

    const counter = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        clearInterval(counter);
        start = targetNumber;
      }
      setCount(Math.round(start));
    }, 10);

    return () => clearInterval(counter);
  }, [targetNumber, duration]);

  return count;
};

const Landing = () => {
  const { t } = useTranslation(); 
  const count1 = useCountUpHook(10, 3000); 
  const count2 = useCountUpHook(20000, 4000); 
  const count3 = useCountUpHook(95, 3000); 
  const count4 = useCountUpHook(1000, 3000); 
  const count5 = useCountUpHook(2000, 3000); 

  return (
    <div className="landing">
      <Navbar />
      <div className="background-image">
       
        <div className="centered-logo">
          <img src={weblogo} alt="ElectraVote Logo" />
        </div>

        <div className="intro-content">
          {/* Large Title for Impact */}
          <div className="titttle-large">
            <h2>{t('Empower Your Vote, Secure Your Future')}</h2>
            <p>{t('ElectraVote ensures transparent, secure, and verifiable voting for all. Join the next generation of voting today.')}</p>
          </div>

          {/* Button Wrapper for Action */}
          <div className="button-wrapper">
            <Link to="/login" className="btn btn-primary">
              {t('Get Started')}
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className='stats-section'>
        <div className="stat-heading">
          <h2>{t('Empowering Democracy with Transparency & Security')}</h2>
          <p>{t('ElectraVote is committed to providing secure, transparent, and reliable voting for everyone.')}</p>
        </div>
        <div className='stat'>
          <h2>{count1}x</h2>
          <p>{t('Enhanced security compared to traditional voting systems')}</p>
        </div>
        <div className='stat'>
          <h2>+{count2}</h2>
          <p>{t('Voters empowered globally through secure and transparent elections')}</p>
        </div>
        <div className='stat'>
          <h2>{count3}%</h2>
          <p>{t('User satisfaction rate')}</p>
        </div>
        <div className='stat'>
          <h2>+{count4}</h2>
          <p>{t('Votes securely recorded and verified within seconds')}</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
