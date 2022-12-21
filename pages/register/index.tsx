import { useAuth } from '@context/auth/AuthContext';
import { FirebaseError } from 'firebase/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React,{useState} from 'react'
import {FiCamera} from 'react-icons/fi'

interface userProps{
  email:string,
  password:string,
  name:string,
  photoUrl:any
}

const Register = () => {

  const [user, setUser] = useState<userProps>({
    email: '',
    password: '',
    name:'',
    photoUrl:'',
  });

  const [error, setError] = useState('');

  const {register} = useAuth();
  const router = useRouter();

  function handleImage(e:React.ChangeEvent<HTMLInputElement>){
    if(!e.target.value) return;
    
    
    if(e.target?.files)
    setUser({...user,photoUrl:e.target.files[0] })
  }

  /* function uploadImage(e:React.ChangeEvent<HTMLInputElement>){
    const files = e.target.files;
    if(!files|| files.length == 0 || !user) return;
    databaseUpdateProfileImage(user,files[0]);
  }    */

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setUser({...user,[e.target.name]:e.target.value});
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError('');
        try {
            //TODO Loader
            await register(user.email,user.password,user.name,user.photoUrl);
            router.push('/login');
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
          
          <label htmlFor='imageInput'>
            <div onClick={()=>{}} className='w-[80px] h-[80px] flex items-center justify-center  m-auto mb-2 border border-black rounded-full'>
              {user.photoUrl == '' ? <FiCamera className='' size={35} />:
                <img  className='w-[80px] h-[80px]  rounded-full ' style={{backgroundImage:`url(${URL.createObjectURL(user.photoUrl)})` }} />
              }
              
            </div>
          </label>
          <input className='hidden' accept='image/png, image/jpg, image/jpeg' id='imageInput' type={"file"} name={"s"}   onChange={(e)=>{handleImage(e);}}/>
      
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