import React from 'react'
import './AiTool.css'


function AiTool() {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>

                <div className='poweredByHeading'>
                    <p>powered by chatGPT</p>
                </div>
                <h1>Maths solver using ChatGPT</h1>
                <div className='search-container'>
                    <form>
                        <div className='search-box'>

                            <input type={'text'} placeholder={'What is the sqaure root of 255?'} />
                            <button type='submit'><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.35001 35L38.3333 20L3.35001 5L3.33334 16.6667L28.3333 20L3.33334 23.3333L3.35001 35Z" fill="#1B1818" />
                            </svg>
                            </button>
                        </div>
                    </form>
                    <div className='answer'>
                        <p><span>Answer: </span>Square root is 15.96</p>
                    </div>


                </div>
            </div>
            <footer>
                <div className='statistics'>
                    <div className='info-card'>
                        <p>1</p>
                        <h3>Users visited</h3>
                    </div>
                    <div className='info-card'>
                        <p>1</p>
                        <h3>Tokens used</h3>
                    </div>

                    <div className='info-card'>
                        <p>1</p>
                        <h3>Searchs made</h3>
                    </div>


                </div>
                <div className='disclaimer'>
                    <p>The website is meant for work and fun, please do not use it for inappropriate queries.</p>
                </div>
            </footer>
        </div>
    )
}

export default AiTool