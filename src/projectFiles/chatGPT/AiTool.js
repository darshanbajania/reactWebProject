import React, { useState } from 'react'
import './AiTool.css'


function AiTool() {
    // const { executeRecaptcha } = useGoogleReCaptcha();

    const [queryText, setQueryText] = useState('')
    // const [recaptc, setrecaptc] = useState(second)
    const handleQuery = (e) => {
        setQueryText(e.target.value)
        console.log(queryText)

    }

    const handleSubmit = async (e) => {
        // let tokken 
        e.preventDefault()
        console.log('submitted')
        window.grecaptcha.ready(function () {
            window.grecaptcha.execute('6LfvcJ8jAAAAADRPrpBz-GyOqeJXs2sFc2OO8gj7', { action: 'submit' }).then(async (token) => {
                // Add your logic to submit to your backend server here.

                try {
                    await fetch('https://tame-pink-crocodile-shoe.cyclic.app', {
                        // await fetch('http://localhost:3001', {

                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                        body: JSON.stringify({
                            'gToken': token
                        })
                    }).then((res) => res.json()).then((data) => {

                        console.log(data)
                        if (data.success === true) {
                            if (data.score >= 0.5) {
                                alert('user is valid ' + data.score)
                            }
                            else {
                                alert('user is invalid' + data.score)
                            }

                        }
                    })

                } catch (error) {
                    console.log(error)
                }



                console.log(token)
            });
        });
        // if (!executeRecaptcha) {
        //     console.log('Execute recaptcha not yet available');
        //     return;
        // }

        // const token = await executeRecaptcha('yourAction');
        // // Do whatever you want with the token

        // console.log(token)
    };


    return (
        <div className='outerContainer' style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div >

                <div className='poweredByHeading'>
                    <p>powered by chatGPT</p>
                </div>
                <h1>Maths solver using ChatGPT</h1>
                <div className='search-container'>
                    <form onSubmit={handleSubmit}>
                        <div className='search-box'>

                            <input onChange={handleQuery} type={'text'} placeholder={'What is the sqaure root of 255?'} />
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