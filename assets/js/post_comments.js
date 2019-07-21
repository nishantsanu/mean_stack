{
    //method to submit the form data for new post using ajax
    let createComment= function(){
        let newCommentForm= $("#post-comments");
        newCommentForm.submit(function(e){
            e.preventDefault();
            
            console.log(newCommentForm.serializeArray());
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serializeArray(),
                success: function(data){
                    console.log(data.data.comment);
                    let newComment= newCommentDom(data.data.comment);
                    

                    $(`#post-comments${data.data.comment.post} ul`).prepend(
                        `
                     <li id="comment-list-${data.data.comment.post}" >
                         <p>
                             ${data.data.comment.content}
                            <br>
                                <small>
                                ${data.data.comment.user.name}
                                </small>
                            
                                

                             <a href="/comments/destroy/${data.data.comment._id}">x</a>

                                    
                        </p>
                    </li>
                         `
                    );
                    // deletePost($(' .delete-post-button',newComment));
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    };
    //method to create post in dom

    let newCommentDom = function(comment){
        // return $(
        //     `
        // <section id="comment-list-${comment.post}">
        //         <li>
        //             <p>
        //                 ${comment.content}
        //                                         <br>
        //                     <small>
        //                         ${comment.user.name}
        //                     </small>
        
        
        //                     <a href="/comments/destroy/${comment._id}">x</a>
        
                            
        //             </p>
        //         </li>
        // </section>
        // `
        // );

        return $();
    };




    createComment();
}



























































// // $(document).ready(function(){
// //     $('#new-comment-form>form').submit(function(e){
// //         e.preventDefault();
// //         let formData = $(this).serialize();
// //         $.ajax({
// //             type: 'post',
// //             url: '/comments/create',
// //             data: formData,
// //             success: function(data){
// //             console.log('cgc');

// //                 console.log(data);
// //                 let newComment= newCommentDom(data);
// //                 $('#post-comments-' + data.data.comment.post).prepend(newComment);
// //                 // deleteComment($(' .delete-comment-button',newComment));
// //                 console.log(data);
// //             }, error: function(error){
// //                 console.log('err');
// //                 console.log(error.responseText);
// //             }
// //         });
// //     });
// // }); 

// // function newCommentDom(post){
// //     return `
// //     <section id="comment-${post.data.comment._id}">
// //             <li>
// //                 <p>
// //                     ${post.data.comment.content}
// //                     <br>
// //                         <small>
// //                             ${post.data.comment.user.name}
// //                         </small>
                    
// //                         <a id="delete-comment-button" href="/comments/destroy/${post.data.comment._id}">x</a>
    
// //                 </p>
// //             </li>
// //     </section>`;
// // }
// //     //createComment();
