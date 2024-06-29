import React from 'react';
import SwitchTextAnimation from "@/app/component/switchTextAnimation";

const Home = () => {
    return (
        <div style={{margin: "50px", fontSize: "5rem", color: "red"}}>
            <SwitchTextAnimation words={["Context", "Lilac", "Foobar", "Alphabetical"]} delay={4} />
        </div>
    );
};

export default Home;