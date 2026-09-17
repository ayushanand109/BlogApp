import conf from '../conf/conf';
import {Client ,ID ,Databases, Storage, Query} from "appwrite";

export class Service{
    client =new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionsId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }

            )
        }
        catch(error){
            console.log("Appwrite service :: createPost:: error", error);
        }

    }
    async updatePost(slug, {title,content,featuredImage,status }){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionsId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }
        catch(error){
            console.log("Appwrite service :: updatePost:: error", error);
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionsId,
                slug
            )
            return true;
        }
        catch(error){
            console.log("Appwrite service :: deletePost:: error",error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionsId,
                slug,
            )
        }
        catch(error){
            console.log("Appwrite service :: getPost:: error",error);
            return false;
        }
    }
    
    async getPosts(queries=[Query.equal("status", "active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionsId,
                queries,

            )
        }
        catch(error){
            console.log("Appwrite service :: getPosts:: error", error);
            return false;
        }
    }

    //file upload services 

    async uploadFile(file){
        try{
            return this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        }
        catch(error){
            console.log("Appwrite service :: uploadFile:: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;    
        }
        catch(error){
            console.log("Appwrite service :: deleteFile:: error", error);
            return false;
        }
    }
    async getFilePreview(fileId){
        //yaha pr bhi try catch ka use kiya ja skta hai lekin ye getfilepreview promise ni hai 
        
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,   
            fileId,
        )
    }
     
} 

const service =new Service();
export default service;