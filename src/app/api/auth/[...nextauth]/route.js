
import CredentialsProvider from "next-auth/providers/credentials"

export const handler = async ()=>{
    session:({
        session:'jwt'
    })
    providers: [
  CredentialsProvider({
  
    name: 'Credentials',
   
    credentials: {

    async authorize(credentials, req) {
     
      if(!credentials.email || !credentials.password){
         throw new Error('please Enter your email and password');
      }

       
      const user = await res.json()

      // If no error and we have user data, return it
      if (res.ok && user) {
        return user
      }
      // Return null if user data could not be retrieved
      return null
    }
  })
]
}