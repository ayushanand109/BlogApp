import conf from '../conf/conf.js'
import {Client,Account, ID} from "appwrite";

class AuthService{
    client =new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);

    }
//yaha new method create kr rhe custom methods taki vendor lockin se bach paye
    async createAccount({email,Password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,Password,name);
            if(userAccount){
                //call another method
                return this.login({email,Password});
                
            }
            else{
                //ho skta hai null value ayi ho to us hisab se handlekr lenge
                return userAccount;
            }
            

        }
        catch(error){
            throw error;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }
        catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log("Appwrite service:: getCurrentUser::error",error);
        }
        //agr kisi wajah se try catch me error aata hai to null return kr denge taki app me handle kr sake
        return null;

    }
    async logout(){
        try{
            return await this.account.deleteSessions('current');
        }
        catch(error){
            console.log("Appwrite service:: logout::error",error);
        }
    }

}

const authService=new AuthService();

export default authService;