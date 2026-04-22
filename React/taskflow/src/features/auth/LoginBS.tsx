import { Container, Card, Form, Button, Alert } from 'react-bootstrap'; 
import { useState, useEffect } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
//import { useAuth } from './AuthContext';
import api from '../../api/axios';
import {loginStart, loginSuccess, loginFailure } from "./authSlice.ts";
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from "../../store.ts";
//import { RootState } from '../../store'; 
export default function LoginBS() { 
  const navigate = useNavigate(); 
  const location = useLocation(); 
  //const { state } = useAuth();//dispatch removed
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const from = (location.state as { from?: string })?.from || '/dashboard';  
  useEffect(() => { 
    if (user) navigate(from, { replace: true });  // BUG fix
  }, [user, navigate, from]);

  async function handleSubmit(e: React.FormEvent) { 
    e.preventDefault(); 
    //dispatch({ type: 'LOGIN_START' });
    dispatch(loginStart());
    try { 
      const { data: users } = await api.get(`/users?email=${email}`); 
      if (users.length === 0 || users[0].password !== password) { 
        dispatch(loginFailure('Email ou mot de passe incorrect'));
        return; 
      } 
      const { password: _, ...user } = users[0]; 

      const fakeToken = btoa(JSON.stringify({
        userId: user.id,
        email: user.email,
        role: 'admin',
        exp: Date.now() + 3600000  // expire dans 1h
      }));
      // dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      // dispatch({ type: 'LOGIN_SUCCESS', payload: { ...user, token: fakeToken } });
      dispatch(loginSuccess({ user, token: fakeToken }));
    } catch { 
      //dispatch({ type: 'LOGIN_FAILURE', payload: 'Erreur serveur' });
      dispatch(loginFailure('Erreur serveur'));
    } 
  } 
  
  return ( 
<Container className="d-flex justify-content-center align-items-center" style={{ 
height:'100vh' }}> 
<Card style={{ maxWidth: 400, width: '100%' }}> 
<Card.Body> 
<Card.Title className="text-center" style={{ color:'#1B8C3E' }}>TaskFlow</Card.Title> 
{error && <Alert variant="danger">{error}</Alert>}
<Form onSubmit={handleSubmit}> 
<Form.Group className="mb-3"> 
<Form.Control type="email" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} 
           required /> 
</Form.Group> 
<Form.Group className="mb-3"> 
<Form.Control type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} 
           required /> 
</Form.Group> 
<Button type="submit" className="w-100" >Se connecter</Button> 
</Form> 
</Card.Body> 
</Card> 
</Container>
  )
}