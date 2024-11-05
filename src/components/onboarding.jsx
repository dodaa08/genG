import React from 'react';
import { useState } from 'react';

function Onboarding() {
    const [reciever, setreciever] = useState('');
    const [prompt, setprompt] = useState('');
    const [sender, setsender] = useState('kartikdoda86@gmail.com');
    const [promptGenerated, setpromptGenerated] = useState('');
    const [subject, setsubject] = useState('GenG Mail');


    const sendemail = async ()=>{
        const response = await fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sendemail, reciever, subject, prompt})
        });

        const data = await response.json();
        console.log(data);
    }


    const generatePrompt = async ()=>{
        const response = await fetch('http://localhost:5000/generateprompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt})
        });

        const data = await response.json();
        console.log(data);
        setpromptGenerated(data.prompt);
    }





    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'> 
            <div className='flex justify-center border-2 border-yellow-500  rounded-xl py-2 px-20 w-max'>
                <h1 className='text-2xl font-mono'>GenG</h1>
            </div>

            <div className='flex justify-center mt-5'>
                <input 
                    type="text" 
                    className='rounded-xl text-2xl bg-white shadow-md py-2 px-10 border-2 mr-2' 
                    placeholder='Receiver email' 
                    value={reciever}
                    onChange={(e)=>setreciever(e.target.value)}
                />
                <button className='bg-green-400 rounded-xl py-2 px-8 text-xl font-mono hover:scale-110 transition duration-200 hover:bg-green-300' onClick={sendemail}>
                    
                    Send
                </button>
            </div>

            <div className='flex justify-center align-center items-center border-2 rounded-xl w-96 h-96 mt-5'>
                <h1>{promptGenerated && (
                    <>
                    {promptGenerated}
                    </>
                )}
                {!promptGenerated && (
                    <>
                    Your Mail will appear here
                    </>
                )}
                </h1>
            </div>

            <footer className='flex justify-center mt-5'>
                <input 
                    type="text" 
                    className='rounded-xl text-2xl bg-white shadow-md py-2 px-40 border-2 mr-2' 
                    placeholder='Enter Prompt here' 
                    value={prompt}
                    onChange={(e)=>setprompt(e.target.value)}
                />
                <button className='bg-pink-400 rounded-xl py-2 px-8 text-xl font-mono hover:scale-110 transition duration-200 hover:bg-pink-300'>
                    Generate
                </button>
            </footer>
        </div>
    );
}

export default Onboarding;