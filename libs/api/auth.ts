// const API_URL = "http://localhost:3000/api";

// export async function signup(data: any) {
//   try {
//     const response = await fetch(`${API_URL}/auth/register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
    
//     if (!response.ok) {
//       throw new Error('Signup failed');
//     }
    
//     return await response.json();
//   } catch (err: any) {
//     console.log(err);
//     throw err;
//   }
// }

// export async function login(data: any) {
//   try {
//     const response = await fetch(`${API_URL}/auth/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
    
//     if (!response.ok) {
//       throw new Error('Login failed');
//     }
    
//     return await response.json();
//   } catch (err: any) {
//     console.log(err);
//     throw err;
//   }
// }

import { supabase } from '../supabase';

export async function signup(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return data; // contains user info & session
  } catch (err: unknown) {
    if (err instanceof Error) throw new Error(err.message);
    throw new Error('Signup failed');
  }
}


export async function login(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data; // contains user info & session
  } catch (err: unknown) {
    if (err instanceof Error) throw new Error(err.message);
    throw new Error('Login failed');
  }
}


//     if (error) throw error;

//     return data; // contains user info
//   } catch (err: unknown) {
//     if (err instanceof Error) throw new Error(err.message);
//     throw new Error('Signup failed');
//   }
// }
