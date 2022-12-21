import { registerUser } from '@/database/databaseFunctions';
import { UserChat } from '@/interfaces/Users';
import { useAuth } from '@context/auth/AuthContext';
import { FirebaseError } from 'firebase/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React,{useState} from 'react'

const Register = () => {

  const [user, setUser] = useState({
    email: '',
    password: '',
    name:'',
  });

  const [error, setError] = useState('');

  const {register} = useAuth();
  const router = useRouter();

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setUser({...user,[e.target.name]:e.target.value});
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError('');
        try {
            //TODO Loader
            await register(user.email,user.password,user.name);
            router.push('/app/');
        } catch (error) {
          if(error instanceof FirebaseError) setError(error.code); 

          else setError('Error, Try later...')
        }
  }
  
  const handleError = ()=>{
    switch (error) {
      case 'auth/email-already-exists':
          return "email already exists";
      

      case 'auth/invalid-email':
          return "Email invalid";

      case 'auth/invalid-password':
        return "Invalid Password";

      case 'auth/weak-password':
        return "Weak password (6 characters minimum)"
    
      default:
        return error;
    }
  }

  return (
    
    <div>
      
      <div className='w-fit m-auto border p-8 pr-20 pl-20 mt-6 '>
      <form className='' onSubmit={(e)=>handleSubmit(e)}>
        <h1 className='mb-4'>Register</h1>
            
      
        {error && <h3 className='' >{handleError()}</h3>}

        <div className='flex flex-col gap-3' >
          <input className='border border-black rounded text-lg p-2' type="email" name="email" placeholder="Email" onChange={handleChange}/>
          <input className='border border-black rounded text-lg p-2' type="text" name="name" placeholder="Name" onChange={handleChange}/>
          <input className='border border-black rounded text-lg p-2' type="password" min={6} name="password" placeholder="Password"  id="password" onChange={handleChange} />
          <button className='mt-2 bg-blue-400 rounded p-3' type={'submit'}>Register</button>
        </div>
         

            

        <p >Already login? <Link href={'/login'}>Sign up</Link></p>

      </form>
      </div>
    </div>
    
  )
}

export default Register