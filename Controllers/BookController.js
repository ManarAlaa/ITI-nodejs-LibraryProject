const mongoose=require("mongoose");
require("../Models/BookModel");
const BookSchema=mongoose.model("Book");

//Get
exports.getBooks=(request,response,next)=>{
    if (Object.keys(request.body).length==""){
        //Get All Books
        BookSchema.find({})
            .then((data)=>{
                    response.status(200).json({data});
                })
            .catch(error=>{
                next(error);
        })
    }
    else{
        //Search for Books
            const searchKey = request.body.searchKey;
            const publisher = request.body.publisher;
            const author = request.body.author;
            const title = request.body.title;
            BookSchema.find({
                $or: [
                  { publisher: searchKey },
                  { author: searchKey },
                  { title: searchKey },
                  { publisher: publisher },
                  { author: author },
                  { title: title }
                ],
              }
              )
              .then(data=>{
                    if(data=="")
                    {
                        next(new Error("This Book is not found, Invalid Input"));
                    }
                    else
                        response.status(200).json({data});
                })
                .catch(error=>{next(error);
                })
         }
    }
//Get a Specific Book
exports.getOneBook=(request,response,next)=>{
    BookSchema.findOne({ _id: request.params.id})
         .then((data)=>{
                 response.status(200).json({data});
             })
         .catch(error=>{next(error);
         })
 }
 
//Post(Add) a new Book
exports.addBook=async(request,response,next)=>{
    try
    {
        let data=await new BookSchema({
                _id:request.body.id,
                title:request.body.title,
                author:request.body.author,
                publisher:request.body.publisher,
                publishingDate:request.body.publishingDate,
                category:request.body.category,
                edition:request.body.edition,
                pages:request.body.pages,
                noOfCopies:request.body.noOfCopies,
                //available:true,
                shelfNo:request.body.shelfNo
               }).save(); 
        response.status(201).json({data});
    }catch(error)
    {
        next(error);
    }
}

//Update(Put) an Book
exports.updateBook=(request,response,next)=>{
    BookSchema.updateOne({
        _id:request.body.id
    },{
        $set:{
            title:request.body.title,
                author:request.body.author,
                publisher:request.body.publisher,
                publishingDate:request.body.publishingDate,
                category:request.body.category,
                edition:request.body.edition,
                pages:request.body.pages,
                noOfCopies:request.body.noOfCopies,
                //available:request.body.available,
                shelfNo:request.body.shelfNo
        }
    }).then(data=>{
        if(data.matchedCount==0)
        {
            next(new Error("This Book is not found"));
        }
        else
        response.status(200).json({data:"Updated!"});
    })
    .catch(error=>next(error));
}

//Delete an Book
exports.deleteBook=(request,response,next)=>{
    BookSchema.deleteOne({
		_id: request.body.id,
	}).then(data=> {
        if(data.deletedCount==0){
            next(new Error("This Book is not found!"));
        }
        else{
            response.status(200).json({data:"Deleted!"})
        }
        }).catch(error=>next(error));
}
