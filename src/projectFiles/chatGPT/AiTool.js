import React, { useEffect, useState } from 'react'
import './AiTool.css'
import { SyncLoader } from 'react-spinners'
import moment from 'moment'
function AiTool() {
    // const { executeRecaptcha } = useGoogleReCaptcha();

    const [queryText, setQueryText] = useState('')
    const [question, setQuestion] = useState('')
    const [solution, setSolution] = useState('15.96')
    const [visitorsCount, setVisitorsCount] = useState(0)
    const [searchMadeCount, setSearchMadeCount] = useState(0)
    const [tokensCount, setTokensCount] = useState(0)
    const [isSearchMade, setIsSearchMade] = useState(false)
    // const [recaptc, setrecaptc] = useState(second)
    const [loading, setLoading] = useState(false)
    const handleQuery = (e) => {
        setQueryText(e.target.value)
        if (e.target.value !== '') {
            setSolution('')
        }
        else {
            setSolution('15.96')
        }
    }

    const getSearchCount = async () => {

        await fetch('https://reactwebproject-b5eb4-default-rtdb.firebaseio.com/chatgptmathsolver/searches.json',
            {
                method: 'GET',


            }).then((res) => res.json()).then((data) => {
                console.log(data)
                setSearchMadeCount(data.searchCount)

            })

    }

    const updateSearchCount = async () => {


        await fetch('https://reactwebproject-b5eb4-default-rtdb.firebaseio.com/chatgptmathsolver/searches.json',
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'searchCount': searchMadeCount + 1
                })
            }).then((res) => res.json()).then((data) => {
                console.log(data)

            })

        await fetch('https://reactwebproject-b5eb4-default-rtdb.firebaseio.com/chatgptmathsolver/searches.json',
            {
                method: 'GET',


            }).then((res) => res.json()).then((data) => {
                console.log(data)
                setSearchMadeCount(data.searchCount)

            })
    }

    const updateUser = async () => {
        let userCount = 0
        await fetch('https://reactwebproject-b5eb4-default-rtdb.firebaseio.com/chatgptmathsolver/visitors.json',
            {
                method: 'GET',


            }).then((res) => res.json()).then((data) => {
                console.log(data)
                setVisitorsCount(data.userCount)
                userCount = data.userCount
            })
        await fetch('https://reactwebproject-b5eb4-default-rtdb.firebaseio.com/chatgptmathsolver/visitors.json',
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'userCount': userCount + 1
                })
            }).then((res) => res.json()).then((data) => { console.log(data) })
    }

    useEffect(() => {
        updateUser()
        getSearchCount()
        getTokenCount()

    }, [])


    const addQuestion = async (quesData) => {

        // await fetch('https://reactwebproject-b5eb4-default-rtdb.firebaseio.com/chatgptmathsolver.json',
        //     {
        //         method: 'GET',


        //     }).then((res) => res.json()).then((data) => {
        //         console.log(data)
        //         setVisitorsCount(data.searchCount)
        //         userCount = data.userCount
        //     })
        await fetch('https://reactwebproject-b5eb4-default-rtdb.firebaseio.com/chatgptmathsolver/questions.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(quesData)
            }).then((res) => res.json()).then((data) => {
                console.log(data)

                updateSearchCount()
            })


    }

    const getTokenCount = async () => {
        await fetch('https://reactwebproject-b5eb4-default-rtdb.firebaseio.com/chatgptmathsolver/tokens.json',
            {
                method: 'GET',


            }).then((res) => res.json()).then((data) => {
                console.log(data)
                setTokensCount(data.tokenCount)
            })

    }

    const updateTokenCount = async (total_tokens) => {


        await fetch('https://reactwebproject-b5eb4-default-rtdb.firebaseio.com/chatgptmathsolver/tokens.json',
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'tokenCount': tokensCount + total_tokens
                })
            }).then((res) => res.json()).then((data) => {
                console.log(data)

            })
        setTokensCount(tokensCount + total_tokens)
    }

    const getSolution = async () => {
        try {
            await fetch('https://tame-pink-crocodile-shoe.cyclic.app/solve/', {

                // await fetch('http://localhost:3001/solve/', {

                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    'queryText': queryText
                })
            }).then((res) => res.json()).then((data) => {
                setSolution(data.choices[0].text)
                setIsSearchMade(true)
                let currentDate = moment().format()

                const questionItem = {
                    question: question.length > 0 ? question : queryText,
                    openAIResponse: data,
                    timeStamp: currentDate
                }
                addQuestion(questionItem)
                updateTokenCount(data.usage.total_tokens)
                console.log(data)
                setLoading(false)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        // let tokken 
        e.preventDefault()
        console.log('submitted')
        setLoading(true)
        window.grecaptcha.ready(function () {
            window.grecaptcha.execute('6LfvcJ8jAAAAADRPrpBz-GyOqeJXs2sFc2OO8gj7', { action: 'submit' }).then(async (token) => {
                // Add your logic to submit to your backend server here.

                try {
                    await fetch('https://tame-pink-crocodile-shoe.cyclic.app', {
                        // await fetch('http://localhost:3001', {

                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify({
                            'gToken': token
                        })
                    }).then((res) => res.json()).then((data) => {

                        console.log(data)

                        if (data.success === true) {
                            if (data.score >= 0.5) {
                                // alert('user is valid ' + data.score)
                                setQuestion(queryText)
                                setQueryText('')
                                getSolution()

                            }
                            else {
                                alert('user is invalid' + data.score)
                            }

                        }
                        else {
                            setLoading(false)
                            alert('some error occuured: ' + data.message)
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

                            <input
                                value={queryText}
                                required
                                maxLength={40}
                                onChange={handleQuery} type={'text'} placeholder={'What is the sqaure root of 255?'} />

                            {
                                loading ?
                                    <div className='spinner'>
                                        <SyncLoader
                                            size={8}
                                            color={'#252020'}
                                            aria-label="Loading Spinner"
                                        // loading={false}
                                        />
                                    </div>
                                    :

                                    <button type='submit'>
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.35001 35L38.3333 20L3.35001 5L3.33334 16.6667L28.3333 20L3.33334 23.3333L3.35001 35Z" fill="#1B1818" />
                                        </svg>
                                    </button>
                            }

                        </div>
                    </form>
                    {
                        isSearchMade ?
                            <div className='question'>
                                <p><span>Question: </span>{question}</p>
                            </div> : null
                    }
                    <div className='answer'>
                        <p><span>Answer: </span>{solution}</p>
                    </div>


                </div>
            </div>
            <footer>
                <div className='statistics'>
                    <div className='info-card'>
                        <p>{visitorsCount}</p>
                        <h3>Users visited</h3>
                    </div>
                    <div className='info-card'>
                        <p>{tokensCount}</p>
                        <h3>Tokens used</h3>
                    </div>

                    <div className='info-card'>
                        <p>{searchMadeCount}</p>
                        <h3>Searchs made</h3>
                    </div>


                </div>
                <div className='disclaimer'>
                    <p>This website is meant for work and fun, please do not use it for inappropriate queries.</p>
                    <p>author: darshanbajania1999@gmail.com</p>

                </div>
            </footer>
        </div>
    )
}

export default AiTool