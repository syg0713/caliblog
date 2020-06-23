import React from 'react';
import Link from "next/link";

const Home = () => {
    return (
        <>
            <Link href="/post"><a>post</a></Link>
            <Link href="/signup"><a>signup</a></Link>
            <div className="hello">
                Hello
                <div className="hi">Hi</div>
            </div>
        </>
    );
};

export default Home;