"use client"
import React, { useEffect, useState, useRef } from "react";
import "./AnimatedText.css";

interface SwitchTextAnimationProps {
    words: string[];
    delay: number;
}

const Index: React.FC<SwitchTextAnimationProps> = ({ words, delay }) => {
    // State to keep track of the current word index
    const [activeIndex, setActiveIndex] = useState(0);
    const parentRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            changeWord();
        }, delay * 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        handleWordChange();
    }, [activeIndex]);

    const changeWord = () => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % words.length);
    };

    const handleWordChange = () => {
        const currentWord = parentRefs.current[activeIndex]?.children;
        const nextIndex = (activeIndex + 1) % words.length;
        const nextWord = parentRefs.current[nextIndex]?.children;

        if (currentWord && nextWord) {
            for (let i = 0; i < currentWord.length; i++) {
                animateLetterOut(currentWord[i], i);
            }

            for (let i = 0; i < nextWord.length; i++) {
                nextWord[i].className = 'words_animate_letter behind';
                (nextWord[0].parentElement as HTMLElement).style.opacity = '1';
                animateLetterIn(nextWord[i], i);
            }
        }
    };

    const animateLetterOut = (letter: Element, i: number) => {
        setTimeout(() => {
            letter.className = 'words_animate_letter animate_out';
        }, i * 80);
    };

    const animateLetterIn = (letter: Element, i: number) => {
        setTimeout(() => {
            letter.className = 'words_animate_letter animate_in';
        }, 340 + i * 80);
    };

    return (
        <React.Fragment>
            {words.map((word, word_index) => (
                <span
                    key={word_index}
                    className="words_animate"
                    ref={(el) => { parentRefs.current[word_index] = el }}
                    style={{ opacity: word_index === activeIndex ? 1 : 0 }}
                >
                    {word.split("").map((letter, letter_index) => (
                        <span key={letter_index} className="words_animate_letter">{letter}</span>
                    ))}
                </span>
            ))}
        </React.Fragment>
    );
};

export default Index;
