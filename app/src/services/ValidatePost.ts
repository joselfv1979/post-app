import Post from "./../models/Post";

export const validatePost = (post: Post) => {
    if(!post.content) {
        throw new Error("Pease fill some text")
    }
    return post;
}