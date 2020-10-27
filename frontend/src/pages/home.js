import React from 'react';

function Home() {
    return (
        <>
            <nav className='col s12 m6 ' style={{ height: '35vh' }}>
                <div className="nav-wrapper grey darken-3 homepage1">
                    <h3 className="brand-logo   center" style={{ margin: '0', padding: '20px', fontSize: '50px' }}>User Task Application </h3>
                </div>
            </nav>
            <div className='col s12 m6  homepage' style={{ margin: '0', marginTop: "130px", padding: "20px" }}>
               <p className='indigo white-text'>An Application in which a user can create his own tasks.</p>
               <p className='indigo white-text'>This app is created by using ReactJS, NodeJS and MongoDB.</p> 
            </div>
        </>
    )
}

export default Home;
