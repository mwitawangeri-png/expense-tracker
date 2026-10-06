import { useState } from "react";
import { supabase } from "./supabase";
import { useNavigate } from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { error } = await supabase.auth.signUp({ email, password});

        if(error){
            setMessage(error.message);
        }else{
            setMessage('Account created successfully! You can now log in.');
        }   
    };

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password});

        if (error){
            setMessage(error.message);
        }else {
            navigate('/');
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px'}}>
        <h2> Sign In or Create Account</h2>
        <form style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
           />
           <input
           type="password"
           placeholder="Password (min 6 characters)"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           required
            />
            <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                <button onClick={handleLogin} style={{ flex: 1}}>Log In</button>
                <button onClick={handleSignUp} style={{ flex: 1}}>Sign Up</button>
            </div>
        </form>
        {message && <p style={{marginTop: '15px', color: 'blue'}}>{message}</p>}
        </div>
    );
    // End of export function
}