import React from 'react';
import Link from "next/link";

const Home = () => {
    return (
        <>
            <Link href="/post/post"><a>post</a></Link>
            <Link href="/signup/signup"><a>signup</a></Link>
        </>
    );
};

export default Home;