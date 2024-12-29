import React, { useState } from "react";
import Feature from "../Features/Feature";
import { useTranslation } from "react-i18next";// Import useTranslation
import { MdGppGood, MdLibraryAddCheck, MdLock, MdShare } from "react-icons/md";
import { t } from "i18next";

const Features = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useTranslation(); 
  

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const cards = [
    {
      title: t("Housing Societies"),
      description: t("Simplify decision-making in your housing society with secure, transparent e-voting."),
      icon: "🏠",
      link: "/housing-societies"
    },
    {
      title: t("Clubs"),
      description: t("Efficiently manage club elections with our easy-to-use online voting system."),
      icon: "🎳",
      link: "/club-voting"
    },
    {
      title: t("Colleges"),
      description: t("Empower student voices in elections with reliable, tamper-proof e-voting."),
      icon: "🎓",
      link: "/college-voting"
    },
    {
      title: t("NGOs"),
      description: t("Ensure fair and transparent leadership selections for your NGO with our system."),
      icon: "🌍",
      link: "/ngo-voting"
    },
    {
      title: t("Unions"),
      description: t("Conduct secure and transparent union elections with blockchain-based e-voting."),
      icon: "✊",
      link: "/union-voting"
    },
    {
      title: t("Corporate Elections"),
      description: t("Streamline your corporate governance with secure, compliant e-voting."),
      icon: "💼",
      link: "/corporate-voting"
    },
  ];

  return (
    <div className="features-wrapper">
      <div className="content">
        <div className="picture">
          <div className="picture-back">
            <img src="https://i.pinimg.com/564x/2c/d2/ad/2cd2ad39f910cd721e08118506d93bbd.jpg" alt="Voting illustration" />
          </div>
        </div>
        <div className="p-container">
          <div className="sub-heading">{t('Welcome to ElectraVote')}</div>
          <div className="p-heading">
            {t("ElectraVote is a revolutionary online voting system built on the secure and transparent foundation of blockchain technology. Our mission is to provide a trustworthy, accessible, and user-friendly platform that empowers individuals to participate in elections with confidence and ease.")}
            <br />
            {t("At ElectraVote, we believe in the power of technology to strengthen democratic processes. Our platform ensures that every vote is counted accurately and securely, utilizing advanced encryption and decentralized ledgers to prevent fraud and guarantee transparency.")}
            <br />
            {t("Whether you're voting in national elections, organizational decisions, or community polls, ElectraVote offers a seamless and secure experience. Designed with scalability and inclusivity in mind, ElectraVote is committed to making voting accessible to everyone. Our user-friendly interface, combined with cutting-edge technology, ensures that voters can cast their ballots effortlessly, regardless of their technical proficiency.")}
            <br />
            {t("Join us in shaping the future of voting, where every voice is heard, and every vote matters. With ElectraVote, we bring the power of democracy to your fingertips, uniting communities, organizations, and nations in the shared goal of fair and transparent elections.")}
          </div>
        </div>
      </div>

      <div className="title-large animate-title">{t('What makes us different')}</div>
      <div className="subheading animate-subheading">
        {t("Empowering Secure and Transparent Elections.")}
      </div>

      <div className="mobile-wrapper">
        <div className="box animate-feature">
          <Feature title={t("Immutability")} icon={<MdLock />} align="right">
            <p>
              {t("Immutability is a foundational aspect of blockchain technology, meaning that once data is recorded, it cannot be altered or deleted. This feature guarantees the integrity of the voting process, as all transactions are permanently etched onto the blockchain, providing a clear and indisputable record of each vote cast.")}
            </p>
          </Feature>
        </div>

        <div className="mobile-container">
          <img src="/mobile.png" className="animate-image" />
        </div>

        <div className="box animate-feature">
          <Feature title={t("Enhanced Security")} icon={<MdGppGood />} align="left">
            <p>
              {t("Enhanced security in blockchain systems is achieved through robust cryptographic techniques and decentralized architecture. This ensures that sensitive information, including voter identities and ballots, is protected from unauthorized access, ensuring a secure voting environment and building voter trust in the electoral process.")}
            </p>
          </Feature>
        </div>

        <div className="box animate-feature">
          <Feature title={t("Decentralized")} icon={<MdShare />} align="right">
            <p>
              {t("Decentralization distributes control across a network rather than relying on a central authority. This reduces the risk of fraud and manipulation, empowering voters by ensuring that every voice is heard and counted fairly. It promotes transparency and accountability in the voting process.")}
            </p>
          </Feature>
        </div>

        <div className="box animate-feature">
          <Feature title={t("Distributed Ledger")} icon={<MdLibraryAddCheck />} align="left">
            <p>
              {t("A distributed ledger is a key characteristic of blockchain technology that records transactions across multiple nodes in real-time. This redundancy not only enhances data integrity but also ensures that no single point of failure exists, making the voting process more resilient to attacks and ensuring that all transactions are verifiable and traceable.")}
            </p>
          </Feature>
        </div>
      </div>


<section className="card-section">
        <h2 className="section-title">{t('Empowering Every Community with Secure E-Voting')}</h2>
        <div className="card-grid">
          {cards.map((card, index) => (
            <div className="card" key={index}>
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
              <a href={card.link} className="card-link">{t('Learn more')}</a>
            </div>
          ))}
        </div>
      </section>


      <section className="info-section">
        <div className="info-card">
          <div className="text-content">
            <h3>{t('No tech knowledge needed')}</h3>
            <p>{t('ElectraVote empowers users to engage with the voting system effortlessly.Whether you are tech-savvy or not, our user-friendly interface ensures that anyone can cast their vote securely and with confidence, minimizing any learning curve or frustration.')}
            </p>
            <a href="#readmore" className="read-more-btn">{t("Read More")}</a>
          </div>
          <div className="image-content">
            <img
              src="https://i.pinimg.com/236x/45/b9/0c/45b90cdfa34db8092a8eb75d9bcf1551.jpg"
              alt="Person using a laptop"
            />
          </div>
        </div>

        <div className="info-card">
          <div className="text-content">
            <h3>{t('Blockchain-backed security')}</h3>
            <p>{t('With ElectraVote, you can trust that your vote is protected. We leverage blockchain technology to ensure every vote is accurately recorded, immutable, and verifiable. This guarantees a secure and transparent election process with no room for tampering or manipulation.')}   
            </p>
            <a href="#readmore" className="read-more-btn">{t("Read More")}</a>
          </div>
          <div className="image-content">
            <img
              src="https://simple-survey.transforms.svdcdn.com/production/images/Voting.png?w=480&h=500&auto=compress%2Cformat&fit=crop&crop=focalpoint&fp-x=0.5036&fp-y=0.4266&dm=1718826735&s=d52677db76fc285121844a09d4dcd86c"
              alt="Mobile voting app"
            />
          </div>
        </div>
      </section>

      <div className="faq-section">
        <div className="faq-title">{t("FAQ")}</div>
        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span className="faq-toggle">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </div>
              <div
                className="faq-answer"
                style={{
                  maxHeight: activeIndex === index ? "1000px" : "0",
                }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const faqData = [
  {
    question: t("What is a decentralized voting system?"),
    answer: t(
      "A decentralized voting system uses blockchain technology to ensure secure, transparent, and tamper-proof elections."
    ),
  },
  {
    question: t("How does blockchain ensure security?"),
    answer: t(
      "Blockchain ensures security through immutability, cryptographic hashing, and decentralized nodes that verify transactions."
    ),
  },
  {
    question: t("Can votes be changed or altered?"),
    answer: t(
      "No, once a vote is cast and recorded on the blockchain, it cannot be changed or altered."
    ),
  },
  {
    question: t("Is this system easy to use?"),
    answer: t(
      "Yes, the system is designed to be user-friendly, even for those with little to no technical knowledge."
    ),
  },
];

export default Features;
