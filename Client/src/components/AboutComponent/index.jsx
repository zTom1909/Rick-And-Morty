import React from "react";
import styles from "./AboutComponent.module.css";

const AboutComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.about}>
        <h2>About</h2>
        <p>
          Welcome to the Rick and Morty Character Search website! We are proud
          to present this project developed by Tomás Iglesias, a passionate
          19-year-old student currently studying the Full Stack Developer course
          on the SoyHenry platform.
        </p>
        <p>
          Our goal with this website is to showcase our frontend development
          skills by creating an interactive platform for searching and exploring
          characters from the popular TV show "Rick and Morty". Through the
          utilization of the Rick and Morty API, you can search for characters
          by their ID, view their details, and even add them to your favorites
          list.
        </p>
        <p>
          We have implemented various features to enhance your experience,
          including a dynamic search bar, responsive card layouts, and the
          ability to filter characters by gender and sort them alphabetically.
          Our website provides a seamless and intuitive interface, allowing you
          to easily navigate and discover your favorite Rick and Morty
          characters.
        </p>
        <p>
          Stay tuned for updates and new features as we continue to expand and
          improve this website. Feel free to reach out to us via our GitHub
          profile at{" "}
          <a
            href="https://github.com/zTom1909/"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            zTom1909
          </a>{" "}
          for any inquiries or to provide feedback.
        </p>
        <p>
          Enjoy exploring the fascinating world of Rick and Morty characters on
          our website!
        </p>
      </div>
    </div>
  );
};

export default AboutComponent;
